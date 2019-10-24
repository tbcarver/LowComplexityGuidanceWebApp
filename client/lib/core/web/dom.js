var dom = {
	uniqueIds: {},
};

dom.appendHtml = function(element, html) {
	var template = document.createElement("template");
	template.innerHTML = html;

	element.appendChild(template.content);
};

dom.appendScript = function(src, callback) {
	var scriptElement = dom.createElement("script", { src: src });

	scriptElement.addEventListener("load", function() {
		callback();
	});

	document.body.appendChild(scriptElement);
};

dom.generateUniqueId = function(name) {
	var uniqueId;
	var tries = 0;

	while (!uniqueId || tries > 1000) {
		var uniqueIdTry = name + "_" + Math.ceil(Math.random() * 10e5);

		if (!Object.prototype.hasOwnProperty.call(this.uniqueIds, uniqueIdTry)) {
			uniqueId = uniqueIdTry;
			this.uniqueIds[uniqueId] = null;
		}

		tries++;
	}

	return uniqueId;
};

dom.setTextInputFocus = function(selector) {
	var element = document.querySelector(selector);

	if (element) {
		element.focus();

		// Set the cursor to the end of the text
		element.setSelectionRange(element.value.length, element.value.length);
	}
};

export default dom;
