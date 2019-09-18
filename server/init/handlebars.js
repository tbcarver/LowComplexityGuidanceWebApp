
var expressHandlebars = require("express-handlebars");
var addAttributeByBooleanHelper = require("../lib/coreVendor/handlebars/helpers/addAttributeByBooleanHelper");
var addAttributeByCompareHelper = require("../lib/coreVendor/handlebars/helpers/addAttributeByCompareHelper");
var addNameByBooleanHelper = require("../lib/coreVendor/handlebars/helpers/addNameByBooleanHelper");
var addNameByCompareHelper = require("../lib/coreVendor/handlebars/helpers/addNameByCompareHelper");

function initialize(app) {

	var handlebars = expressHandlebars.create({
		extname: ".hbs",
		layoutsDir: "server/app/layouts/dist/",
		partialsDir: "server/app/partials/",
		defaultLayout: "main.layout.hbs",
		helpers: {
			[addAttributeByBooleanHelper.name]: addAttributeByBooleanHelper.helper,
			[addAttributeByCompareHelper.name]: addAttributeByCompareHelper.helper,
			[addNameByBooleanHelper.name]: addNameByBooleanHelper.helper,
			[addNameByCompareHelper.name]: addNameByCompareHelper.helper,
		},
	});

	app.engine("hbs", handlebars.engine);
	app.set("view engine", "hbs");
	app.set("views", "server/app");
}


module.exports.initialize = initialize;