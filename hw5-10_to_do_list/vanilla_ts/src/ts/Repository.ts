export type EntityID = number

export interface Repository<T> {
    getAll(): Array<T> | Promise<Array<T>>
    add(entity: T): T | Promise<T>
    update(entity: T): void | Promise<void>
    deleteById(entityId: EntityID): void | Promise<void>
}

