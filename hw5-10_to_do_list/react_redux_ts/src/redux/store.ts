import tasksReducer from "./tasksSlice";
import taskModalWindowReducer from "./taskModalWindowSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todayTaskModalWindowReducer from "./todayTasksModalWindowSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        taskModalWindow: taskModalWindowReducer,
        todayTaskModalWindow: todayTaskModalWindowReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
