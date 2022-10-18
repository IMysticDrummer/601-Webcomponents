# Web Components

## 0. Generalidades
1. Los nombres de los web componentes deben tener los nombres en minúsculas y deben tener algún guión.  
2. Se debe crear con javascript siempre una clase, que extiende la clase `HTMLElement` para conseguir hacer un webcomponent.  
3. En la clase siempre hay que inicializar el constructor, mínimo con la instrucción `super()`.
4. Se debe utilizar el método `window.customElements.define('nombre-componente', ClaseComponente);` para generar el 
componente.
5. Utilizamos el componente, con el *nombre-compnente* que hayamos definido, como una etiqueta html (con sus atributos)

## 1.1 Hello World con *custom elements*
Se deben seguir los pasos anteriores.  
Después generamos las funciones para el manejo de lo queremos controlar en el ciclo de vida.
### Funciones "static get observedAttributes()" y "attributeChangedCallback(name, oldValue, newValue)"  
Es una función estática de clase que se encarga de observar cualquier cambio en los atributos de entrada que definamos, y
que asignaremos como atributos de la etiqueta de nuestro web component. Si no declaramos esta función estática, no
funcionará posteriormente la función `attributeChangedCallback(name, oldValue, newValue)`. Ejemplo:  
```javascript
  static get observedAttributes() {
    return ['test'];
  };

  attributeChangedCallback(name, oldValue, newValue) {
    console.log(`${name} chanded from ${oldValue} to ${newValue}`);
  };
```
Como indicación, podríamos añadir lógica específica para tratar los cambios en atributos concretos con `if`.  

### Función "connectedCallback()"  
Función que se "dispara" cuando el elemento es colgado en el DOM.  

### Función "disconnectedCallback()"  
Función que se ejecuta cuando el webcomponent es eliminado del DOM.
**Es muy buena práctica** utilizar esta función para **eliminar los escuchadores** al elemento cuando se 
borra, para liberar memoria.

## 1.2 Estándar HTML Template
Este estandar genera unas etiquetas html **inertes** que no se van a representar hasta que no sean utilizadas.

Se declara lo que necesitemos entre etiquetas `<template>`.
Declaramos la clase.  
Instanciamos con `customElements.define` fuera de la clase.
En la clase, dentro de la función connectedCallback vamos a recoger el template con querySelect.
Creamos un clon del template con `xxx.content.cloneNode(true)`, que hace un clonado complejo del **contenido** de la
variable indicada.  
En el ejercicio, aprovechamos para cambiar la imagen del template que hemos clonado.  
Hacemos un `appendChild` sobre `this`, para que añadamos el contenido en nuestra clase.
Utilizamos nuestro nuevo componente dónde necesitemos en el html.  

Como ejercicio complementario, recogemos una propiedad de la clase con `this.getAttribute('atributo')` para utilizarla. 
En nuestro ejemplo:
`this.image=this.getAttribute('image') || 'https://upload.wikimedia.org/wikipedia/commons/6/64/Ejemplo.png';`  
Esto causa que, en nuestro ejemplo, si no le damos un nombre de imagen, el componente pinta una por defecto...  
`clone.querySelector('img').src=this.image;`  
En este caso, recogemos el atrubuto de esta manera, porque sólo lo vamos a recibir al generar el componente. Si 
queremos "escuchar" cualquier cambio sobre el atributo, deberíamos implementar el mismo método que en el ejemplo anterior, y
vigilar los posibles errores por querer asignar la imagen, antes de crear del todo el elemento.  

## 1.3 Estándar ES Modules

## 1.4 Shadow Dom Estandar  
Shadow DOM = Encapsulado.
Encapsula el DOM del componente y lo que hagas en el DOM principal no le va a afectar... salvo que nosotros queramos.

En la primera parte del ejercicio, partimos de la solución del ejercicio 1.3, y podemos ver que si le damos un estilo al 
`<h1>` y encapsulamos el resultado del reloj en esas etiquetas, el cambio de estilo le afecta.

Para ello creamos un etiqueta de forma imperativa (javascript) una etiqueta template:  
`const templateElement=document.createElement('template)`  
Dentro de dicho templateElement, definimos el estilo y el contenedor que queremos utilizar para nuestro contenido. Por ejemplo:  
```javascript
  templateElement.innerHTML=`
    <style>
      h1 {
        color: var(--digital-clock-color, blue);
      }
    </style>

    <h1></h1>
  `;
```
Lo siguiente es indicar el modo de shadow DOM que queremos en el constructor. Se utiliza normalmente el modo "open" para asegurar que es accesible la estructura el webcomponent desde fuera. `this.attachShadow({mode: 'open'});`.  

Después, en el connectedCallback, tenemos que acceder al templateElement, seleccionar dentro el *contenedor* donde queremos 
introducir nuestro contenido, y añadir dicho contenido. Inmediatamente después, hay que añadir el elemento actualizado al shadowRoot. Ejemplo:  
```javascript
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
```
Se podría añadir el elemento primero, y luego seleccionar dentro el *contenedor* para añadir el contenido :).

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