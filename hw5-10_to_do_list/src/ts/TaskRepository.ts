import Task from "./Task";
import {EntityID, Repository} from "./Repository";

export default class TaskRepository implements Repository<Task> {
    storageURL: string;
    taskEndpoint: string;
    constructor({ storageHost, storagePort }: { storageHost: string, storagePort: number}) {
        this.storageURL = `http://${storageHost}:${storagePort}`
        this.taskEndpoint = `${this.storageURL}/tasks`
    }

    async getAll(): Promise<Array<Task>> {
        const response = await fetch(this.taskEndpoint)
        return await response.json() as Array<Task>
    }

    async add(entity: Task): Promise<Task> {
        const response = await fetch(this.taskEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity),
        })
        return await response.json() as Task
    }

    async update(entity: Task): Promise<void> {
        const url = `${this.taskEndpoint}/${entity.id}`
        await fetch(url, {
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity),
        })
    }

    async deleteById(entityId: EntityID): Promise<void> {
        const url = `${this.taskEndpoint}/${entityId}`
        await fetch(url, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    }
}
