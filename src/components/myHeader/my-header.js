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
        e.preventDefault();
        /* const searchInputTxt = this.shadowRoot.querySelector(".search-input").value.trim(); */
        const crud = document.querySelector(".crud");
        const searchInputTxt = 'Hola soy el input';
        const all = new Worker("src/workers/ws.js", { type: "module" });
        all.postMessage({ accion: "showAll", body: searchInputTxt });

        all.addEventListener("message", (e) => {
            /* crud.append([...e.data]); */
            console.log("Hola");
            all.terminate()
        });
    }

    connectedCallback() {
        Promise.resolve(MyHeader.components()).then(html => {
            this.shadowRoot.innerHTML = html;
            this.btnPopUp = this.shadowRoot.querySelector(".btnLoging-popup");

            this.btnPopUp.addEventListener("click", this.handleEvent.bind(this));
        });
    }

    disconnectedCallback() {
        
    }
}
customElements.define(config.name(MyHeader.url), MyHeader);