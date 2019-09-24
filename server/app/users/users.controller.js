

var usersStore = require("../../store/usersStore")
var _ = require("lodash");


function initialize(app, acl) {

    // acl noop
    app.get("/users", getUsers);
    app.get("/user/new", getUserNew);
    app.post("/users", addUser);
    app.get("/user/edit/:userId", editUser);
    // app.post("/user/edit", postUserEdit);

}

/** @param { Request } req @param { Response } res */
function getUserNew(req, res) {

    var model = new AppModel(req, "New User");
    model.layout = "oneColumn.layout.hbs";
    // var model = new AppModel(req, "New Article", "New Article");
    res.render("users/usersDetails.template.hbs", model);
};

/** @param { Request } req @param { Response } res */
function addUser(req, res) {
    // if(!req.body) return //error
    var model = new AppModel(req, "New User");
    model.layout = "oneColumn.layout.hbs";

    var user = _.clone(req.body);
    user.roles = [];

    if (req.body.roles) {

        if (typeof req.body.roles === "string") {

            user.roles.push(req.body.roles)
        } else {
            user.roles = req.body.roles;
        }
    }
    model.users = usersStore.addUser(user);

    res.render("users/usersDetails.template.hbs", model);
};

/** @param { Request } req @param { Response } res */
function getUsers(req, res) {

    var model = new AppModel(req, "Users");
    model.layout = "oneColumn.layout.hbs";

    model.users = usersStore.getUsers();

    res.render("users/usersMaster.template.hbs", model);
};

/** @param { Request } req @param { Response } res */
function editUser(req, res) {
    var model = new AppModel(req, "Edit");
    model.layout = "oneColumn.layout.hbs";

    model.user = usersStore.getUser(req.params.userId);
    res.render("users/usersDetails.template.hbs", model)

}

module.exports.initialize = initialize;