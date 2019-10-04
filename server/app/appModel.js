
function AppModel(req, title, navbarLinkTitle) {
	this.title = title;
	this.navbarLinkTitle = navbarLinkTitle;
	this.isAuthenticated = req.isAuthenticated();

	if (req.user) {
		this.userFullName = req.user.fullName;
		this.userRoles = req.user.roles;
	}
}

module.exports = AppModel;