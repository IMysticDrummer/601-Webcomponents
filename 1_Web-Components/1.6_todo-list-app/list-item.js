const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
  div {
    border: solid grey 2px;
    background-color: var(--item-back-color, whitesmoke);
    width: 100%;
  }

</style>

<div class="list-item-wrapper">
  <span>keepcoding component boilerplate</span>
  <button>❌</button>
</div>

`;

// responsabilidad: pinta un texto y debe ser borrable. DONE
// atributos:DONE
//  texto
// eventos: DONE
//  borrado de item
// custom properties DONE
//  X

class ListItem extends HTMLElement {
  constructor() {
    super();
    
    if (!this.getAttribute('text')) {
      throw new Error('Sin texto');
    } else {
      this.text=this.getAttribute('text');
    }

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    const spanElement=this.shadowRoot.querySelector('span');
    spanElement.textContent=this.text;

    const buttonElement=this.shadowRoot.querySelector('button');
    buttonElement.addEventListener('click', ()=>{
      const event = new CustomEvent('removeItem');
        
      this.dispatchEvent(event)

      this.remove();
    });
  }
}

customElements.define("list-item", ListItem);
