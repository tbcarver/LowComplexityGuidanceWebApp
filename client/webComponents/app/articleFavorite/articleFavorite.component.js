
// Using the html parsed element in order to receive innerHTML from the component"s use in the HTML
// i.e. <message-box type="danger">Error message</message-box>
// StackOverflow 48498581

import HTMLParsedElement from "html-parsed-element";
import coreBoolean from "../../../lib/core/extensions/coreBoolean";
import coreFetch from "../../../lib/core/extensions/coreFetch";

// Using require only on handlebars templates with handlebars-loader
var template = require("./articleFavorite.template.hbs");

class ArticleFavorite extends HTMLParsedElement {

	static get observedAttributes() {
		return ["countFavorites, isFavorite, displayText"];
	}

	get countFavorites() {

		var countFavorites = this.getAttribute("count-favorites");

		if (!countFavorites) {
			countFavorites = 0;
		}

		return parseInt(countFavorites);
	}

	set countFavorites(value) {
		this.setAttribute("count-favorites", value);
	}

	get isFavorite() {

		var isFavorite = this.getAttribute("is-favorite");
		return coreBoolean.convert(isFavorite);
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

	get articleId() {
		return this.getAttribute("article-id");
	}

	set articleId(value) {
		this.setAttribute("article-id", value);
	}

	get userId() {
		return this.getAttribute("user-id");
	}

	set userId(value) {
		this.setAttribute("user-id", value);
	}

	parsedCallback() {
		this.initialClassName = this.getAttribute("class");
		this.setAttribute("class", "");

		this.text = this.innerHTML;
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.parsed) {
			this.render();
		}
	}

	render(animation) {

		var data = {};

		data.className = this.initialClassName;
		data.className += " btn";
		data.className += this.isFavorite ? " btn-primary" : " btn-outline-primary";
		data.className += " " + animation;

		var countFavorites = this.countFavorites || 0;
		data.text = countFavorites;

		if (this.displayText) {

			data.text = this.isFavorite ? "Unfavorite" : "Favorite";
			data.text += ` article (${countFavorites})`;
		}

		this.innerHTML = template(data);

		var button = this.querySelector("button");

		button.addEventListener("click", onButtonClick.bind(this));
	}
}

function onButtonClick(event) {

	if (this.userId) {
		if (this.articleId) {

			var url = "/api/users/favoriteArticle/add";

			if (this.isFavorite) {
				url = "/api/users/favoriteArticle/remove";
			}

			var data = {
				userId: this.userId,
				articleId: this.articleId,
			}

			var options = coreFetch.getPostOptions(data);

			fetch(url, options).then(function(response) {

				if (response.status === 200) {
					this.isFavorite = !this.isFavorite;
					this.countFavorites += this.isFavorite ? 1 : -1;
					this.render("animated heartBeat");
				} else {
					flash.danger("An error has occurred");
				}

			}.bind(this));


		} else {
			flash.danger("Unknown article");
		}
	} else {
		flash.warning("Please <strong>login</strong> to favorite articles");
	}
}

customElements.define("article-favorite", ArticleFavorite);

export default ArticleFavorite