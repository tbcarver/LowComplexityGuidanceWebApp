
var passport = require("passport");

function initialize(router) {

	router.get("/login", getLogin);
	router.post("/login", function(req, res, next) {
		passport.authenticate('ActiveDirectory', function(err, user, info, status) {
		  if (err) { return next(err); }
		  if (!user) { return res.redirect('/login'); }
		  req.logIn(user, function(err) {
			if (err) { return next(err); }
			return res.redirect('/');
		  });
		})(req, res, next);
	  }, postLogin);
	router.get("/logout", getLogout);
}

function getLogin(req, res) {
	res.render("account/login.template.hbs", { title: "Login" });
};

function postLogin(req, res) {


};

function getLogout(req, res) {
	req.logout();
	res.redirect('/');
};


module.exports.initialize = initialize;