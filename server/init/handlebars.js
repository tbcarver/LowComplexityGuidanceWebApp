
var expressHandlebars = require("express-handlebars");
var addNameByCompareHelper = require("./lib/coreVendor/handlebars/helpers/addNameByCompareHelper");

function initialize(app) {

	var handlebars = expressHandlebars.create({
		extname: ".hbs",
		layoutsDir: "server/app/layouts/",
		partialsDir: "server/app/partials/",
		defaultLayout: "main.layout.hbs",
		helpers: {
			[addNameByCompareHelper.name]: addNameByCompareHelper.helper,
		},
	});

	app.engine("hbs", handlebars.engine);
	app.set("view engine", "hbs");
	app.set("views", "server/app");
}


module.exports.initialize = initialize;