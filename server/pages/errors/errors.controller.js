
function initialize(app, acl) {

	acl.allow("public starts with", "/error", "*");
	app.get("/error/:status", getError);
}

function getError(req, res) {

	var model = { title: "500 Error" };
	var template = "errors/500.template.hbs";
	res.status(500);

	switch (req.params.status) {

		case "403":
			model.title = "403 Unauthorized";
			template = "errors/403.template.hbs";
			res.status(403);
			break;

		case "404":
			model.title = "404 Not Found";
			template = "errors/404.template.hbs";
			res.status(404);
			break;
	}

	res.render(template, model);
}

module.exports.initialize = initialize;