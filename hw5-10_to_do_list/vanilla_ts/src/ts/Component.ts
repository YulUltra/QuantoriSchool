export default class Component {
    props: {
        children?: Array<Component | string>,
        elementType?: string,
        cssClass?: string,
        [arg: string]: any
    }
    state: {}
    children?: Array<Component | string>
    element: HTMLElement;

    constructor(
        props: {
            children?: Array<Component | string>,
            elementType?: string, cssClass?: string,
        }) {
        this.props = props
        this.children = props.children
        const elementType = props.elementType || 'div'
        this.element = document.createElement(elementType)
        if (props.cssClass) {
            this.element.className = props.cssClass
        }
    }

    // @ts-ignore
    setState(state) {
        this.state = { ...this.state, ...state }
        this.render()
    }

    updateDOM(): void { }

    render() {
        const element = this.element
        element.innerHTML = ''
        this.updateDOM()
        if (this.children) {
            element.append(
                ...this.children.map(
                    childComponent => {
                        let renderedComponent
                        if (childComponent instanceof Component) {
                            renderedComponent = childComponent.render()
                        } else {
                            renderedComponent = childComponent
                        }
                        return renderedComponent
                    }
                )
            )
        }
        return element
    }
}