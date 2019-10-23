
function ExternalWebpackRequire(__webpack_require__) {
	this.__webpack_require__ = __webpack_require__;
	this.moduleIds = Object.keys(__webpack_require__.m);
}

ExternalWebpackRequire.prototype.getRequire = function() {
	return this.require.bind(this);
}

ExternalWebpackRequire.prototype.require = function(moduleId) {

	var module;

	if (moduleId) {
		if (!moduleId.endsWith(".js")) {
			moduleId += ".js";
		}

		if (!this.moduleIds.includes(moduleId)) {
			throw new Error(`Module ${moduleId} not found.`);
		}

		module = this.__webpack_require__(moduleId);

		if (module && module.default) {
			module = module.default;
		}
	} else {
		throw new Error(`Invalid parameter: moduleId.`);
	}

	return module;
}

export default ExternalWebpackRequire;