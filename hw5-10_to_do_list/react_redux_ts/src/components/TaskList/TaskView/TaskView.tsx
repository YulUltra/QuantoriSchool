import "./TaskView.css";
import Task from "../../../types/Task";
import Button from "../../Button/Button";
import { formatDate } from "../../../utils/Utils";
import { useAppDispatch } from "../../../redux/store";
import { showOnUpdatingTaskModalWindow } from "../../../redux/taskModalWindowSlice";
import { deleteTaskById, updateTask } from "../../../redux/tasksSlice";

export default function TaskView({
    isDisplayed,
    task,
    className,
}: {
    isDisplayed: boolean;
    task: Task;
    className: string;
}) {
    const dispatch = useAppDispatch();
    return (
        <li key={task.id} className={className} style={{ display: isDisplayed ? "" : "none" }}>
            <div className={"checkbox__container"}>
                <input
                    className={"checkbox__input"}
                    type={"checkbox"}
                    onChange={() => {
                        let updatedTask = { ...task };
                        updatedTask.isCompleted = !updatedTask.isCompleted;
                        dispatch(updateTask(updatedTask));
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
            <div className={"checkbox__icons-container"}>
                <Button
                    className={"checkbox__delete-btn"}
                    onClick={() => dispatch(deleteTaskById(task.id))}
                ></Button>
                <Button
                    className={"checkbox__edit-btn"}
                    onClick={() => dispatch(showOnUpdatingTaskModalWindow(task))}
                ></Button>
            </div>
        </li>
    );
}
