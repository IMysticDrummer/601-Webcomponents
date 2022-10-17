'use strict';

const templateElement=document.createElement('template');

/**
 * Ojo, se  pueden utilizar las custom propertys de CSS para ser 
 * sensibles al color de la web... y si no está definida será azul.
 */
templateElement.innerHTML=`
  <style>
    h1 {
      color: var(--digital-clock-color, blue);
    }
  </style>

  <h1></h1>
`;

class DigitalClock2 extends HTMLElement{
  constructor(){
    super();

    //si ponemos close, no tendremos referencia externa para modificar nuestro shadow dom
    //Además, al hacer esto, "activamos" el shadow DOM, y por tanto después podemos acceder a la
    //característica shadow root
    this.attachShadow({mode: 'open'});
  };

  connectedCallback(){

    const template=templateElement.content.cloneNode(true);

    let currentTime=this.getHour();
    template.querySelector('h1').textContent=currentTime;
    this.shadowRoot.appendChild(template);

    setInterval(()=>{
      currentTime=this.getHour();
      this.shadowRoot.querySelector('h1').textContent=currentTime;
    },1000);
  };

  getHour(){
    const now=new Date();

    let hours= now.getHours();
    let minutes= now.getMinutes();
    let seconds = now.getSeconds();

    if (seconds<10) {
      seconds=`0${seconds}`;
    };

    if (minutes<10) {
      minutes=`0${minutes}`;
    };

    const clockTime=`${hours}:${minutes}:${seconds}`;

    return `${clockTime}`;
  };
};

window.customElements.define('digital-clock2', DigitalClock2);