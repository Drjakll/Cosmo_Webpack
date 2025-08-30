import './text_node.less'; 

class Text_Node extends HTMLElement {

    static get observedAttributes() {
        return ['text', 'photo_links'];
    }

    constructor() {

        super();

        //this.shadow = this.attachShadow({ mode: "open" });

    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    render() {

        let text = this.getAttribute('text') || "";

        this.innerHTML = `<div id="text-node-wrapper">${text}</div>`;
    }
}

export default Text_Node;