import { updateElement } from "./updateElement.js";

export class Component {
    $target;
    $props;
    $state;

    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props;
        this.setup();
        this.render();
    }
    setup() {}
    mounted() {}
    template() {
        return "";
    }

    // 여기가 핵심이다.
    render() {
        const { $target } = this;

        // 기존 Node를 복제한 후에 새로운 템플릿을 채워넣는다.
        const newNode = $target.cloneNode(true);
        newNode.innerHTML = this.template();

        // DIFF알고리즘을 적용한다.
        const oldChildNodes = [...$target.childNodes];
        const newChildNodes = [...newNode.childNodes];
        const max = Math.max(oldChildNodes.length, newChildNodes.length);
        for (let i = 0; i < max; i++) {
            updateElement($target, newChildNodes[i], oldChildNodes[i]);
        }

        // 이벤트를 등록한다.
        requestAnimationFrame(() => this.setEvent());

        this.mounted();
    }

    setEvent() {}
    setState(newState, willRender) {
        this.$state = { ...this.$state, ...newState };
        console.log(this.$state);
        willRender && this.render();
    }
}
