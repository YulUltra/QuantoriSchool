import Input from "./Input";

export default class Checkbox extends Input {
    constructor(
        props: {
            onChange: () => void,
            cssClass?: string,
            isChecked?: boolean
        }) {
        super({ ...props, type: 'checkbox' })
        this.element.onchange = props.onChange
        if (props.isChecked) {
            this.element.checked = true
        }
    }
}