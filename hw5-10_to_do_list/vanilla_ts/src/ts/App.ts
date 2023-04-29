import '../styles/App.css'
import Component from "./Component";
import Header from "./Header";
import Search from "./Search";
import List from "./List";
import AddItemModalWindow from "./AddItemModalWindow";
import Button from "./Button";
import TodayTasksModalWindow from "./TodayTasksModalWindow";
import Image from "./Image";
import TaskRepository from "./TaskRepository";
import WeatherAPI from "./WeatherAPI";
import {datesAreEqual} from "./Utils";
import Task from "./Task";
import {EntityID, Repository} from "./Repository";
class App extends Component {
    taskRepo: Repository<Task>
    title: Header
    searchTasksLine: Search
    activeTasksList: List
    completedTasksList: List
    addTaskModalWindow: AddItemModalWindow
    addTaskButton: Button
    todayTasksModalWindow: TodayTasksModalWindow
    weatherTemperature: Component
    weatherIcon: Image
    weatherCity: string;
    constructor(props: {
        cssClass: string,
        taskRepo: Repository<Task>,
        initTasks: Array<Task>,
        weatherCity: string,
        weatherTemperature: string,
        weatherIcon: string,
    }) {
        super(props)
        this.weatherCity = props.weatherCity
        this.taskRepo = props.taskRepo
        this.title = new Header({ text: 'To Do List' })
        this.searchTasksLine = new Search({
            cssClass: 'search__input',
            placeholder: 'Search Task',
            onSearch: this.displayTasksBySubstring,
            isIncremental: true
        })
        this.activeTasksList = new List({
            initItems: props.initTasks.filter(t => !t.isCompleted),
            title: 'All Tasks',
            itemCssClass: 'checkbox',
            onCheckboxClick: this.updateTaskStatus,
            deleteItem: this.deleteTask,
        })
        this.completedTasksList = new List({
            initItems: props.initTasks.filter(t => t.isCompleted),
            title: 'Completed Tasks',
            itemCssClass: 'checkbox checkbox--completed',
            onCheckboxClick: this.updateTaskStatus,
            deleteItem: this.deleteTask,
        })
        this.addTaskModalWindow = new AddItemModalWindow({
            addItem: this.addTask,
            cssClass: 'modal',
        })
        this.addTaskButton = new Button({
            cssClass: 'search__btn',
            text: '+ New Task',
            onClick: () => {
                this.addTaskModalWindow.element.style.display = 'block'
                this.addTaskModalWindow.clearInputs()
            }
        })
        this.todayTasksModalWindow = new TodayTasksModalWindow({
            tasks: props.initTasks.filter(task => !task.isCompleted && this.taskShouldBeDoneToday(task)),
            cssClass: 'today-modal'
        })
        this.weatherTemperature = new Component({cssClass: '', children: [`${props.weatherTemperature}°`]})
        this.weatherIcon = new Image({src: props.weatherIcon})
    }

    updateDOM() {
        this.children = [
            new Component ({
                cssClass: 'header__container',
                children: [
                    new Component({
                        cssClass: 'weather__container',
                        children: [
                            new Component({
                                cssClass: 'weather__temperature',
                                children: [
                                    this.weatherIcon,
                                    this.weatherTemperature,
                                ]
                            }),
                            this.weatherCity,
                        ]
                    }),
                    this.title,
                ]
            }),
            new Component({
                cssClass: 'search__container',
                children: [this.searchTasksLine, this.addTaskButton]
            }),
            this.addTaskModalWindow,
            this.activeTasksList,
            this.completedTasksList,
            this.todayTasksModalWindow
        ]
    }

    addTask = async (task: Task): Promise<void> => {
        // addedTask will have an id
        const addedTask = await this.taskRepo.add(task)
        this.addToList(this.activeTasksList, addedTask)
    }

    updateTaskStatus = async (task: Task) => {
        task.isCompleted = !task.isCompleted
        await this.taskRepo.update(task)

        if (task.isCompleted) {
            this.addToList(this.completedTasksList, task)
            this.deleteFromListById(this.activeTasksList, task.id)
        } else {
            this.addToList(this.activeTasksList, task)
            this.deleteFromListById(this.completedTasksList, task.id)
        }
    }

    deleteTask = async (taskId: EntityID) => {
        await this.taskRepo.deleteById(taskId)
        this.deleteFromListById(this.activeTasksList, taskId)
    }

    displayTasksBySubstring = (e: Event) => {
        const target = e.target as HTMLInputElement
        this.activeTasksList.setState({displayItemsBySubstring: target.value})
        this.completedTasksList.setState({displayItemsBySubstring: target.value})
    }

    addToList(list: List, task: Task) {
        list.setState({
            items: list.state.items.concat(task)
        })
    }

    deleteFromListById(list: List, taskId: EntityID) {
        list.setState({
            items: list.state.items.filter(task => task.id !== taskId)
        })
    }

    taskShouldBeDoneToday(task: Task) {
        const today = new Date()
        const taskDate = new Date(task.date)
        return datesAreEqual(today, taskDate)
    }
}

export default async function runApp() {
    const weatherAPI = new WeatherAPI({
        apiURL: 'http://api.weatherapi.com',
        city: 'Tbilisi',
        apiKey:'8ac348df814f431c83b110953231804'
    })
    const weatherState = await weatherAPI.getWeatherState()
    const taskRepo = new TaskRepository({ storageHost: 'localhost', storagePort: 3000 })
    const initTasks = await taskRepo.getAll()

    const app = new App({
        cssClass: 'wrapper',
        taskRepo: taskRepo,
        initTasks: initTasks,
        weatherCity: weatherAPI.city,
        weatherTemperature: weatherState.temperature,
        weatherIcon: weatherState.icon,
    })

    document.body.appendChild(app.render())
}
