/* global __webpack_require__:readonly */

// NOTE: This file is for client features that should be available on every server side served webpage.
//  Features that are for a single page should have there own js entry point file and webpack configuration.

// Create a main.require() allowing external scripts to access resources from the main bundle
var ExternalWebpackRequire = require("../lib/coreVendor/webpack/externalWebpackRequire");
var mainExternalWebpackRequire = new ExternalWebpackRequire(__webpack_require__);

window.main = {
	require: mainExternalWebpackRequire.getRequire(),
};

// Require all sass sources here for use with webpack
// These are output into a assets/dist/main.css file with a cache busting hash in production
//  and injected directly into the html in development.
require("./sass/main.scss");

// Globals
// NOTE: Globals should be very minimal and used in about 90% of files.
window.flash = require("./flash");
window.logger = require("./logger");

// Error handling
window.addEventListener("error", function(event) {

	flash.danger("An error has occurred");

	var error = event.error;
	logger.log("error", error.message, error.stack, location.pathname);
});

window.addEventListener("unhandledrejection", function(event) {

	flash.danger("An error has occurred");

	var error = event.error;
	logger.log("error", error.message, error.stack, location.pathname);
});

// Libraries for external bundle use
require("./externalLibraries/coreLibrary");
require("./externalLibraries/webComponentsLibrary");

window.addEventListener("DOMContentLoaded", function(event) {

	// On load extensions
	require("./onLoadExtensions/bootstrap/adjustLinkGroupMenus")();
	require("./onLoadExtensions/bootstrap/setSelectEmptyClassOnChange")();
	require("./onLoadExtensions/bootstrap/setTableHoverClick")();
});