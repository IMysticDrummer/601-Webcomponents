const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<div class="">
</div>

`;

class ProgressBar extends HTMLElement {
  constructor() {
    super();

    //Ejemplo coger atributos
    //this.progress = this.getAttribute("progress") || 0
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const element = this.shadowRoot.querySelector('.progress-bar');

  }
}

customElements.define("progress-bar", ProgressBar);
