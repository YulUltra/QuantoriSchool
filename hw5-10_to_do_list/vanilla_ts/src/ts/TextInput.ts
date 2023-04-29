import Input from "./Input";

export default class TextInput extends Input {
    constructor(props: {
        oninput: (e: Event) => any;
        cssClass?: string,
        placeholder?: string
    }) {
        super({ ...props, type: 'text' })
        this.element.oninput = props.oninput
    }
}
