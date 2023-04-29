import Component from "./Component";

export default class Header extends Component {
    text: string;
    constructor(props: {
        cssClass?: string,
        text?: string,
        level?: number
    }) {
        const level = props.level || 1
        super({ cssClass: props.cssClass, elementType: 'h' + level })
        this.text = props.text
    }

    updateDOM() {
        this.children = [this.text]
    }
}