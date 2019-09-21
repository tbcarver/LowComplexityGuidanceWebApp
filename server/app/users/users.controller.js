

var usersStore = require("../../store/usersStore")
var _ = require("lodash");


function initialize(app, acl) {

    acl.allow("administrator", "/user/new", "*");
    app.get("/user/new", getUserNew);
    app.post("/user/new", addUser);


    acl.allow("administrator", "/user/edit", "*");
    app.get("/user/edit", getUserEdit);
    app.post("/user/edit", postUserEdit)
}

function getUserNew(req, res) {
    // var model = new AppModel(req, "New Article", "New Article");
    res.render("users/newUser.template.hbs");
};

function addUser(req, res) {
    // if(!req.body) return //error

    var user = _.clone(req.body);
    user.roles = [];

    if (req.body.roles) {
        
        if (typeof req.body.roles === "string") {
            
            user.roles.push(req.body.roles)
        } else {
            user.roles = req.body.roles;
        }
    }

    usersStore.addUser(user)

    res.render("users/newUser.template.hbs");
};

function getUserEdit(req, res) {

    res.render("user/editUser.hbs")
}

function postUserEdit() {

}




module.exports.initialize = initialize;