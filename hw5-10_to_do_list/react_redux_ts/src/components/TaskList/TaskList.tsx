import "./TaskList.css";
import TaskView from "./TaskView/TaskView";
import { useAppSelector } from "../../redux/store";

export enum TaskListType {
    ActiveTasks = "All Tasks",
    CompletedTasks = "Completed Tasks",
}

export namespace TaskListType {
    export function isCompleted(taskListType: TaskListType) {
        return taskListType == TaskListType.CompletedTasks;
    }
}

export default function TaskList({
    type,
    taskViewClassName,
}: {
    type: TaskListType;
    taskViewClassName: string;
}) {
    const tasks = useAppSelector(
        (state) => state.tasks.tasks.filter((t) => t.isCompleted == TaskListType.isCompleted(type)) //FIXME name
    );
    const displayTasksBySubstring = useAppSelector((state) => state.searchString);
    const tasksView = tasks.map((task) => (
        <TaskView
            key={task.id}
            isDisplayed={task.name.toLowerCase().includes(displayTasksBySubstring)}
            task={task}
            className={taskViewClassName}
        />
    ));
    return (
        <ul>
            <h2>{type}</h2>
            {tasksView}
        </ul>
    );
}
