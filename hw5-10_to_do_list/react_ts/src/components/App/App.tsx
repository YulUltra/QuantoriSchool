import "./App.css";
import React, { ChangeEvent, useLayoutEffect, useMemo, useState } from "react";
import Button from "../Button/Button";
import AddTaskModalWindow from "../AddTaskModalWindow/AddTaskModalWindow";
import TaskList from "../TaskList/TaskList";
import TodayTasksModalWindow from "../TodayTasksModalWindow/TodayTasksModalWindow";
import TaskRepository from "../../repositories/TaskRepository";
import Task from "../../types/Task";
import { datesAreEqual } from "../../utils/Utils";
import { EntityID } from "../../repositories/Repository";
import WeatherAPI from "../../api/WeatherAPI";

export default function App() {
    const [isAddTaskModalWindowShown, setIsAddTaskModalWindowShown] = useState(false);
    const [initTasks, setInitTasks] = useState<Array<Task>>([]);
    const [activeTasks, setActiveTasks] = useState(initTasks.filter((t) => !t.isCompleted));
    const [completedTasks, setCompletedTasks] = useState(initTasks.filter((t) => t.isCompleted));
    const taskRepo = new TaskRepository({ storageHost: "localhost", storagePort: 3000 });
    useLayoutEffect(() => {
        taskRepo.getAll().then((tasks) => {
            setInitTasks(tasks);
            setActiveTasks(tasks.filter((t) => !t.isCompleted));
            setCompletedTasks(tasks.filter((t) => t.isCompleted));
        });
    }, []);

    const [searchString, setSearchString] = useState("");
    const [weatherState, setWeatherState] = useState<{ temperature: string; icon: string }>({
        temperature: "",
        icon: "",
    });
    const weatherAPI = new WeatherAPI({
        apiURL: "http://api.weatherapi.com",
        city: "Tbilisi",
        apiKey: "8ac348df814f431c83b110953231804",
    });
    useMemo(() => {
        weatherAPI.getWeatherState().then((state) => setWeatherState(state));
    }, []);

    const onAddTaskButtonClick = () => {
        setIsAddTaskModalWindowShown(true);
    };

    const taskShouldBeDoneToday = (task: Task) => {
        const today = new Date();
        const taskDate = new Date(task.date);
        return datesAreEqual(today, taskDate);
    };

    const deleteTask = async (taskId: EntityID) => {
        await taskRepo.deleteById(taskId);
        setActiveTasks(activeTasks.filter((task) => task.id !== taskId));
    };

    const displayTasksBySubstring = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const addTask = async (task: Task): Promise<void> => {
        // addedTask will have an id
        const addedTask = await taskRepo.add(task);
        setActiveTasks(activeTasks.concat(addedTask));
    };

    const updateTaskStatus = async (task: Task) => {
        task.isCompleted = !task.isCompleted;
        await taskRepo.update(task);

        if (task.isCompleted) {
            addToList(completedTasks, setCompletedTasks, task);
            deleteFromListById(activeTasks, setActiveTasks, task.id);
        } else {
            addToList(activeTasks, setActiveTasks, task);
            deleteFromListById(completedTasks, setCompletedTasks, task.id);
        }
    };

    const addToList = (
        list: Array<Task>,
        setListState: React.Dispatch<React.SetStateAction<Task[]>>,
        task: Task
    ) => {
        setListState(list.concat(task));
    };

    const deleteFromListById = (
        list: Array<Task>,
        setListState: React.Dispatch<React.SetStateAction<Task[]>>,
        taskID: EntityID
    ) => {
        setListState(list.filter((t) => t.id !== taskID));
    };

    return (
        <div className={"wrapper"}>
            <div className={"header__container"}>
                <div className={"weather__container"}>
                    <div className={"weather__temperature"}>
                        <img alt={"icon"} src={weatherState.icon} />
                        <div>{`${weatherState.temperature}°`}</div>
                    </div>
                    <div>{weatherAPI.city}</div>
                </div>
                <h1>To Do List</h1>
            </div>
            <div className={"search__container"}>
                <input
                    type={"text"}
                    placeholder={"Search Task"}
                    className={"search__input"}
                    onChange={displayTasksBySubstring}
                />
                <Button
                    className={"search__btn"}
                    onClick={onAddTaskButtonClick}
                    text={"+ New Task"}
                ></Button>
            </div>
            <AddTaskModalWindow
                isShown={isAddTaskModalWindowShown}
                addTask={addTask}
                hide={() => setIsAddTaskModalWindowShown(false)}
            ></AddTaskModalWindow>
            <TaskList
                tasks={activeTasks}
                title={"All Tasks"}
                taskViewClassName={"checkbox"}
                onCheckboxClick={updateTaskStatus}
                deleteTask={deleteTask}
                displayTasksBySubstring={searchString}
            ></TaskList>
            <TaskList
                tasks={completedTasks}
                title={"Completed Tasks"}
                taskViewClassName={"checkbox checkbox--completed"}
                onCheckboxClick={updateTaskStatus}
                deleteTask={deleteTask}
                displayTasksBySubstring={searchString}
            ></TaskList>
            <TodayTasksModalWindow
                tasks={initTasks.filter((t) => taskShouldBeDoneToday(t))}
            ></TodayTasksModalWindow>
        </div>
    );
}
