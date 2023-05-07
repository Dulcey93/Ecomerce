import config from "../../../config/config_path.js";

export default class MyHeader extends HTMLElement {
    static url = import.meta.url;
    static async components() {
        return await (await fetch(config.endPoint(MyHeader.url))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    handleEvent(e) {
        (e.type === "click") ? this.sendMessage(e) : undefined;

    }

    sendMessage(e) {
        console.log(e.target);
        e.target.classList.add('active-popup');
    }

    connectedCallback() {
        Promise.resolve(MyHeader.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.btnPopUp = this.shadowRoot.querySelector(".btnLoging-popup");
            const wrapper = document.querySelector(".wrapper");

            this.btnPopUp.addEventListener("click", this.handleEvent.bind(wrapper));
        });
    }

    disconnectedCallback() {
        
    }
}
customElements.define(config.name(MyHeader.url), MyHeader);