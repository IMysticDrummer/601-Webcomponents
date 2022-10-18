'use strict';

const templateElement=document.createElement('template');

templateElement.innerHTML=`
  <style>
    
    input {
      text-align: var(--input-value-position, center)
    }
  </style>

  <div class="input-action-wrapper">
    <input type="text">
    <button></button>
  </div>
  
`;

class InputAction extends HTMLElement{
  constructor(){
    super();
    //Get attributes
    this.icon=this.getAttribute('icon') || '➕';
    this.placeholder=this.getAttribute('placeholder') || 'Add new TODO';
    this.attachShadow({mode: 'open'});
  };

  connectedCallback(){

    const template=templateElement.content.cloneNode(true);
    this.shadowRoot.appendChild(template);

    //Get the button element
    const buttonElement=this.shadowRoot.querySelector('button');
    buttonElement.textContent=this.icon;
    this.shadowRoot.querySelector('input').placeholder=this.placeholder;

    //Listenner to button
    buttonElement.addEventListener('click', ()=>{
      this.emitSendTextEvent();
    });
  };

  emitSendTextEvent() {
    //Get the input value
    const inputElement=this.shadowRoot.querySelector('input');

    if (inputElement.value) {
      const event=new CustomEvent('sendText', {
        detail: inputElement.value
      });
      
      this.dispatchEvent(event);
      inputElement.value='';
    }

  };
};

window.customElements.define('input-action', InputAction);