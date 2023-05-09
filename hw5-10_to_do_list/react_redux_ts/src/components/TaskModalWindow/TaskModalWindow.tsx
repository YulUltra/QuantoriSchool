import "./TaskModalWindow.css";
import "../Button/Button.css";
import Button from "../Button/Button";
import { FormEvent } from "react";
import { addTask, updateTask } from "../../redux/tasksSlice";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import {
    clearAndHideTaskModalWindow,
    setCurrentTaskDate,
    setCurrentTaskLabel,
    setCurrentTaskName,
} from "../../redux/taskModalWindowSlice";

export default function TaskModalWindow() {
    const dispatch = useAppDispatch();
    const isShown = useAppSelector((state: RootState) => state.taskModalWindow.isShown);
    const currentTask = useAppSelector((state: RootState) => state.taskModalWindow.task);

    const labelButtons = ["health", "work", "home", "other"].map((label) => (
        <Button
            key={label}
            text={label}
            className={`label label-${label}`}
            onClick={() => dispatch(setCurrentTaskLabel(label))}
        />
    ));

    const onTaskNameInput = (e: FormEvent<HTMLInputElement>) => {
        dispatch(setCurrentTaskName(e.currentTarget.value));
    };

    const onDateInput = (e: FormEvent<HTMLInputElement>) => {
        dispatch(setCurrentTaskDate(e.currentTarget.value));
    };

    const onSubmitButtonClick = () => {
        if (currentTask.id) {
            dispatch(updateTask(currentTask));
        } else {
            dispatch(addTask(currentTask));
        }
        dispatch(clearAndHideTaskModalWindow());
    };

    if (!isShown) {
        return null;
    }

    const modalWindowTitle = currentTask.id ? "Update Task" : "Add New Task";
    const submitButtonText = currentTask.id ? "Submit" : "Add Task";

    return (
        <div className="modal" style={{ display: isShown ? "block" : "none" }}>
            <h2 className="modal__title">{modalWindowTitle}</h2>
            <input
                className="modal__input"
                type="text"
                placeholder="Task Title"
                onInput={onTaskNameInput}
                defaultValue={currentTask.name}
            />
            <div className="modal__container">
                <div className="modal__label-container">{labelButtons}</div>
                <input
                    className="modal__date-input"
                    onInput={onDateInput}
                    type="date"
                    defaultValue={currentTask.date}
                />
            </div>
            <div className="modal__btn-container">
                <Button
                    className="btn modal__cancel-btn"
                    onClick={() => dispatch(clearAndHideTaskModalWindow())}
                    text="Cancel"
                ></Button>
                <Button
                    className="btn modal__submit-btn"
                    onClick={onSubmitButtonClick}
                    text={submitButtonText}
                    isDisabled={!Boolean(currentTask.name.trim())}
                ></Button>
            </div>
        </div>
    );
}
