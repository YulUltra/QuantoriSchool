import "./AddTaskModalWindow.css";
import "../Button/Button.css";
import Button from "../Button/Button";
import Task from "../../types/Task";
import { FormEvent, useRef, useState } from "react";
import { stringifyDate } from "../../utils/Utils";

export default function AddTaskModalWindow({
    isShown,
    addTask,
    hide,
}: {
    isShown: boolean;
    addTask: (task: Task) => Promise<void>;
    hide: () => void;
}) {
    const [isAddTaskButtonDisabled, setIsAddTaskButtonDisabled] = useState(true);
    const [taskName2, setTaskName] = useState('');
    const taskNameInputRef = useRef(null);
    let taskLabel: string = "";
    const labelButtons = ["health", "work", "home", "other"].map((label) =>
        Button({
            text: label,
            className: `label label-${label}`,
            onClick: () => {
                taskLabel = label;
            },
        })
    );

    // const isValid = Boolean(taskName2.trim()) && isDataValid(dataField);

    let taskName: string;
    const onTaskNameInput = (e: FormEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setTaskName(value);
        taskName = value;
        value ? setIsAddTaskButtonDisabled(false) : setIsAddTaskButtonDisabled(true);
    };

    let taskDate: string = stringifyDate(new Date());
    const onDateInput = (e: FormEvent<HTMLInputElement>) => {
        taskDate = e.currentTarget.value;
    };

    const onAddTaskButtonClick = async () => {
        hide();
        taskNameInputRef.current.value = "";
        await addTask({
            name: taskName,
            label: taskLabel,
            date: taskDate,
            isCompleted: false,
        });
    };

    if (!isShown) {
      return null;
    }

    return (
        <div className="modal" style={{ display: isShown ? "block" : "none" }}>
            <h2 className="modal__title">Add New Task</h2>
            <input
                ref={taskNameInputRef}
                className="modal__input"
                type="text"
                placeholder="Task Title"
                onInput={onTaskNameInput}
            />
            <div className="modal__container">
                <div className="modal__label-container">{labelButtons}</div>
                <input
                    className="modal__date-input"
                    onInput={onDateInput}
                    type="date"
                    defaultValue={taskDate}
                />
            </div>
            <div className="modal__btn-container">
                <Button className="btn modal__cancel-btn" onClick={hide} text="Cancel"></Button>
                <Button
                    className="btn modal__submit-btn"
                    onClick={onAddTaskButtonClick}
                    text="Add Task"
                    isDisabled={isAddTaskButtonDisabled}
                ></Button>
            </div>
        </div>
    );
}
