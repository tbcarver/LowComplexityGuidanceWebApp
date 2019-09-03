
var templateViewRenderer = function(request, response, next) {

	if (response.view) {

		var view = response.view;

		response.render(view.template, view.model);
		
	} else {

		next();
	}
}


module.exports = templateViewRenderer;