

var usersStore = require("../store/usersStore");
var queryStringKeys = require("../keys/queryStringKeys");
var _ = require("lodash");

function initialize(app, acl) {

    // Acl noop
    app.get("/api/users/typeahead/prefetch", getUsersTypeaheadPrefetch);
    app.get("/api/users/typeahead/remote", getUsersTypeaheadRemote);
}

function getUsersTypeaheadPrefetch(req, res) {

    var users = usersStore.getUsers();

    users = users.map(function(user) {
        return { id: user.userId, value: `${user.userId} ${user.firstName} ${user.lastName}` };
    });

    res.json(users);
};

function getUsersTypeaheadRemote(req, res) {

    var searchTerm = req.query[queryStringKeys.searchTerm];
    var users;

    if (searchTerm) {

        users = usersStore.findUsers(searchTerm);

        users = users.map(function(user) {    
            return { id: user.userId, value: `${user.userId} ${user.firstName} ${user.lastName}` };
        });
    }

    res.json(users);
};


module.exports.initialize = initialize;