
import { TemplateEngine } from "../lib/coreVendor/handlebars/templateEngine.js";

var template = new TemplateEngine("/client/components/messageBox.template.hbs");
var templateClosable = new TemplateEngine("/client/components/messageBox-closable.template.hbs");

class MessageBox extends HTMLElement {

	constructor() {
		super();

		this.hasConnected = false;
		this.message = this.innerHTML;

		console.log(this.innerHTML)
	}

	static get observedAttributes() {
		return ["type", "closable"];
	}

	get type() {
		return this.getAttribute("type");
	}

	set type(value) {
		this.setAttribute("type", value);
	}

	get closable() {
		return Boolean(this.getAttribute("closable"));
	}

	set closable(value) {

		this.setAttribute("closable", value);
	}

	connectedCallback() {

		this.hasConnected = true;
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.hasConnected) {
			this.render();
		}
	}

	render() {

		if (this.message) {

			var data = {
				type: this.type,
				message: this.message
			};

			if (this.closable) {
				this.innerHTML = templateClosable.buildHtml(data);

				this.querySelector(".messageBoxCloseLink").addEventListener("click", function onClose(event) {

					event.preventDefault();
					this.innerHTML = "";

				}.bind(this));

			} else {
				this.innerHTML = template.buildHtml(data);
			}

			this.style.visibility = "visible";
		}
	}
}

template.initialize(function() {
	templateClosable.initialize(function() {

		customElements.define('message-box', MessageBox);
	});
});


export { MessageBox }