import "./progress-bar.js";

const templateElement = document.createElement("template");

templateElement.innerHTML = `
<style>
  .film-item-wrapper{
    width: 200px;
    height: 300px
  }
  a{
    width: 100%;
    height: 100%;
  }
  img{
    width: 100%;
  }

</style>
<div class="film-item-wrapper">
  <a href="" target="_blank">
    <img src="" alt="">
    <progress-bar></progress-bar>
  </a>
</div>

`;

class FilItem extends HTMLElement {
  constructor() {
    super();

    this.name=this.getAttribute('name') || null;
    this.image=this.getAttribute('image') || 'https://bitsofco.de/content/images/2018/12/broken-1.png';
    this.progress=this.getAttribute('progress') || null; //no pintar barra si no tenemos valoración

    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    const template = templateElement.content.cloneNode(true);

    const progressBarElement = template.querySelector('progress-bar');
    progressBarElement.setAttribute("progress", this.progress);

    this.shadowRoot.appendChild(template);

    const imgElement = this.shadowRoot.querySelector('img');
    imgElement.src=this.image;

    const linkElement = this.shadowRoot.querySelector('a');
    linkElement.setAttribute("href", `https://www.filaffinity.com/es/search.php?stext=${this.name}`);

  }
}

customElements.define("film-item", FilItem);
