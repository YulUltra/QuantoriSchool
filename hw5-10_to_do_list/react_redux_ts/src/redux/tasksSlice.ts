import Task from "../types/Task";
import {
    ActionReducerMapBuilder,
    AsyncThunk,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import TaskRepository from "../repositories/TaskRepository";
import { EntityID } from "../repositories/Repository";

const taskRepo = new TaskRepository({ storageHost: "localhost", storagePort: 3000 });

export interface TasksState {
    tasks: Task[];
    isLoading: boolean;
    error: string;
}

const initialState: TasksState = {
    tasks: [],
    isLoading: false,
    error: null,
};

export const fetchAllTasks = createAsyncThunk("tasks/fetchAllTasks", async () => {
    return await taskRepo.getAll();
});
export const addTask = createAsyncThunk("tasks/addTask", async (task: Task) => {
    return await taskRepo.add(task);
});
export const deleteTaskById = createAsyncThunk("tasks/deleteTaskById", async (taskId: EntityID) => {
    await taskRepo.deleteById(taskId);
});
export const updateTask = createAsyncThunk("tasks/updateTask", async (task: Task) => {
    await taskRepo.update(task);
});

const registerAsyncThunkExtraReducers = <I, R>(
    asyncThunk: AsyncThunk<R, I, { state: TasksState }>,
    builder: ActionReducerMapBuilder<TasksState>,
    modifyTasksState: (
        state: TasksState,
        payload: R,
        meta: { arg: I; requestId: string; requestStatus: "fulfilled" }
    ) => void
) => {
    builder.addCase(asyncThunk.pending, (state) => {
        state.isLoading = true;
    });
    builder.addCase(asyncThunk.fulfilled, (state, { payload, meta }) => {
        state.isLoading = false;
        modifyTasksState(state, payload, meta);
    });
    builder.addCase(asyncThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
    });
};

const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        registerAsyncThunkExtraReducers(fetchAllTasks, builder, (state, payload) => {
            state.tasks = payload;
        });
        registerAsyncThunkExtraReducers(addTask, builder, (state, payload) => {
            state.tasks.push(payload);
        });
        registerAsyncThunkExtraReducers(deleteTaskById, builder, (state, action, { arg }) => {
            state.tasks = state.tasks.filter((t) => t.id !== arg);
        });
        registerAsyncThunkExtraReducers(updateTask, builder, (state, action, { arg }) => {
            state.tasks = state.tasks.filter((t) => t.id !== arg.id);
            state.tasks.push(arg);
        });
    },
});

export default tasksSlice.reducer;
