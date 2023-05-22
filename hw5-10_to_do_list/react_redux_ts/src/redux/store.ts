import tasksReducer from "./tasksSlice";
import taskModalWindowReducer from "./taskModalWindowSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import todayTaskModalWindowReducer from "./todayTasksModalWindowSlice";
import searchStringReducer from "./searchStringSlice";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
        taskModalWindow: taskModalWindowReducer,
        todayTaskModalWindow: todayTaskModalWindowReducer,
        searchString: searchStringReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
