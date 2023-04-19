class TaskRepository extends Repository {
    constructor({ storageHost, storagePort }) {
        super()
        this.storageURL = `http://${storageHost}:${storagePort}`
        this.taskEndpoint = `${this.storageURL}/tasks`
    }

    async getAll() {
        const response = await fetch(this.taskEndpoint)
        return response.json()
    }

    async add(entity) {
        const response = await fetch(this.taskEndpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(entity),
        })
        return response.json()
    }

    async update(entity) {
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

    async deleteById(entityId) {
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
