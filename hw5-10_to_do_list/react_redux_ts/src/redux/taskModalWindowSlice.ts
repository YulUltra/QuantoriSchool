import Task from "../types/Task";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { stringifyDate } from "../utils/Utils";

export interface TaskModalWindowState {
    task: Task;
    isShown: boolean;
}

const initialState: TaskModalWindowState = {
    task: {
        name: "",
        label: "",
        date: stringifyDate(new Date()),
        isCompleted: false,
    },
    isShown: false,
};

const clearTaskInfo = (state: TaskModalWindowState) => {
    state.task.name = "";
    state.task.label = "";
    state.task.date = stringifyDate(new Date());
    state.task.isCompleted = false;
    state.task.id = null;
};

export const taskModalWindowStateSlice = createSlice({
    name: "tasksModalWindow",
    initialState,
    reducers: {
        clearAndHideTaskModalWindow(state) {
            clearTaskInfo(state);
            state.isShown = false;
        },
        showOnUpdatingTaskModalWindow(state, action: PayloadAction<Task>) {
            state.task = action.payload;
            state.isShown = true;
        },
        showOnAddingTaskModalWindow(state) {
            clearTaskInfo(state);
            state.isShown = true;
        },
        setCurrentTaskName(state, action: PayloadAction<string>) {
            state.task.name = action.payload;
        },
        setCurrentTaskDate(state, action: PayloadAction<string>) {
            state.task.date = action.payload;
        },
        setCurrentTaskLabel(state, action: PayloadAction<string>) {
            state.task.label = action.payload;
        },
    },
});

export const {
    clearAndHideTaskModalWindow,
    showOnUpdatingTaskModalWindow,
    showOnAddingTaskModalWindow,
    setCurrentTaskName,
    setCurrentTaskLabel,
    setCurrentTaskDate,
} = taskModalWindowStateSlice.actions;
export default taskModalWindowStateSlice.reducer;
