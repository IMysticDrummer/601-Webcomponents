const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>


</style>

<button class="collapsible">Abrir</button>
<div class="slot-wrapper">
  <slot></slot>
</div>
`;

class KeepcodingCollapsible extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const button=this.shadowRoot.querySelector('button');

    button.addEventListener('click', function (){
      this.classList.toggle('active');
      const wrapper=this.nextElementSibling;
      if (wrapper.style.maxHeight){
        wrapper.style.maxHeight=null;
      } else {
        wrapper.style.maxHeight=`${wrapper.scrollHeight}px`;
      }
    });
  }
}

customElements.define("keepcoding-collapsible", KeepcodingCollapsible);
