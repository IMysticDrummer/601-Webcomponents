const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>

.progress-bar-wrapper {
  background-color: var(--progress-bar-background-color, black);
  width: 100%;
  height: var(--progress-bar-height, 30px);
}
.progress-bar {
  background-color: var(--progress-bar-background-color, orange);
  height:100%;
}

</style>

<div class="progress-bar-wrapper">
  <div class="progress-bar"></div>
</div>

`;

class ProgressBar extends HTMLElement {
  constructor() {
    super();

    this.progress = this.getAttribute("progress") || 0
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const progressBarElement = this.shadowRoot.querySelector('.progress-bar');

    progressBarElement.style.width = `${this.progress}%`;
  }
}

customElements.define("progress-bar", ProgressBar);
