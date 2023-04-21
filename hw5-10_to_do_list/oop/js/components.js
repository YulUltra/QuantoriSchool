class Button extends Component {
    constructor(props) {
        super({ ...props, elementType: 'button', })
        this.state = {
            disabled: props.isDisabledByDefault ? 'disabled' : false,
        }
        this.element.onclick = props.onClick
    }

    updateDOM() {
        this.element.disabled = this.state.disabled
        if (this.props.text) {
            this.children = [this.props.text]
        }
    }

    disable() {
        this.setState({ disabled: 'disabled' })
    }

    enable() {
        this.setState({ disabled: false })
    }
}


class List extends Component {
    constructor(props) {
        super({ ...props, elementType: 'ul' })
        this.state = {
            items: props.initItems || [],
            displayItemsBySubstring: '',
        }
        this.title = new Header({ text: props.title, level: 2 })
    }

    updateDOM() {
        this.children = [
            this.title,
            ...this.state.items.map(
                item => new ListItem({
                    isDisplayed: item.name.toLowerCase().includes(this.state.displayItemsBySubstring),
                    item: item,
                    cssClass: this.props.itemCssClass,
                    onCheckboxClick: this.props.onCheckboxClick,
                    deleteItem: this.props.deleteItem,
                })
            )
        ]
    }
}


class ListItem extends Component {
    constructor(props) {
        super(props)
        this.checkbox = new Checkbox({
            onChange: () => props.onCheckboxClick(this.props.item),
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
    }

    updateDOM() {
        if (this.props.isDisplayed) {
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

    formatDate = (dateLikeString) => {
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


class AddItemModalWindow extends Component {
    constructor(props) {
        super(props)
        this.addItem = props.addItem
        this.title = new Header({ cssClass: 'modal__title', text: 'Add New Task', level: 2 })
        this.textInput = new TextInput({
            cssClass: 'modal__input',
            placeholder: 'Task Title',
            oninput: e => {
                e.target.value ? this.addItemOnButton.enable() : this.addItemOnButton.disable()
            }
        })
        this.dateInput = new DateInput({ cssClass: 'modal__date-input' })
        this.labelButtons = ['health', 'work', 'home', 'other'].map(
            label => new Button({
                text: label,
                cssClass: `label label-${label}`,
                onClick: () => {
                    this.label = label
                }
            })
        )
        this.cancelOnButton = new Button({
            cssClass: 'btn modal__cancel-btn',
            text: 'Cancel',
            onClick: this.hide
        })
        this.addItemOnButton = new Button({
            cssClass: 'btn modal__submit-btn',
            text: 'Add Task',
            onClick: () => {
                this.hide()
                this.addItemOnButton.disable()
                this.addItem({
                    name: this.textInput.element.value,
                    label: this.label || '',
                    date: this.dateInput.element.value || '',
                    isCompleted: false
                })
            },
            isDisabledByDefault: true,
        })
        this.hide()
    }

    updateDOM() {
        this.children = [
            this.title,
            this.textInput,
            new Component({
                cssClass: 'modal__container',
                children: [
                    new Component({
                        cssClass: 'modal__label-container',
                        children: this.labelButtons,
                    }),
                    this.dateInput
                ]
            }),
            new Component({
                cssClass: 'modal__btn-container',
                children: [
                    this.cancelOnButton,
                    this.addItemOnButton
                ]
            })
        ]
    }

    hide = () => {
        this.element.style.display = 'none'
    }

    clearInputs = () => {
        this.textInput.clear()
        this.dateInput.clear()
        this.label = ''
    }
}

class TodayTasksModalWindow extends Component {
    constructor(props) {
        super(props)
        this.title = new Header({ cssClass: 'today-modal__title', text: 'Good Morning', level: 2 })
        this.cancelOnButton = new Button({
            cssClass: 'btn today-modal__submit-btn',
            text: 'Ok',
            onClick: this.hide
        })

        const storageKey = 'todayTasksModalWindowLastShowDate'
        const state = localStorage.getItem(storageKey)
        const today = new Date()
        if (state && datesAreEqual(today, new Date(state)) || !props.items.length) {
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
                children: this.props.items.map(
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



class Header extends Component {
    constructor(props) {
        const level = props.level || 1
        super({ cssClass: props.cssClass, elementType: 'h' + level })
        this.text = props.text
    }

    updateDOM() {
        this.children = [this.text]
    }
}

class Input extends Component {
    constructor(props) {
        super({ ...props, elementType: 'input' })
        this.element.type = props.type
        if (props.placeholder) {
            this.element.placeholder = props.placeholder
        }
    }

    clear() {
        this.element.value = ''
    }
}

class TextInput extends Input {
    constructor(props) {
        super({ ...props, type: 'text' })
        this.element.oninput = props.oninput
    }
}

class DateInput extends Input {
    constructor(props) {
        super({ ...props, type: 'date' })
    }

    clear() {
        const [today] = stringifyDate(new Date())
        this.element.value = today
    }

}

class Search extends Input {
    constructor(props) {
        super({ ...props, type: 'search' })
        this.element.incremental = props.isIncremental ? 'incremental' : false
        this.element.onsearch = props.onSearch
    }
}


class Checkbox extends Input {
    constructor(props) {
        super({ ...props, type: 'checkbox' })
        this.element.onchange = props.onChange
        if (props.isChecked) {
            this.element.checked = true
        }
    }
}


class Image extends Component {
    constructor(props) {
        super({ ...props, elementType: 'img' })
        this.element.src = props.src
    }
}
