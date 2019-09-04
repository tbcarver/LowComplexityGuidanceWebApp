
function initialize(router) {

	router.get("/login", getLogin);
	router.post("/login", postLogin);
	router.get("/logout", getLogout);
}

function getLogin(req, res) {
	res.render("account/login.template.hbs", { title: "Login" });
};

function postLogin(req, res) {

};

function getLogout(req, res) {

};


module.exports.initialize = initialize;