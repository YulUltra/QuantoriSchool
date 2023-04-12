class App extends Component {
    constructor(props) {
        super(props)
        this.title = new Header({ text: 'To Do List' })
        this.searchTasksLine = new Search({
            cssClass: 'search__input',
            placeholder: 'Search Task',
            onSearch: this.displayTasksBySubstring,
            isIncremental: true
        })
        this.activeTasks = new List({
            title: 'All Tasks',
            itemCssClass: 'checkbox',
            onItemCheckboxClick: this.moveTaskToCompleted,
            storageKey: 'activeTasks'
        })
        this.completedTasks = new List({
            title: 'Completed Tasks',
            itemCssClass: 'checkbox checkbox--completed',
            onItemCheckboxClick: this.moveTaskToActive,
            storageKey: 'completedTasks'
        })
        this.addTaskModalWindow = new AddItemModalWindow({
            addItem: this.activeTasks.addItem,
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
    }

    updateDOM() {
        this.children = [
            this.title,
            new Component({
                cssClass: 'search__container',
                children: [this.searchTasksLine, this.addTaskButton]
            }),
            this.addTaskModalWindow,
            this.activeTasks,
            this.completedTasks
        ]
    }

    moveTaskToCompleted = task => {
        this.activeTasks.removeItem(task)
        task.markAsCompleted()
        this.completedTasks.addItem(task)
    }

    moveTaskToActive = task => {
        this.completedTasks.removeItem(task)
        task.markAsActive()
        this.activeTasks.addItem(task)
    }

    displayTasksBySubstring = e => {
        this.activeTasks.displayBySubstring(e.target.value)
        this.completedTasks.displayBySubstring(e.target.value)
    }
}

document.body.appendChild(new App({ cssClass: 'wrapper' }).render())
