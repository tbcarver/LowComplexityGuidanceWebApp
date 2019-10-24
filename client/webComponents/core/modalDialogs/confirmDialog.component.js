
// Using the html parsed element in order to receive innerHTML from the component"s use in the HTML
// i.e. <message-box type="danger">Error message</message-box>
// StackOverflow 48498581

import HTMLParsedElement from "html-parsed-element";

// Using require only on handlebars templates with handlebars-loader
var template = require("./confirmDialog.template.hbs");

class ConfirmDialog extends HTMLParsedElement {

	static get observedAttributes() {
		return ["type, yes-text, no-text, yes-href, no-href"];
	}

	get type() {
		return this.getAttribute("type");
	}

	set type(value) {
		this.setAttribute("type", value);
	}

	get yesText() {
		return this.getAttribute("yes-text");
	}

	set yesText(value) {
		this.setAttribute("yes-text", value);
	}

	get yesHref() {
		return this.getAttribute("yes-href");
	}

	set yesHref(value) {
		this.setAttribute("yes-href", value);
	}

	get noText() {
		return this.getAttribute("no-text");
	}

	set noText(value) {
		this.setAttribute("no-href", value);
	}

	get noHref() {
		return this.getAttribute("no-href");
	}

	set noHref(value) {
		this.setAttribute("no-href", value);
	}

	parsedCallback() {
		this.body = this.innerHTML;
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.parsed) {
			this.render();
		}
	}

	render() {

		if (this.id) {

			var data = {
				isForm: this.type === "form",
				yesText: this.yesText || "Yes",
				yesHref: this.yesHref || "javascript:void(0);",
				yesId: this.id + "-yes",
				noText: this.noText || "No",
				noHref: this.noHref || "javascript:void(0);",
				noId: this.id + "-no",
				modalId: this.id + "-modal",
				body: this.body,
			};

			this.innerHTML = template(data);

			var toggleButton = document.querySelector(`[data-target="#${this.id}"]`);
			if (toggleButton) {
				toggleButton.dataset.target = `#${data.modalId}`;
			}

		} else {
			this.innerHTML = "<strong><span class=\"text-danger\">ERROR: This web component must have an id.</span></strong>";
		}
	}
}

customElements.define("core-confirm-dialog", ConfirmDialog);

export default ConfirmDialog;