import "./TaskList.css";
import Task from "../../types/Task";
import TaskView from "./TaskView/TaskView";
import { EntityID } from "../../repositories/Repository";

export default function TaskList({
    tasks,
    title,
    taskViewClassName,
    onCheckboxClick,
    deleteTask,
    displayTasksBySubstring = "",
}: {
    tasks: Task[];
    title: string;
    taskViewClassName: string;
    onCheckboxClick: (task: Task) => Promise<void>;
    deleteTask: (taskId: EntityID) => Promise<void>;
    displayTasksBySubstring: string;
}) {
    const tasksView = tasks.map((task) => (
        <TaskView
            key={task.id}
            isDisplayed={task.name.toLowerCase().includes(displayTasksBySubstring)}
            task={task}
            className={taskViewClassName}
            onCheckboxClick={onCheckboxClick}
            deleteTask={deleteTask}
        />
    ));
    return (
        <ul>
            <h2>{title}</h2>
            {tasksView}
        </ul>
    );
}
