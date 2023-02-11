import { Component } from "../core/Component.js";

export class AddItem extends Component {
    template() {
        return `
            <input class="addInp" type="text" placeholder="투두리스트 항목 입력">
            <button class="addBtn">추가</button>
        `;
    }

    setEvent() {
        const { addItem } = this.$props;
        // requestAnimationFrame 제거
        const $addInp = this.$target.querySelector(".addInp");
        const $addButton = this.$target.querySelector(".addBtn");
        $addButton.removeEventListener("click", () => addItem($addInp));
        $addButton.addEventListener("click", () => addItem($addInp));
    }
}
