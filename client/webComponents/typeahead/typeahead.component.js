
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

		// Datums is an array of objects with properties id and value
		// [{"id":21,"value":"21 Penelope Grant"},{"id":22,"value":"22 Rudolph Goodwin"}]

		var bloodhound
		var bloodhoundOptions = {
			limit: 10,
			datumTokenizer: Bloodhound.tokenizers.obj.whitespace("value"),
			queryTokenizer: Bloodhound.tokenizers.whitespace,
			identify: function(datum) {
				return datum.id;
			},
			sufficient: 1,
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
				wildcard: "searchTerm",
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
			name: "value",
			displayKey: "value",
			source: bloodhound.ttAdapter(),
			templates: {
				empty: `
					<div class="tt-item">
						${suggestionName} not found
					</div>`,
				pending: `
					<div class="tt-item">
					<i class="fas fa-circle-notch fa-spin text-primary"></i> Updating...
					</div>`,
			}
		};

		var $input = $(input);

		$input.typeahead(typeaheadOptions, typeaheadDataset);

		$input.bind("typeahead:render", function(event) {
			selectWhenOneSuggestion(event.target.parentElement);
		});

		$input.bind("typeahead:open", function(event) {
			selectWhenOneSuggestion(event.target.parentElement);
		});
	}
}

function selectWhenOneSuggestion(parentElement) {

	var suggestionElements = parentElement.querySelectorAll(".tt-suggestion");

	if (suggestionElements.length === 1) {
		suggestionElements[0].classList.add("tt-cursor");
	}
}

customElements.define("core-typeahead", Typeahead);


export default Typeahead