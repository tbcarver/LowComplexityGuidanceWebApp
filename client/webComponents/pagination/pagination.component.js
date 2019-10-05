
// Using require only on handlebars templates with handlebars-loader
var template = require("./pagination.template.hbs");

// NOTE: Import only individual libraries from lodash.
import unescape from "lodash/unescape";

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
		this.style.display = "block";
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.hasConnected) {
			this.render();
		}
	}

	render() {

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
				firstUrl: url.replace("%s", 1),
				backDisabled: "",
				backUrl: url.replace("%s", pageNumber - 1),
				nextDisabled: "",
				nextUrl: url.replace("%s", pageNumber + 1),
				lastDisabled: "",
				lastUrl: url.replace("%s", totalPages),
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

			if (totalPages > 0) {

				var startRange;
				var endRange;

				if (totalPages <= 5) {
					startRange = 1;
					endRange = totalPages;
				} else if (pageNumber <= 3) {
					startRange = 1;
					endRange = 5;
				} else if (pageNumber >= 4 && totalPages >= pageNumber + 2) {
					startRange = pageNumber - 2;
					endRange = pageNumber + 2;
				} else {
					startRange = totalPages - 5;
					endRange = totalPages;
				}

				var numbers = [];
				for (var range = startRange; range <= endRange; range++) {
					numbers.push(range);
				}

				data.pageNumbers = [];

				for (var index = 0; index < numbers.length; index++) {

					var number = numbers[index];

					data.pageNumbers.push({
						number: number,
						url: url.replace("%s", number),
						active: (number === pageNumber) ? "active" : undefined,
					});
				}
			}

			this.innerHTML = template(data);
		}
	}
}

customElements.define("core-pagination", Pagination);


export default Pagination