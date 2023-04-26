import '../styles/TodayTasksModalWindow.css'
import Component from "./Component";
import Header from "./Header";
import Button from "./Button";
import {datesAreEqual, stringifyDate} from "./Utils";
import Task from "./Task";
export default class TodayTasksModalWindow extends Component {
    title: Header
    cancelOnButton: Button;
    tasks: Array<Task>;

    constructor(props: {tasks: Array<Task>, cssClass?: string}) {
        super(props)
        this.tasks = props.tasks
        this.title = new Header({ cssClass: 'today-modal__title', text: 'Good Morning', level: 2 })
        this.cancelOnButton = new Button({
            cssClass: 'btn today-modal__submit-btn',
            text: 'Ok',
            onClick: this.hide
        })

        const storageKey = 'todayTasksModalWindowLastShowDate'
        const state = localStorage.getItem(storageKey)
        const today = new Date()
        if (state && datesAreEqual(today, new Date(state)) || !this.tasks.length) {
            this.hide()
        } else {
            this.show()
            localStorage.setItem(storageKey, stringifyDate(today))
        }
    }

    updateDOM() {
        this.children = [
            this.title,
            new Component({
                cssClass: 'today-modal__container',
                children: [
                    'You have the next planned tasks for today:'
                ]
            }),
            new Component({
                cssClass: 'today-modal__list',
                children: this.tasks.map(
                    item => new Component({
                        cssClass: 'today-modal__item',
                        children: [item.name]
                    })
                )
            }),
            new Component({
                cssClass: 'today-modal__btn-container',
                children: [
                    this.cancelOnButton
                ]
            })
        ]
    }

    hide = () => {
        this.element.style.display = 'none'
    }

    show = () => {
        this.element.style.display = 'block'
    }
}