
var passport = require("passport");
var queryStringKeys = require("../../keys/queryStringKeys");

function initialize(app, acl) {

    acl.allow('public exact', "/login", '*');
	app.get("/login", getLogin);
	app.post("/login", postLogin);

    acl.allow('public exact', "/logout", '*');
	app.get("/logout", getLogout);
}

/** @param { Request } req @param { Response } res */
function getLogin(req, res, next) {

	res.render("account/login.template.hbs", { title: "Login" });
};

/** @param { Request } req @param { Response } res */
function postLogin(req, res, next) {

	var middleware = passport.authenticate('ActiveDirectory', function(err, user, info) {

		if (err) {
			next(err);
		} else if (user) {

			req.logIn(user, function(err) {

				if (err) {
					next(err);
				} else {

					var redirect = req.query[queryStringKeys.returnUrl] || "/";
					res.redirect(redirect);
				}
			});

		} else {

			var model = {
				title: "Login",
				message: "The username or password was invalid",
				messageType: "danger",
			}

			res.render("account/login.template.hbs", model);
		}
	});

	middleware(req, res, next);
};

/** @param { Request } req @param { Response } res */
function getLogout(req, res) {
	req.logout();
	res.redirect('/');
};


module.exports.initialize = initialize;