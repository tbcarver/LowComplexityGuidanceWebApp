
// Using the html parsed element in order to receive innerHTML from the component"s use in the HTML
// StackOverflow 48498581

import HTMLParsedElement from "html-parsed-element";
// Typeahead.js must be included as a script link on the webpage not imported

class Typeahead extends HTMLParsedElement {

	static get observedAttributes() {
		return ["placeholder"];
	}

	get placeholder() {
		return this.getAttribute("placeholder");
	}

	set placeholder(value) {
		this.setAttribute("placeholder", value);
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

		var input = document.createElement("input");
		input.type = "text";
		input.className = this.getAttribute("class");
		input.placeholder = this.placeholder;

		this.appendChild(input);

		var bloodhound
		var bloodhoundOptions = {
			limit: 10,
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			identify: function(datum) {
				return datum.id;
			},
			sufficient: 5,
		};

		var prefetchUrl = this.getAttribute("prefetch-url");

		if (prefetchUrl) {
			bloodhoundOptions.prefetch = {
				url: prefetchUrl,
			}
		}

		var remoteUrl = this.getAttribute("remote-url");

		if (remoteUrl) {
			bloodhoundOptions.remote = {
				url: remoteUrl,
				wildcard: "query",
				transform: function(datum) {
					bloodhound.add(datum);
					return datum;
				},
			};
		}

		var bloodhound = new Bloodhound(bloodhoundOptions);
		bloodhound.initialize();

		var typeaheadOptions = {
			hint: true,
			highlight: true,
			minLength: 1
		};

		var suggestionName = this.getAttribute("suggestion-name");

		var typeaheadDataset = {
			name: 'value',
			displayKey: 'value',
			source: bloodhound.ttAdapter(),
			templates: {
				empty: `<div class="tt-suggestion">
							${suggestionName} not found
						</div>`,
			}
		};

		$(input).typeahead(typeaheadOptions, typeaheadDataset);
	}
}

customElements.define("core-typeahead", Typeahead);


export default Typeahead