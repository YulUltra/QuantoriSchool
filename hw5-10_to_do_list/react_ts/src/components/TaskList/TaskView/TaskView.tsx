import "./TaskView.css";
import Task from "../../../types/Task";
import { EntityID } from "../../../repositories/Repository";
import Button from "../../Button/Button";
import { formatDate } from "../../../utils/Utils";

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
            <Button className={"checkbox__delete-btn"} onClick={() => deleteTask(task.id)}></Button>
        </li>
    );
}
