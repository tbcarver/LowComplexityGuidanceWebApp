

var rolesStore = require("../../store/rolesStore");
var usersRolesStore = require("../../store/usersRolesStore");
var usersStore = require("../../store/usersStore");
var usersRules = require("../../rules/usersRules");
var _ = require("lodash");

function initialize(app, acl) {

    // Acl noop
    app.get("/users/:pageNumber?", getUsers);

    // Acl noop
    app.get("/user/new", getNew);
    app.get("/user/edit/:userId", getEdit);
    app.post("/user/edit", postEdit);
    app.post("/user/delete", postDelete);
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
};

function getNew(req, res) {

    var model = { title: "New User" };
    model.layout = "oneColumn.layout.hbs";

    res.render("admin/usersDetailsEdit.template.hbs", model);
};

function getEdit(req, res) {

    var model = { title: "Edit" };
    model.user = usersStore.getUser(req.params.userId);

    if (model.user) {

        model.user.roleIds = usersRolesStore.getRoleIdsByUserId(req.params.userId);
        model.roles = rolesStore.getRoles();

    } else {

        model.message = `No user found for userId: ${req.params.userId}.`;
        model.messageType = "warning";
    }

    res.render("admin/usersDetailsEdit.template.hbs", model);
}

function postEdit(req, res) {

    var user = _.clone(req.body);
    user.roles = [];

    if (req.body.roles) {
        if (typeof req.body.roles === "string") {
            user.roles.push(req.body.roles)
        } else {
            user.roles = req.body.roles;
        }
    }

    if (user.userId) {
        usersStore.updateUser(user.firstName, user.lastName);
    } else {
        var passwordHashes = usersRules.buildPasswordHashes(user.password);
        user.userId = usersStore.addUser(user.username, user.firstName, user.lastName, passwordHashes.passwordHash, passwordHashes.passwordHashSalt);
    }

    req.params.userId = user.userId;
    getEdit(req, res);
};

function postDelete(req, res) {

    usersStore.deleteUser(req.body.userId);

    req.flash.success(`<strong>${req.body.firstName} ${req.body.lastName}</strong> was deleted.`);
    res.redirect("/users");
};


module.exports.initialize = initialize;