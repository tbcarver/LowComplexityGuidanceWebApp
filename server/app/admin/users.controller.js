

var usersStore = require("../../store/usersStore");
var usersRules = require("../../rules/usersRules");
var _ = require("lodash");

function initialize(app, acl) {

    // acl noop
    app.get("/users", getUsers);

    // acl noop
    app.get("/user/new", getNew);
    app.get("/user/edit/:userId", getEdit);
    app.post("/user/edit", postEdit);
}

function getUsers(req, res) {

    var model = new AppModel(req, "Users");
    model.users = usersStore.getUsers();

    res.render("admin/usersMaster.template.hbs", model);
};

function getNew(req, res) {

    var model = new AppModel(req, "New User");
    model.layout = "oneColumn.layout.hbs";
    
    res.render("admin/usersDetailsEdit.template.hbs", model);
};

function getEdit(req, res) {

    var model = new AppModel(req, "Edit");
    model.layout = "oneColumn.layout.hbs";
    model.user = usersStore.getUser(req.params.userId);

    res.render("admin/usersDetailsEdit.template.hbs", model)
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


module.exports.initialize = initialize;