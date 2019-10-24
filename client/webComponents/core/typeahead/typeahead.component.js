
// Using the html parsed element in order to receive innerHTML from the component"s use in the HTML
// StackOverflow 48498581

import HTMLParsedElement from "html-parsed-element";
import PrefetchDataAdditionalStorage from "./prefetchDataAdditionalStorage";
// Typeahead.js must be included as a script link on the webpage not imported

// NOTE: The type="form" has a known issue when the users clicks away from the typeahead thereby losing
//  focus, and then clicking a button that submits the form. Clicking away from the typeahead removes the
//  tt-cursor before any other page action happens like button click and thereby clicking away from the
//  typeahead cannot be used to clear the tt-form-cursor.

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
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.parsed) {
			this.render();
		}
	}

	focus() {
		if (this.rendered) {
			var focusElement = this.querySelector(".tt-input");			
			if (focusElement){
				focusElement.focus();
			}
		}
	}

	render() {
		
		this.style.display = "block";

		var form;

		if (this.getAttribute("type") === "form") {
			form = this.closest("form");
			if (form) {
				form.addEventListener("submit", onFromSubmit);
			}
		}

		var input = document.createElement("input");
		input.type = "text";
		input.className = this.getAttribute("class");
		input.placeholder = this.placeholder;

		this.appendChild(input);

		// Datums is an array of objects with properties id and value
		// [{"id":21,"value":"21 Penelope Grant"},{"id":22,"value":"22 Rudolph Goodwin"}]

		var bloodhound;
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
		var prefetchDataAdditionalStorage = new PrefetchDataAdditionalStorage();

		if (prefetchUrl) {
			prefetchDataAdditionalStorage.dataKey = `__${prefetchUrl}__data__additional`;
			bloodhoundOptions.prefetch = {
				url: prefetchUrl,
				prepare: function(settings) {
					prefetchDataAdditionalStorage.clear();
					return settings;
				},
			};
		}

		var remoteUrl = this.getAttribute("remote-url");

		if (remoteUrl) {
			bloodhoundOptions.remote = {
				url: remoteUrl,
				wildcard: "searchTerm",
				rateLimitBy: "throttle",
				transform: function(datums) {
					bloodhound.add(datums);
					prefetchDataAdditionalStorage.add(datums);
					return datums;
				},
			};
		}

		var bloodhound = new Bloodhound(bloodhoundOptions);
		bloodhound.initialize()
			.done(function() {
				var datums = prefetchDataAdditionalStorage.get();
				bloodhound.add(datums);
			});

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
					<i class="fas fa-circle-notch fa-spin mr-2 text-primary"></i>Updating...
					</div>`,
				suggestion: function(context) {
					return `<div data-id="${context.id}">${context.value}</div>`;
				}
			}
		};

		var $input = $(input);

		$input.typeahead(typeaheadOptions, typeaheadDataset);

		$input.bind("typeahead:cursorchange", function(event, suggestion) {
			setFormCursor(event.target.parentElement, suggestion.id);
		});

		$input.bind("typeahead:open", function() {
			setCursor(event.target.parentElement);
		});

		$input.bind("typeahead:render", function(event) {
			setCursor(event.target.parentElement);
		});

		$input.bind("typeahead:select", function(event, suggestion) {
			submitForm(form, suggestion.id);
		});

		this.rendered = true;
	}
}

function setCursor(typeaheadJsElement) {

	var suggestionElements = typeaheadJsElement.querySelectorAll(".tt-suggestion");

	if (suggestionElements.length === 1) {

		suggestionElements[0].classList.add("tt-cursor");
		suggestionElements[0].classList.add("tt-form-cursor");

	} else if (suggestionElements.length > 0) {

		removeFormCursor(typeaheadJsElement);

		var hintInputElement = typeaheadJsElement.querySelector(".tt-hint");

		for (var suggestionElement of suggestionElements) {

			if (suggestionElement.textContent === hintInputElement.value) {

				suggestionElement.classList.add("tt-cursor");
				suggestionElement.classList.add("tt-form-cursor");
			}
		}
	}
}

function setFormCursor(typeaheadJsElement, id) {

	removeFormCursor(typeaheadJsElement);

	var suggestionElement = typeaheadJsElement.querySelector(`.tt-suggestion[data-id="${id}"]`);

	if (suggestionElement) {
		suggestionElement.classList.add("tt-form-cursor");
	}
}

function onFromSubmit(event) {

	event.preventDefault();

	var suggestionElement = event.target.querySelector(".tt-form-cursor");

	if (suggestionElement && suggestionElement.dataset.id) {
		submitForm(event.target, suggestionElement.dataset.id);
	}
}

function submitForm(form, id) {

	if (form && id) {
		location.href = form.action.replace("%s", id);
	}
}

function removeFormCursor(typeaheadJsElement) {

	var suggestionElements = typeaheadJsElement.querySelectorAll(".tt-suggestion");

	for (var suggestionElement of suggestionElements) {
		suggestionElement.classList.remove("tt-form-cursor");
	}
}

customElements.define("core-typeahead", Typeahead);

export default Typeahead;