## Slot
Es la forma de recoger lo que pongamos entre las etiquetas de nuestro web component.

Para ello es importante dentro de nuestro elemento template.innerHtml (o como lo llamemos), y después del style, debemos introducir la
etiqueta "slot", para que lo sustituya. Ejemplo:  
```javascript
  templateElement.innerHTML = `
    <style>


    </style>

    <button class="collapsible">Abrir</button>
    <div class="slot-wrapper">
      <slot></slot>
    </div>
  `;
```