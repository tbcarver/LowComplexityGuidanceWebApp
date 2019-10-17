
// Using the html parsed element in order to receive innerHTML from the component"s use in the HTML
// i.e. <message-box type="danger">Error message</message-box>
// StackOverflow 48498581

import HTMLParsedElement from "html-parsed-element";

// Using require only on handlebars templates with handlebars-loader
var template = require("./articleFavorite.template.hbs");

class ArticleFavorite extends HTMLParsedElement {

	static get observedAttributes() {
		return ["countFavorites, isFavorite"];
	}

	get countFavorites() {
		return this.getAttribute("count-favorites");
	}

	set countFavorites(value) {
		this.setAttribute("count-favorites", value);
	}

	get isFavorite() {
		return this.getAttribute("is-favorite");
	}

	set isFavorite(value) {
		this.setAttribute("is-favorite", value);
	}

	get displayText() {
		return this.getAttribute("display-text");
	}

	set displayText(value) {
		this.setAttribute("display-text", value);
	}

	parsedCallback() {
		this.text = this.innerHTML;
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.parsed) {
			this.render();
		}
	}

	render() {

		var data = {};

		data.className = this.className;
		data.className += " btn";
		data.className += this.isFavorite ? " btn-primary" : " btn-outline-primary";
		
		var countFavorites = this.countFavorites || 0;
		data.text = countFavorites;

		if (this.displayText) {

			data.text = this.isFavorite ? "Unfavorite" : "Favorite";
			data.text += ` article (${countFavorites})`;
		}

		this.innerHTML = template(data);
	}
}

customElements.define("article-favorite", ArticleFavorite);


export default ArticleFavorite