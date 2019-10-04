
var dom = {
	uniqueIds: {},
}

dom.appendHtml = function(element, html) {

	var template = document.createElement("template");
	template.innerHTML = html;

	element.appendChild(template.content);
}

dom.appendScript = function(src, callback) {

	var scriptElement = dom.createElement("script", { src: src });

	scriptElement.addEventListener("load", function() {

		callback();
	});

	document.body.appendChild(scriptElement);
}

dom.generateUniqueId = function(name) {

	var uniqueId;
	var tries = 0;

	while (!uniqueId || tries > 1000) {

		var uniqueIdTry = name + "_" + Math.ceil(Math.random() * 10e5);

		if (!this.uniqueIds.hasOwnProperty(uniqueIdTry)) {
			uniqueId = uniqueIdTry;
			this.uniqueIds[uniqueId] = null;
		}

		tries++;
	}

	return uniqueId;
}


export default dom;