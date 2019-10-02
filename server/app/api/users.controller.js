

var usersStore = require("../../store/usersStore");
var usersRules = require("../../rules/usersRules");
var _ = require("lodash");

function initialize(app, acl) {

    // acl noop
    app.get("/api/users/search/prefetch", getUsersSearchPrefetch);
    app.get("/api/users/search/:query", getUsersSearch);
}

function getUsersSearchPrefetch(req, res) {

    var users = usersStore.getUsers();

    users = users.map(function(user) {

        return { id: user.userId, value: `${user.userId} ${user.firstName} ${user.lastName}` };
    });

    res.json(users.slice(20));
};

function getUsersSearch(req, res) {

    var users = usersStore.getUsers();

    users = users.map(function(user) {

        return { id: user.userId, value: `${user.userId} ${user.firstName} ${user.lastName}` };
    });

    res.json(users);
};


module.exports.initialize = initialize;