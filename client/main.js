
// NOTE: This file is for client features that should be available on every server side served webpage.
//  Features that are for a single page should have there own js entry point file and webpack configuration.

// Expose all webpacked resources for use with external scripts
import ExternalWebpackRequire from "./lib/coreVendor/webpack/externalWebpackRequire";
var mainExternalWebpackRequire = new ExternalWebpackRequire(__webpack_require__);

window.main = {
	require: mainExternalWebpackRequire.getRequire()
};

// Import all sass sources here for use with webpack
// These are output into a assets/dist/main.css file with a cache busting hash in production
//  and injected directly into the html in development.
import style from "./sass/main.scss";

// Import in all app web components
import ArticleFavorite from "./webComponents/app/articleFavorite/articleFavorite.component";

// Import in all core web components
import CompareValidator from "./webComponents/core/validators/compareValidator.component";
import ConfirmDialog from "./webComponents/core/modalDialogs/confirmDialog.component";
import MessageBox from "./webComponents/core/messageBoxes/messageBox.component";
import MessageBoxClosable from "./webComponents/core/messageBoxes/messageBoxClosable.component";
import Pagination from "./webComponents/core/pagination/pagination.component";
import Typeahead from "./webComponents/core/typeahead/typeahead.component";

// Import globals
// NOTE: Globals should be very minimal and used in about 90% of files.
import flash from "./flash";
window.flash = flash;

window.addEventListener("error", function(event) {

	flash.danger("An error has occurred");
});

window.addEventListener("unhandledrejection", function(event) {

	flash.danger("An error has occurred");
});