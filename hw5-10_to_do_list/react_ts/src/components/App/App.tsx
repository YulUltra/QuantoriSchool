import "./App.css";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Button from "../Button/Button";
import AddingTaskModalWindow from "../AddingTaskModalWindow/AddingTaskModalWindow";
import TaskList from "../TaskList/TaskList";
import TodayTasksModalWindow from "../TodayTasksModalWindow/TodayTasksModalWindow";
import TaskRepository from "../../repositories/TaskRepository";
import Task from "../../types/Task";
import { datesAreEqual } from "../../utils/Utils";
import { EntityID } from "../../repositories/Repository";
import { useWeather } from "./useWeather";

export default function App() {
    const [isAddingTaskModalWindowShown, setIsAddingTaskModalWindowShown] = useState(false);
    const [allTasks, setAllTasks] = useState<Task[]>([]);
    const [searchString, setSearchString] = useState("");
    const activeTasks = useMemo(
        () => allTasks.filter((t) => !t.isCompleted),
        [allTasks, searchString]
    );
    const completedTasks = useMemo(
        () => allTasks.filter((t) => t.isCompleted),
        [allTasks, searchString]
    );
    const taskRepo = new TaskRepository({ storageHost: "localhost", storagePort: 3000 });
    useEffect(() => {
        taskRepo
            .getAll()
            .then((tasks) => {
                setAllTasks(tasks);
            })
            .catch((e) => console.error(e.message));
    }, []);
    const weatherCity = "Tbilisi";
    const weatherState = useWeather(weatherCity);

    const onAddTaskButtonClick = () => {
        setIsAddingTaskModalWindowShown(true);
    };

    const taskShouldBeDoneToday = (task: Task) => {
        const today = new Date();
        const taskDate = new Date(task.date);
        return datesAreEqual(today, taskDate);
    };

    const deleteTask = async (taskId: EntityID) => {
        try {
            await taskRepo.deleteById(taskId);
            setAllTasks(allTasks.filter((task) => task.id !== taskId));
        } catch (e) {
            console.error();
        }
    };

    const displayTasksBySubstring = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const addTask = async (task: Task): Promise<void> => {
        try {
            // addedTask will have an id
            const addedTask = await taskRepo.add(task);
            setAllTasks(allTasks.concat(addedTask));
        } catch (e) {
            console.error();
        }
    };

    const updateTaskStatus = async (task: Task) => {
        try {
            task.isCompleted = !task.isCompleted;
            await taskRepo.update(task);
            setAllTasks(allTasks.filter((t) => t.id !== task.id).concat(task));
        } catch (e) {
            console.error();
        }
    };

    return (
        <div className={"wrapper"}>
            <div className={"header__container"}>
                <div className={"weather__container"}>
                    <div className={"weather__temperature"}>
                        <img alt={"icon"} src={weatherState.icon} />
                        <div>{`${weatherState.temperature}°`}</div>
                    </div>
                    <div>{weatherCity}</div>
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
            {isAddingTaskModalWindowShown && (
                <AddingTaskModalWindow
                    isShown={isAddingTaskModalWindowShown}
                    addTask={addTask}
                    hide={() => setIsAddingTaskModalWindowShown(false)}
                />
            )}
            <TaskList
                tasks={activeTasks}
                title={"All Tasks"}
                taskViewClassName={"checkbox"}
                onCheckboxClick={updateTaskStatus}
                deleteTask={deleteTask}
                displayTasksBySubstring={searchString}
            />
            <TaskList
                tasks={completedTasks}
                title={"Completed Tasks"}
                taskViewClassName={"checkbox checkbox--completed"}
                onCheckboxClick={updateTaskStatus}
                deleteTask={deleteTask}
                displayTasksBySubstring={searchString}
            />
            <TodayTasksModalWindow tasks={allTasks.filter((t) => taskShouldBeDoneToday(t))} />
        </div>
    );
}
