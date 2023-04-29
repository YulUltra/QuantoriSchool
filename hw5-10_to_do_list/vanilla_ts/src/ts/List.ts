import '../styles/List.css'
import ListItem from "./ListItem";
import Component from "./Component";
import Header from "./Header";
import Task from "./Task";
import {EntityID} from "./Repository";
export default class List extends Component {
    title: Header
    state: {
        displayItemsBySubstring: string;
        items: Array<Task>,
    }
    itemCssClass: string;
    onCheckboxClick: (task: Task) => Promise<void>;
    deleteItem: (taskId: EntityID) => Promise<void>;
    constructor(props: {
        initItems: Array<Task>,
        title?: string,
        itemCssClass: string,
        onCheckboxClick: (task: Task) => Promise<void>,
        deleteItem: (taskId: EntityID) => Promise<void>})
    {
        super({ ...props, elementType: 'ul' })
        this.state = {
            items: props.initItems || [],
            displayItemsBySubstring: '',
        }
        this.title = new Header({ text: props.title, level: 2 })
        this.itemCssClass = props.itemCssClass
        this.onCheckboxClick = props.onCheckboxClick
        this.deleteItem = props.deleteItem
    }

    updateDOM() {
        this.children = [
            this.title,
            ...this.state.items.map(
                item => new ListItem({
                    isDisplayed: item.name.toLowerCase().includes(this.state.displayItemsBySubstring),
                    item: item,
                    cssClass: this.itemCssClass,
                    onCheckboxClick: this.onCheckboxClick,
                    deleteItem: this.deleteItem,
                })
            )
        ]
    }
}