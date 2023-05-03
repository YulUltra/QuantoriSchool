import "./TaskView.css";
import Task from "../../types/Task";
import { EntityID } from "../../repositories/Repository";
import Button from "../Button/Button";
import { datesAreEqual } from "../../utils/Utils";

export default function TaskView({
    isDisplayed,
    task,
    className,
    onCheckboxClick,
    deleteTask,
}: {
    isDisplayed: boolean;
    task: Task;
    className: string;
    onCheckboxClick: (task: Task) => Promise<void>;
    deleteTask: (taskId: EntityID) => Promise<void>;
}) {
    const formatDate = (dateLikeString: string) => {
        if (dateLikeString === "") {
            return dateLikeString;
        }
        const date = new Date(dateLikeString);
        const today = new Date();
        const dayOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        let formattedDate;
        if (datesAreEqual(date, today)) {
            formattedDate = "Today";
        } else if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() - today.getDate() === 1
        ) {
            formattedDate = "Tomorrow";
        } else {
            formattedDate = `${dayOfWeek[date.getDay()]}, ${date.getDate()} ${
                month[date.getMonth()]
            }`;
        }
        if (date.getFullYear() !== today.getFullYear()) {
            formattedDate = `${formattedDate}, ${date.getFullYear()}`;
        }
        return formattedDate;
    };

    return (
        <li key={task.id} className={className} style={{ display: isDisplayed ? "" : "none" }}>
            <div className={"checkbox__container"}>
                <input
                    className={"checkbox__input"}
                    type={"checkbox"}
                    onChange={async () => {
                        await onCheckboxClick(task);
                    }}
                    checked={task.isCompleted}
                />
                <div>
                    <h3 className={"checkbox__task-title"}>{task.name}</h3>
                    <div className={"checkbox__container-param"}>
                        <div className={`label label-${task.label}`}>{task.label}</div>
                        <div className={"date"}>{formatDate(task.date)}</div>
                    </div>
                </div>
            </div>
            <Button
                className={"checkbox__delete-btn"}
                onClick={async () => {
                    await deleteTask(task.id);
                }}
            ></Button>
        </li>
    );
}
