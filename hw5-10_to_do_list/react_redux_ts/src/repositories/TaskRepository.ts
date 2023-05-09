import { EntityID, Repository } from "./Repository";
import Task from "../types/Task";

export default class TaskRepository implements Repository<Task> {
    storageURL: string;
    taskEndpoint: string;

    constructor({ storageHost, storagePort }: { storageHost: string; storagePort: number }) {
        this.storageURL = `http://${storageHost}:${storagePort}`;
        this.taskEndpoint = `${this.storageURL}/tasks`;
    }

    async getAll(): Promise<Task[]> {
        const response = await fetch(this.taskEndpoint);
        if (!response.ok) {
            throw new Error(
                `The following error occurred during getting all tasks: ${response.statusText}`
            );
        }
        return (await response.json()) as Task[];
    }

    async add(entity: Task): Promise<Task> {
        const response = await fetch(this.taskEndpoint, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entity),
        });
        if (!response.ok) {
            throw new Error(
                `The following error occurred during adding a task with id = ${entity.id}: ${response.statusText}`
            );
        }
        return (await response.json()) as Task;
    }

    async update(entity: Task) {
        const url = `${this.taskEndpoint}/${entity.id}`;
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(entity),
        });
        if (!response.ok) {
            throw new Error(
                `The following error occurred during updating a task with id = ${entity.id}: ${response.statusText}`
            );
        }
    }

    async deleteById(entityId: EntityID): Promise<void> {
        const url = `${this.taskEndpoint}/${entityId}`;
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(
                `The following error occurred during deleting a task with id = ${entityId}: ${response.statusText}`
            );
        }
    }
}
