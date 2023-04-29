import {EntityID} from "./Repository";

export default interface Task {
    id?: EntityID
    name: string
    label: string
    date: string
    isCompleted: boolean,
}