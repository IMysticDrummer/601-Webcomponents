import './input-action.js';
import './list-item.js';

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
  div {
    border: solid grey 2px;
    background-color: var(--item-back-color, whitesmoke);
    width: 100%;
  }

</style>

<div class="item-list-app-wrapper">
  <h2>keepcoding component boilerplate</h2>
  <h3>There's no task yet</h3>
  <div class="todos-wrapper">
  </div>
  <input-action icon="🔍" placeholder="cositas para hacer"></input-action>
</div>

`;

class ItemsListApp extends HTMLElement {
  constructor() {
    super();
    
    this.title=this.getAttribute('title') || "Today's task";
    

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    this.shadowRoot.querySelector('h2').textContent=this.title;
    
    this.shadowRoot.querySelector('input-action').addEventListener('sendText', (event)=>{
      this.addNewItem(event.detail);
    });
  }

  addNewItem(itemText){
    const divElement=document.createElement('div');
    divElement.innerHTML=`
      <list-item text="${itemText}"></list-item>
    `;
    this.shadowRoot.querySelector('.todos-wrapper').appendChild(divElement.querySelector('list-item'));

  }
}

customElements.define("items-list-app", ItemsListApp);