
// Using require only on handlebars templates with handlebars-loader
var template = require("./pagination.template.hbs");

import { unescape } from "lodash";

class Pagination extends HTMLElement {

	constructor() {
		super();

		this.hasConnected = false;
	}

	static get observedAttributes() {
		return ["pagination-data"];
	}

	get paginationData() {

		var paginationData = this.getAttribute("pagination-data");
		paginationData = unescape(paginationData);
		paginationData = JSON.parse(paginationData);

		return paginationData;
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

		debugger
		var paginationData = this.paginationData;

		if (paginationData.pageNumber && paginationData.pageSize && (paginationData.total || paginationData.total === 0)) {
			var pageNumber = parseInt(paginationData.pageNumber);
			var pageSize = parseInt(paginationData.pageSize);
			var total = parseInt(paginationData.total);
			var totalPages = (pageSize > 0) ? Math.ceil(total / pageSize) : 1;
			var url = paginationData.url;

			var data = {
				startNumber: ((pageNumber - 1) * pageSize) + 1,
				throughNumber: ((pageNumber - 1) * pageSize) + paginationData.pageTotal,
				total: total,
				firstDisabled: "",
				firstUrl: url.replace("%d", 1),
				backDisabled: "",
				backUrl: url.replace("%d", pageNumber - 1),
				nextDisabled: "",
				nextUrl: url.replace("%d", pageNumber + 1),
				lastDisabled: "",
				lastUrl: url.replace("%d", totalPages),
			};

			if (pageNumber === 1) {
				data.firstDisabled = "disabled";
				data.backUrl = "";
				data.backDisabled = "disabled";
				data.firstUrl = "";
			}

			if (pageNumber === totalPages) {
				data.nextDisabled = "disabled";
				data.nextUrl = "";
				data.lastDisabled = "disabled";
				data.lastUrl = "";
			}

			this.innerHTML = template(data);
		}
	}
}

customElements.define("core-pagination", Pagination);


export default Pagination