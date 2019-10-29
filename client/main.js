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

// Libraries for external bundle use
require("./externalLibraries/coreLibrary");
require("./externalLibraries/webComponentsLibrary");

// Scripts
require("./customizedBootstrap");

// Globals
// NOTE: Globals should be very minimal and used in about 90% of files.
window.flash = require("./flash");

window.addEventListener("error", function(event) {
	flash.danger("An error has occurred");
});

window.addEventListener("unhandledrejection", function(event) {
	flash.danger("An error has occurred");
});
