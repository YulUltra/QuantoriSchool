import '../styles/ListItem.css'
import Component from "./Component";
import Checkbox from "./Checkbox";
import Header from "./Header";
import Button from "./Button";
import {datesAreEqual} from "./Utils";
import {EntityID} from "./Repository";
import Task from "./Task";
export default class ListItem extends Component {
    checkbox: Checkbox;
    name: Header;
    label: Component;
    date: Component;
    deleteButton: Button;
    isDisplayed: boolean;
    constructor(props: {
        isDisplayed: boolean,
        item: Task,
        cssClass: string,
        onCheckboxClick: (task: Task) => Promise<void>,
        deleteItem: (taskId: EntityID) => Promise<void>,
    }) {
        super(props)
        this.checkbox = new Checkbox({
            onChange: () => props.onCheckboxClick(props.item),
            cssClass: 'checkbox__input',
            isChecked: props.item.isCompleted,
        })
        this.name = new Header({
            cssClass: 'checkbox__task-title',
            text: props.item.name,
            level: 3
        })
        this.label = new Component({
            cssClass: `label label-${props.item.label}`,
            children: [props.item.label]
        })
        this.date = new Component({
            cssClass: 'date',
            children: [this.formatDate(props.item.date)]
        })
        this.deleteButton = new Button({
            onClick: () => props.deleteItem(this.props.item.id),
            cssClass: 'checkbox__delete-btn'
        })
        this.isDisplayed = props.isDisplayed
    }

    updateDOM() {
        if (this.isDisplayed) {
            this.display()
        } else {
            this.hide()
        }

        this.children = [
            new Component({
                cssClass: 'checkbox__container',
                children: [
                    this.checkbox,
                    new Component({
                        children: [
                            this.name,
                            new Component({
                                cssClass: 'checkbox__container-param',
                                children: [this.label, this.date]
                            })
                        ],
                    })
                ]
            }),
            this.deleteButton,
        ]
    }

    display() {
        this.element.style.display = ''
    }

    hide() {
        this.element.style.display = 'none'
    }

    formatDate = (dateLikeString: string) => {
        if (dateLikeString === '') {
            return dateLikeString
        }
        const date = new Date(dateLikeString)
        const today = new Date()
        const dayOfWeek = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ]
        const month = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ]
        let formattedDate
        if (datesAreEqual(date, today)) {
            formattedDate = 'Today'
        } else if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() - today.getDate() === 1
        ) {
            formattedDate = 'Tomorrow'
        } else {
            formattedDate = `${dayOfWeek[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`
        }
        if (date.getFullYear() !== today.getFullYear()) {
            formattedDate = `${formattedDate}, ${date.getFullYear()}`
        }
        return formattedDate
    }
}