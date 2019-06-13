
var challengesStore = require("./challengesStore");

function initialize(app) {
	
	app.get("/", getChallenges);
}

function getChallenges(req, res) {

	var model = {};

	model.challengesTitlesTree = challengesStore.getTitlesTree();

	res.render("challengesMaster", model);
}


module.exports = initialize;