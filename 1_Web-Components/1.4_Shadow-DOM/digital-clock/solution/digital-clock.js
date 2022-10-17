/*
  1- Create a digital-clock component using shadow DOM.
  2- Each second, we must calculate the time and update the component HTML
  3- Maybe we should use custom-properties...
*/


'use strict';

class DigitalClock extends HTMLElement{
  constructor(){
    super();
  };

  connectedCallback(){
    this.getHour();

    setInterval(()=>{
      this.getHour();
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

    this.innerHTML=`<h1>${clockTime}</h1>`;
  };
};

window.customElements.define('digital-clock', DigitalClock);


