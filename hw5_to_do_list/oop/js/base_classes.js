class Component {
    constructor(props) {
        this.props = props
        this.state = {}
        this.children = props.children
        const elementType = props.elementType || 'div'
        this.element = document.createElement(elementType)
        if (props.cssClass) {
            this.element.className = props.cssClass
        }
    }

    setState(state) {
        this.state = { ...this.state, ...state }
        this.update()
    }

    update() {
        this.render()
    }

    updateDOM() { }

    render() {
        const element = this.element
        element.innerHTML = ''
        this.updateDOM()
        if (this.children) {
            element.append(
                ...this.children.map(
                    childComponent => {
                        let renderedComponent = ''
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

    hasSavedState() {
        return localStorage.getItem(this.props.storageKey) != null
    }
}