
var expressHandlebars = require("express-handlebars");
var handlebarsHelpers = require('handlebars-helpers');

var helpers = [];

helpers.push(require("../lib/coreVendor/handlebars/helpers/addAttributeByBooleanHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/addAttributeByCompareHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/addNameByBooleanHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/addNameByCompareHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/formatDateHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/formatDateShortHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/formatDateTimeHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/formatDateTimeShortHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/isHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/isNotHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/hasRoleHelper"));
helpers.push(require("../lib/coreVendor/handlebars/helpers/stringifyHelper"));

function initialize(app) {

	var handlebars = expressHandlebars.create({
		extname: ".hbs",
		layoutsDir: "server/app/layouts/dist/",
		partialsDir: "server/app/partials/",
		defaultLayout: "main.layout.hbs",
		helpers: {},
	});

	for (var helper of helpers) {
		handlebars.helpers[helper.name] = helper.helper;
	}

	handlebarsHelpers.markdown({ handlebars: handlebars.handlebars });

	app.engine("hbs", handlebars.engine);
	app.set("view engine", "hbs");
	app.set("views", "server/app");
}


module.exports.initialize = initialize;