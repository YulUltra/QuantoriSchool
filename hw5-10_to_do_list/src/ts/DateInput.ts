import Input from "./Input";
import {stringifyDate} from "./Utils";

export default class DateInput extends Input {
    constructor(props: {cssClass?: string}) {
        super({ ...props, type: 'date' })
    }

    clear() {
        this.element.value = stringifyDate(new Date())
    }
}