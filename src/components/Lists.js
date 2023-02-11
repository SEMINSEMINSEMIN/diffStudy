import { Component } from "../core/Component.js";

export class Lists extends Component {
    // setup() {
    //     this.$state = { items: ["item1", "item2"] };
    // }
    template() {
        const { items } = this.$props;
        return `${items.map((item) => items && `<li>${item}</li>`).join("")}`;
    }
}
