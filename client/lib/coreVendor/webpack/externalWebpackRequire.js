
function ExternalWebpackRequire(__webpack_require__) {
	this.__webpack_require__ = __webpack_require__;
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

		module = this.__webpack_require__(moduleId);

		if (module) {
			if (module.default) {
				module = module.default;
			}
		}
	}

	return module;
}

export default ExternalWebpackRequire;