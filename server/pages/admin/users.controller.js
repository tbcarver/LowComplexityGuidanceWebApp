
var rolesStore = require("../../store/rolesStore");
var usersRolesMapsStore = require("../../store/usersRolesMapsStore");
var usersStore = require("../../store/usersStore");
var usersRules = require("../../rules/usersRules");
var _ = require("lodash");

function initialize(app, acl) {

	// Acl noop
	app.get("/users/:pageNumber?", getUsers);

	// Acl noop
	app.get("/user/new", getUserNew);
	app.get("/user/edit/:userId", getUserEdit);
	app.post("/user/edit", postUserEdit);
	app.post("/user/delete", postUserDelete);
}

function getUsers(req, res) {

	var model = { title: "Users" };

	var pageNumber = 1;
	if (req.params.pageNumber) {
		pageNumber = parseInt(req.params.pageNumber);
	}

	model.pagedUsers = usersStore.getPagedUsers(pageNumber, 20);
	model.pagedUsers.pagination.url = "/users/%s";

	res.render("admin/usersMaster.template.hbs", model);
}

function getUserNew(req, res) {

	var model = {
		title: "New user",
		heading: "new",
		isNew: true,
	};

	model.roles = rolesStore.getRoles();

	res.render("admin/usersDetailsEdit.template.hbs", model);
}

function getUserEdit(req, res) {

	var model = { title: "Edit" };
	model.user = usersStore.getUser(req.params.userId);

	if (model.user) {

		model.heading = `${model.user.firstName} ${model.user.lastName}`;
		model.user.roleIds = usersRolesMapsStore.getRoleIds(req.params.userId);
		model.roles = rolesStore.getRoles();

	} else {

		model.heading = "not found";
		model.message = `No user found for userId: ${req.params.userId}.`;
		model.messageType = "warning";
	}

	res.render("admin/usersDetailsEdit.template.hbs", model);
}

function postUserEdit(req, res) {

	var user = _.clone(req.body);
	user.roleIds = [];

	if (req.body.roleIds) {
		if (typeof req.body.roleIds === "string") {
			user.roleIds.push(req.body.roleIds);
		} else {
			user.roleIds = req.body.roleIds;
		}
	}

	var passwordHashes = {
		passwordHash: null,
		passwordHashSalt: null,
	};

	if (user.password) {
		passwordHashes = usersRules.buildPasswordHashes(user.password);
	}

	if (user.userId) {
		usersStore.updateUser(user.userId, user.username, user.firstName, user.lastName, passwordHashes.passwordHash, passwordHashes.passwordHashSalt, user.roleIds);
	} else {
		user.userId = usersStore.addUser(user.username, user.firstName, user.lastName, passwordHashes.passwordHash, passwordHashes.passwordHashSalt, user.roleIds);
	}

	req.flash.success(`<strong>${req.body.firstName} ${req.body.lastName}</strong> was saved.`);
	res.redirect(`/user/edit/${user.userId}`);
}

function postUserDelete(req, res) {

	usersStore.removeUser(req.body.userId);

	req.flash.success(`<strong>${req.body.firstName} ${req.body.lastName}</strong> was deleted.`);
	res.redirect("/users");
}

module.exports.initialize = initialize;