import Input from "./Input";

export default class Search extends Input {
    constructor(props: {
        cssClass?: string,
        placeholder?: string,
        onSearch: (e: Event) => void,
        isIncremental: boolean
    }) {
        super({ ...props, type: 'search' })
        // @ts-ignore
        this.element.incremental = props.isIncremental ? 'incremental' : false
        // @ts-ignore
        this.element.onsearch = props.onSearch
    }
}