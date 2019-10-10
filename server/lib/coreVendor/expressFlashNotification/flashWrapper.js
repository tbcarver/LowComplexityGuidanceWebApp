
// This express-flash-notification wrapper is to simplify the api and align it with
//  the client side api.

class FlashWrapper {

	constructor(flash) {
		this.flash = flash;
	}

	success(message) {
		return this.flash("success", message, false);
	}

	danger(message) {
		return this.flash("danger", message, false);
	}

	warning(message) {
		return this.flash("warning", message, false);
	}

	info(message) {
		return this.flash("info", message, false);
	}
}


module.exports = FlashWrapper;