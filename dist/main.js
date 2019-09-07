/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/app.js":
/*!***********************!*\
  !*** ./client/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_messageBox_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/messageBox.component */ "./client/components/messageBox.component.js");



/***/ }),

/***/ "./client/components/messageBox.component.js":
/*!***************************************************!*\
  !*** ./client/components/messageBox.component.js ***!
  \***************************************************/
/*! exports provided: MessageBox */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageBox", function() { return MessageBox; });
/* harmony import */ var _lib_coreVendor_handlebars_templateEngine_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/coreVendor/handlebars/templateEngine.js */ "./client/lib/coreVendor/handlebars/templateEngine.js");



var template = new _lib_coreVendor_handlebars_templateEngine_js__WEBPACK_IMPORTED_MODULE_0__["TemplateEngine"]("/client/components/messageBox.template.hbs");
var templateClosable = new _lib_coreVendor_handlebars_templateEngine_js__WEBPACK_IMPORTED_MODULE_0__["TemplateEngine"]("/client/components/messageBox-closable.template.hbs");

class MessageBox extends HTMLElement {

	constructor() {
		super();

		this.hasConnected = false;
		this.message = this.innerHTML;

		console.log(this.innerHTML)
	}

	static get observedAttributes() {
		return ["type", "closable"];
	}

	get type() {
		return this.getAttribute("type");
	}

	set type(value) {
		this.setAttribute("type", value);
	}

	get closable() {
		return Boolean(this.getAttribute("closable"));
	}

	set closable(value) {

		this.setAttribute("closable", value);
	}

	connectedCallback() {

		this.hasConnected = true;
		this.render();
	}

	attributeChangedCallback(name, oldValue, newValue) {

		if (this.hasConnected) {
			this.render();
		}
	}

	render() {

		if (this.message) {

			var data = {
				type: this.type,
				message: this.message
			};

			if (this.closable) {
				this.innerHTML = templateClosable.buildHtml(data);

				this.querySelector(".messageBoxCloseLink").addEventListener("click", function onClose(event) {

					event.preventDefault();
					this.innerHTML = "";

				}.bind(this));

			} else {
				this.innerHTML = template.buildHtml(data);
			}

			this.style.visibility = "visible";
		}
	}
}

template.initialize(function() {
	templateClosable.initialize(function() {

		customElements.define('message-box', MessageBox);
	});
});




/***/ }),

/***/ "./client/lib/coreVendor/handlebars/templateEngine.js":
/*!************************************************************!*\
  !*** ./client/lib/coreVendor/handlebars/templateEngine.js ***!
  \************************************************************/
/*! exports provided: TemplateEngine */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TemplateEngine", function() { return TemplateEngine; });

class TemplateEngine {

	constructor(templateUrl) {
		this.templateUrl = templateUrl;
	}

	initialize(callback) {

		if (!this.templateUrl) {
			throw new Error("Template url not found.");
		}

		fetch(this.templateUrl)
			.then(function(response) {

				// TODO: Status code check
				return response.text();
			})
			.then(function(text) {

				this.compiledTemplate = Handlebars.compile(text);
				callback();
			}.bind(this));
	}

	buildHtml(data) {

		if (!this.compiledTemplate) {
			throw new Error("Compiled template not found.");
		}

		return this.compiledTemplate(data);
	}
}




/***/ })

/******/ });
//# sourceMappingURL=main.js.map