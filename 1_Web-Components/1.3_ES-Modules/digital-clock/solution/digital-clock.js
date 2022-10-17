/*
  1- Create a digital-clock component.
  2- Each second, we must calculate the time and update the component HTML
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

    const hours= now.getHours();
    const minutes= now.getMinutes();
    const seconds = now.getSeconds();

    if (seconds<10) {
      seconds=`0${seconds}`;
    };

    if (minutes<10) {
      minutes=`0${minutes}`;
    };

    const clockTime=`${hours}:${minutes}:${seconds}`;

    this.innerHTML=clockTime;
  };
};

window.customElements.define('digital-clock', DigitalClock);