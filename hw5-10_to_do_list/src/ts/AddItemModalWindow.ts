import '../styles/AddModalWindow.css'
import Component from "./Component";
import Header from "./Header";
import TextInput from "./TextInput";
import DateInput from "./DateInput";
import Button from "./Button";
import Task from "./Task";
export default class AddItemModalWindow extends Component {
    addItem: (task: Task) => Promise<void>
    title: Header
    textInput: TextInput
    addItemOnButton: Button
    dateInput: DateInput
    labelButtons: Array<Button>
    label: string
    cancelOnButton: Button
    constructor(props: {addItem: (task: Task) => Promise<void>, cssClass?: string}) {
        super(props)
        this.addItem = props.addItem
        this.title = new Header({ cssClass: 'modal__title', text: 'Add New Task', level: 2 })
        this.textInput = new TextInput({
            cssClass: 'modal__input',
            placeholder: 'Task Title',
            oninput: (e: Event) => {
                const target = e.target as HTMLInputElement
                target.value ? this.addItemOnButton.enable() : this.addItemOnButton.disable()
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