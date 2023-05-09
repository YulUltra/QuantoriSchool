import "./App.css";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import Button from "../Button/Button";
import TaskModalWindow from "../TaskModalWindow/TaskModalWindow";
import TaskList, { TaskListType } from "../TaskList/TaskList";
import TodayTasksModalWindow from "../TodayTasksModalWindow/TodayTasksModalWindow";
import Task from "../../types/Task";
import { datesAreEqual } from "../../utils/Utils";
import { useWeather } from "./useWeather";
import { fetchAllTasks } from "../../redux/tasksSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { showOnAddingTaskModalWindow } from "../../redux/taskModalWindowSlice";

export default function App() {
    const [searchString, setSearchString] = useState("");

    const isTaskModalWindowShown = useAppSelector(
        (state: RootState) => state.taskModalWindow.isShown
    );

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchAllTasks());
    }, []);
    const weatherCity = "Tbilisi";
    const weatherState = useWeather(weatherCity);

    const displayTasksBySubstring = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
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
                    onClick={() => dispatch(showOnAddingTaskModalWindow())}
                    text={"+ New Task"}
                ></Button>
            </div>
            {isTaskModalWindowShown && <TaskModalWindow />}
            <TaskList
                type={TaskListType.ActiveTasks}
                taskViewClassName={"checkbox"}
                displayTasksBySubstring={searchString}
            />
            <TaskList
                type={TaskListType.CompletedTasks}
                taskViewClassName={"checkbox checkbox--completed"}
                displayTasksBySubstring={searchString}
            />
            <TodayTasksModalWindow />
        </div>
    );
}
