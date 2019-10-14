
var passport = require("passport");
var queryStringKeys = require("../../keys/queryStringKeys");

function initialize(app, acl) {

	acl.allow("public exact", "/login", "*");
	app.get("/login", getLogin);
	app.post("/login", postLogin);

	acl.allow("public exact", "/logout", "*");
	app.get("/logout", getLogout);
}

function getLogin(req, res, next) {

	var model = { title: "Login" };

	res.render("account/login.template.hbs", model);
};

function postLogin(req, res, next) {

	var middleware = passport.authenticate("Sqlite", function(err, user, info) {

		if (err) {
			next(err);
		} else if (user) {

			req.logIn(user, function(err) {

				if (err) {
					next(err);
				} else {

					req.flash.info(`Welcome <strong>${user.fullName}</strong> to <strong>conduit</strong>.`);

					var redirect = req.query[queryStringKeys.returnUrl] || "/";
					res.redirect(redirect);
				}
			});

		} else {

			var model = { title: "Login" };

			model.message = "The username or password was invalid.";
			model.messageType = "danger";

			res.render("account/login.template.hbs", model);
		}
	});

	middleware(req, res, next);
};

function getLogout(req, res) {
	req.flash.info(`<strong>${req.user.username}</strong> has logged out.`);
	req.logout();
	res.redirect("/");
};


module.exports.initialize = initialize;