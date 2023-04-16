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
            items: this.hasSavedState() ? this.retrieveFromLocalStorage() : []
        }
        this.title = new Header({ text: props.title, level: 2 })
    }

    updateDOM() {
        this.saveToLocalStorage()
        this.children = [
            this.title,
            ...this.state.items
        ]
    }

    removeItem = item => {
        let items = [...this.state.items]
        const idx = items.findIndex(i => i.rawItem === item.rawItem)
        items.splice(idx, 1)
        this.setState({
            items: items
        })
    }

    addItem = item => {
        const rawItem = item instanceof ListItem ? item.rawItem : item
        this.setState({
            items: this.state.items.concat(this.wrapRawItem(rawItem))
        })
    }

    wrapRawItem = rawItem => new ListItem({
        rawItem: rawItem,
        removeItem: this.removeItem,
        cssClass: this.props.itemCssClass,
        onItemCheckboxClick: this.props.onItemCheckboxClick,
    })


    displayBySubstring = substring => {
        this.state.items.forEach(
            item => {
                item.setState({
                    isDisplayed: item.name.text.toLowerCase().includes(substring)
                })
            }
        )
    }

    saveToLocalStorage() {
        const rawItems = this.state.items.map(item => item.rawItem)
        localStorage.setItem(this.props.storageKey, JSON.stringify(rawItems))
    }

    retrieveFromLocalStorage() {
        const rawItems = JSON.parse(localStorage.getItem(this.props.storageKey))
        return rawItems.map(rawItem => this.wrapRawItem(rawItem))
    }
}



class ListItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isDisplayed: true
        }
        this.rawItem = props.rawItem
        this.rawItem.isCompleted = this.rawItem.isCompleted || false
        this.checkbox = new Checkbox({
            onChange: () => props.onItemCheckboxClick(this),
            cssClass: 'checkbox__input',
            isChecked: this.rawItem.isCompleted,
        })
        this.name = new Header({
            cssClass: 'checkbox__task-title',
            text: this.rawItem.name,
            level: 3
        })
        this.label = new Component({
            cssClass: `label label-${this.rawItem.label}`,
            children: [this.rawItem.label]
        })
        this.date = new Component({
            cssClass: 'date',
            children: [this.formatDate(this.rawItem.date)]
        })
        this.removeButton = new Button({
            onClick: () => props.removeItem(this),
            cssClass: 'checkbox__delete-btn'
        })
    }

    updateDOM() {
        if (this.state.isDisplayed) {
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
            this.removeButton,
        ]
    }

    display() {
        this.element.style.display = ''
    }

    hide() {
        this.element.style.display = 'none'
    }

    markAsCompleted = () => {
        this.rawItem.isCompleted = true
    }

    markAsActive = () => {
        this.rawItem.isCompleted = false
    }

    formatDate = (dateLikeString) => {
        if (dateLikeString == '') {
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
        let formattedDate = ''
        if (date.getFullYear() == today.getFullYear() &&
            date.getMonth() == today.getMonth() &&
            date.getDate() == today.getDate()
        ) {
            formattedDate = 'Today'
        } else if (
            date.getFullYear() == today.getFullYear() &&
            date.getMonth() == today.getMonth() &&
            date.getDate() - today.getDate() == 1
        ) {
            formattedDate = 'Tomorrow'
        } else {
            console.log(date.getDay())
            formattedDate = `${dayOfWeek[date.getDay()]}, ${date.getDate()} ${month[date.getMonth()]}`
        }
        if (date.getFullYear() != today.getFullYear()) {
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
                cssClass: 'label label-' + label,
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
            onClick: e => {
                this.hide()
                this.addItemOnButton.disable()
                this.addItem({
                    name: this.textInput.element.value,
                    label: this.label || '',
                    date: this.dateInput.element.value || '',
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
        const [today] = new Date().toISOString().split('T')
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
