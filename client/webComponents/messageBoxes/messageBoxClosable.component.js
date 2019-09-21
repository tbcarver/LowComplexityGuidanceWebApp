
// Using the html parsed element in order to receive innerHTML from the component"s use in the HTML
// i.e. <message-box type="danger">Error message</message-box>
// StackOverflow 48498581

import HTMLParsedElement from "html-parsed-element";

// Using require only on handlebars templates with handlebars-loader
var template = require("./messageBoxClosable.template.hbs");

class MessageBox extends HTMLParsedElement {

	static get observedAttributes() {
		return ["type"];
	}

	get type() {
		return this.getAttribute("type");
	}

	set type(value) {
		this.setAttribute("type", value);
	}

	parsedCallback() {
		this.message = this.innerHTML;
		this.style.display = "block";
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.parsed) {
			this.render();
		}
	}

	render() {
			
		this.style.display = "block";

		if (this.message) {

			var data = {
				type: this.type,
				message: this.message
			};

			this.innerHTML = template(data);

			this.querySelector(".messageBoxCloseLink").addEventListener("click", function onClose(event) {

				event.preventDefault();
				this.innerHTML = "";

			}.bind(this));
		}
	}
}

customElements.define("core-message-box-closable", MessageBox);


export default MessageBox