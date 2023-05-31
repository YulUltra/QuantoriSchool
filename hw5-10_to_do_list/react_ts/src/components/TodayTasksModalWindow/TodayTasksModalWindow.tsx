import "./TodayTasksModalWindow.css";
import Task from "../../types/Task";
import Button from "../Button/Button";
import { useState } from "react";
import { datesAreEqual, stringifyDate } from "../../utils/Utils";

export default function TodayTasksModalWindow({ tasks }: { tasks: Task[] }) {
    const [isShown, setIsShown] = useState(false);

    const storageKey = "todayTasksModalWindowLastShowDate";
    const state = localStorage.getItem(storageKey);
    const today = new Date();
    if (!(state && datesAreEqual(today, new Date(state))) && tasks.length) {
        setIsShown(true);
        localStorage.setItem(storageKey, stringifyDate(today));
    }

    return (
        <div className={"today-modal"} style={{ display: isShown ? "" : "none" }}>
            <h2 className={"today-modal__title"}>Good Morning</h2>
            <div className={"today-modal__container"}>
                You have the next planned tasks for today:
            </div>
            <div className={"today-modal__list"}>
                {tasks.map((task) => (
                    <div className={"today-modal__item"}>{task.name}</div>
                ))}
            </div>
            <div className={"today-modal__btn-container"}>
                <Button
                    onClick={() => setIsShown(false)}
                    className={"btn today-modal__submit-btn"}
                    text={"Ok"}
                ></Button>
            </div>
        </div>
    );
}
