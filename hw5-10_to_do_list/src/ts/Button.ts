import Component from "./Component";

export default class Button extends Component {
    element: HTMLButtonElement
    state: {disabled: boolean}
    text: string

    constructor(props: {
        onClick: () => void,
        text?: string,
        cssClass?: string,
        isDisabledByDefault?: boolean,
    }) {
        super({ ...props, elementType: 'button', })
        this.state = {
            disabled: props.isDisabledByDefault
        }
        this.element.onclick = props.onClick
        this.text = props.text
    }

    updateDOM() {
        this.element.disabled = this.state.disabled
        if (this.text) {
            this.children = [this.text]
        }
    }

    disable() {
        this.setState({ disabled: 'disabled' })
    }

    enable() {
        this.setState({ disabled: false })
    }
}