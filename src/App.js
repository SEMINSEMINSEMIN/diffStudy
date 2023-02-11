import { Component } from "./core/Component.js";
import { Title } from "./components/Title.js";
import { AddItem } from "./components/AddItem.js";
import { Lists } from "./components/Lists.js";
import { FooterNav } from "./components/FooterNav.js";

export class App extends Component {
    setup() {
        this.$state = { items: [] };
    }

    template() {
        return `
            <header data-component="title"></header>
            <main>
                <div data-component="addItem"></div>
                <ul data-component="lists"></ul>
            </main>
            <footer data-component="footer"></footer>
        `;
    }

    mounted() {
        const $title = this.$target.querySelector('[data-component="title"]');
        const $addItem = this.$target.querySelector('[data-component="addItem"]');
        const $lists = this.$target.querySelector('[data-component="lists"]');
        const $footer = this.$target.querySelector('[data-component="footer"]');

        new Title($title, { title: "투두리스트" });
        new AddItem($addItem, { addItem: this.addItem.bind(this) });
        new Lists($lists, { items: this.items });
        new FooterNav($footer, { links: [
            { href: "www.naver.com", title: "네이버 바로가기" },
            { href: "www.youtube.com", title: "유튜브 바로가기" },
        ] })
    }

    get items() {
        console.log("mounted");
        const { items } = this.$state;
        console.log(items);
        return items;
    }

    addItem(targetInp) {
        const {items} = this.$state;
        console.log(items);
        console.log(targetInp.value);
        this.setState({
            items: [
                ...items,
                targetInp.value
            ]
        }, false);
        targetInp.value = "";
        const $lists = this.$target.querySelector('[data-component="lists"]');
        new Lists($lists, { items: this.items });
    }
}
