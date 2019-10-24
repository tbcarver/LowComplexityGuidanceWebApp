
// Using the html parsed element in order to receive innerHTML from the component"s use in the HTML
// i.e. <message-box type="danger">Error message</message-box>
// StackOverflow 48498581

import HTMLParsedElement from "html-parsed-element";

// Using require only on handlebars templates with handlebars-loader
var template = require("./messageBox.template.hbs");

var typesCssClasses = {
	"success": "",
	"danger": "animated shake",
	"warning": "",
	"info": "",
};

var typesIconCssClasses = {
	"success": "fas fa-check",
	"danger": "fas fa-bomb",
	"warning": "fas fa-exclamation",
	"info": "fas fa-info",
};

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
				cssClass: typesCssClasses[this.type] || "",
				iconCssClass: typesIconCssClasses[this.type],
				message: this.message,
			};

			data.cssClass += " text-center";

			if (data.iconCssClass) {
				data.iconCssClass += " mr-2";
			}

			this.innerHTML = template(data);
		}
	}
}

customElements.define("core-message-box", MessageBox);

export default MessageBox;