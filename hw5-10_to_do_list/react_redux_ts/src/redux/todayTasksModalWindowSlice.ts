import { createSlice } from "@reduxjs/toolkit";

export interface TodayTaskModalWindowState {
    isShown: boolean;
}

const initialState: TodayTaskModalWindowState = {
    isShown: false,
};

export const todayTaskModalWindowStateSlice = createSlice({
    name: "todayTasksModalWindow",
    initialState,
    reducers: {
        showTodayTaskModalWindow(state) {
            state.isShown = true;
        },
        hideTodayTaskModalWindow(state) {
            state.isShown = false;
        },
    },
});

export const { showTodayTaskModalWindow, hideTodayTaskModalWindow } =
    todayTaskModalWindowStateSlice.actions;

export default todayTaskModalWindowStateSlice.reducer;
