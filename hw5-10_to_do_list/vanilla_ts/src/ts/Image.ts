import Component from "./Component";

export default class Image extends Component {
    element:HTMLImageElement;
    constructor(props: {src: string}) {
        super({ ...props, elementType: 'img' })
        this.element.src = props.src
    }
}