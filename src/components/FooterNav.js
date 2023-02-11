import { Component } from "../core/Component.js";

export class FooterNav extends Component {
    template() {
        const { links } = this.$props;
        
        return links.map((link, i) => `<a href=${link.href}>${link.title}</a>`).join("");;
    }
}
