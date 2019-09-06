
class TemplateEngine {

	constructor(templateUrl) {
		this.templateUrl = templateUrl;
	}

	initialize(callback) {

		if (!this.templateUrl) {
			throw new Error("Template url not found.");
		}

		fetch(this.templateUrl)
			.then(function(response) {

				// TODO: Status code check
				return response.text();
			})
			.then(function(text) {

				this.compiledTemplate = Handlebars.compile(text);
				callback();
			}.bind(this));
	}

	buildHtml(data) {

		if (!this.compiledTemplate) {
			throw new Error("Compiled template not found.");
		}

		return this.compiledTemplate(data);
	}
}


export { TemplateEngine }