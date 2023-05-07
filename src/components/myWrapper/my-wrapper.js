import config from "../../../config/config_path.js";

export default class MyWrapper extends HTMLElement {
    static url = import.meta.url;
    static async components() {
        return await (await fetch(config.endPoint(MyWrapper.url))).text();
    }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }
    handleEvent(e) {
        (e.type === "click") ? this.sendMessage(e) : undefined;

    }

    sendMessage(e) {
        /* e.classList.add('active');
        e.classList.remove('active'); */
        e.preventDefault();
        console.log(e.target);
    }

    connectedCallback() {
        Promise.resolve(MyWrapper.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            /* this.wrapper = this.shadowRoot.querySelector(".wrapper");
            this.loginLink = this.shadowRoot.querySelector(".login-link");
            this.registerLink = this.shadowRoot.querySelector(".register-link");
            const iconClose = this.shadowRoot.querySelector(".icon-close");

            this.registerLink.addEventListener("click", this.handleEvent.bind(this));
            this.loginLink.addEventListener("click", this.handleEvent.bind(this));
            iconClose.addEventListener("click", this.handleEvent.bind(wrapper)); */
        });
    }

    disconnectedCallback() {
        
    }
}
customElements.define(config.name(MyWrapper.url), MyWrapper);