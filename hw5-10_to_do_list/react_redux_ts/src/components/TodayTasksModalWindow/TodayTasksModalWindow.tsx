import "./TodayTasksModalWindow.css";
import Task from "../../types/Task";
import Button from "../Button/Button";
import { datesAreEqual, stringifyDate } from "../../utils/Utils";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import {
    hideTodayTaskModalWindow,
    showTodayTaskModalWindow,
} from "../../redux/todayTasksModalWindowSlice";

export default function TodayTasksModalWindow() {
    const dispatch = useAppDispatch();
    const isShown = useAppSelector((state: RootState) => state.todayTaskModalWindow.isShown);

    const taskShouldBeDoneToday = (task: Task) => {
        const today = new Date();
        const taskDate = new Date(task.date);
        return datesAreEqual(today, taskDate);
    };
    const tasks = useAppSelector((state: RootState) =>
        state.tasks.tasks.filter((t) => taskShouldBeDoneToday(t))
    );

    const storageKey = "todayTasksModalWindowLastShowDate";
    const lastShowDate = localStorage.getItem(storageKey);
    const today = new Date();
    if (!(lastShowDate && datesAreEqual(today, new Date(lastShowDate))) && tasks.length) {
        dispatch(showTodayTaskModalWindow());
        localStorage.setItem(storageKey, stringifyDate(today));
    }

    if (!isShown) {
        return null;
    }

    return (
        <div className={"today-modal"} style={{ display: isShown ? "block" : "none" }}>
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
                    onClick={() => dispatch(hideTodayTaskModalWindow())}
                    className={"btn today-modal__submit-btn"}
                    text={"Ok"}
                ></Button>
            </div>
        </div>
    );
}
