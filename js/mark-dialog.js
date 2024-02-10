const template = document.createElement("template");
template.innerHTML = `
<style>
 div {
    background-color: cornflowerblue;
    color: black;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 3rem;
  }

  p{
    padding: .865rem;
    text-align: center;
  }

  .info {
    background-color: grey;
    color: white;
  }

  .success {
    background-color: green;
    color: white;
  }

  .error {
    background-color: red;
    color: white;
  }

  .btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  border-radius: 0.25rem;
  cursor: pointer;
  color: var(--dominant-color);
  border: none;
  margin: 0 0.25rem;
}
</style>

<div class="content-wrapper">
  <h1><slot name="title"> Message Title </slot></h1>
  <p><slot name="message"> Message to user </slot></p>

  <button class="btn"><slot name="click"></slot></button>
</div>
`;

class MarkDialog extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: "closed" });
    let clone = template.content.cloneNode(true);
    this.root.append(clone);

    // Default display is none
    this.style.display = "none";

    // handling click event
    let btnSlot = this.root.querySelector("button slot");

    btnSlot.parentElement.addEventListener("click", (ev) => {
      // we want to displayMessage() from main.js when the button is clicked
      let action =
        this.action && typeof window[this.action] === "function"
          ? window[this.action]
          : console.log("No action defined");

      action(ev);
    });
  }

  // open and close methods
  open() {
    this.style.display = "block";
  }

  close() {
    this.style.display = "none";
  }

  /* ------ Web components added or removed from the page ------*/

  connectedCallback() {
    // when <mark-dialog> is added to the DOM
    console.log("connected");
  }

  disconnectedCallback() {
    // when <mark-dialog> is removed from the DOM
    console.log("disconnected");
  }

  /* ------ define the allowed attributes ------*/

  static get observedAttributes() {
    return ["action", "color", "dialog"];
  }

  /* ------ sync the attributes with the properties ------*/

  get action() {
    return this.getAttribute("action");
  }
  set action(value) {
    this.setAttribute("action", value);
  }

  get color() {
    return this.getAttribute("color");
  }
  set color(value) {
    this.setAttribute("color", value);
  }

  get dialog() {
    return this.getAttribute("dialog");
  }
  set dialog(value) {
    this.setAttribute("dialog", value);
  }

  /* ------  handle values and changes to the attributes ------*/
  attributeChangedCallback(attrName, oldValue, newValue) {
    // make sure the value is lowercase cause it's case-sensitive
    if (attrName.toLowerCase() === "color") {
      const div = this.root.querySelector(".content-wrapper");

      if (newValue === "info") {
        div.classList.add("info");
      } else if (newValue === "success") {
        div.classList.add("success");
      } else {
        div.classList.add("error");
      }
    }

    if (attrName.toLowerCase() === "dialog") {
      const button = this.root.querySelector("button");
      button.textContent = newValue;
    }
  }
}

customElements.define("mark-dialog", MarkDialog);
