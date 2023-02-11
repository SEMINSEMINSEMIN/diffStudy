import { Component } from "../core/Component.js";

export class Title extends Component {
    template() {
        const { title } = this.$props;
        return `<h1>${title}</h1>`;
    }
}