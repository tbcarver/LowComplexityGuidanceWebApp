
// Using require only on handlebars templates with handlebars-loader
var template = require("./pagination.template.hbs");

class MessageBox extends HTMLElement {

	constructor() {
		super();

		this.hasConnected = false;
	}

	static get observedAttributes() {
		return ["page-number", "page-size", "total", "display-numbers"];
	}

	get pageNumber() {
		return this.getAttribute("page-number");
	}

	set pageNumber(value) {
		this.setAttribute("page-number", value);
	}

	get pageSize() {
		return this.getAttribute("page-size");
	}

	set pageSize(value) {
		this.setAttribute("page-size", value);
	}

	get total() {
		return this.getAttribute("total");
	}

	set total(value) {
		this.setAttribute("total", value);
	}

	get displayNumbers() {
		return this.getAttribute("display-numbers");
	}

	set displayNumbers(value) {
		this.setAttribute("display-numbers", value);
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

		if (this.pageNumber && this.pageSize && (this.total || this.total === 0)) {

			var pageNumber = parseInt(this.pageNumber);
			var pageSize = parseInt(this.pageSize);
			var total = parseInt(this.total);

			var totalPages = pageSize * total;

			var data = {
				type: this.type,
				message: this.message
			};

			this.innerHTML = template(data);
		}
	}
}

customElements.define("core-pagination", MessageBox);


export default MessageBox