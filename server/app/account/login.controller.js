
var passport = require("passport");

function initialize(router) {

	router.get("/login", getLogin);
	router.post("/login", postLogin);
	router.get("/logout", getLogout);
}

function getLogin(req, res) {
	res.render("account/login.template.hbs", { title: "Login" });
};

function postLogin(req, res, next) {

	var middleware = passport.authenticate('ActiveDirectory', function(err, user, info) {

		if (err) {
			next(err);
		} else if (user) {
			res.redirect('/');
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

function getLogout(req, res) {
	req.logout();
	res.redirect('/');
};


module.exports.initialize = initialize;