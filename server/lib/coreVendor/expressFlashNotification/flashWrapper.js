
// This express-flash-notification wrapper is to simplify the api and align it with
//  the client side api.

class FlashWrapper {

	constructor(flash) {
		this.flash = flash;
	}

	success(message) {

		this.flash("success", message, false);
	}

	danger(message) {

		this.flash("danger", message, false);
	}

	warning(message) {

		this.flash("warning", message, false);
	}

	info(message) {

		this.flash("info", message, false);
	}
}


module.exports = FlashWrapper;