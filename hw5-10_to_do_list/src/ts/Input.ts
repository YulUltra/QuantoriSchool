import Component from "./Component";

export default class Input extends Component {
    element: HTMLInputElement
    constructor(props: {type: string, cssClass?: string, placeholder?: string}) {
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