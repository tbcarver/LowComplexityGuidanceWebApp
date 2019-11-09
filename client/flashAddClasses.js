
function flashAddClasses(selector, classes) {

	var element = document.querySelector(selector);
	if (element) {

		classes = classes.split(" ");

		for (var cssClass of classes) {
			element.classList.add(cssClass);
		}
	}
}

module.exports = flashAddClasses;