
function initialize(app, acl) {
    
	acl.allow("public exact", "/test/error/:status?", "*");
	app.get("/test/error/:status?", getError);
    
	acl.allow("public exact", "/test/exception", "*");
	app.get("/test/exception", getException);
    
	acl.allow("public exact", "/test/log/:level?", "*");
	app.get("/test/log/:level?", getLog);
}

function getError(req, res, next) {

	var status = req.params.status || 500;

	next(new ServerError("Test error handled with next(err)", status));
}

function getException(req, res) {

	throw new ServerError("Thrown test error");
}

function getLog(req, res) {

	var level = req.params.level || "info";
	var message = `This is a *${level}* level test log.`;

	logger.log(level, message);
	res.send("Logged: " + message);
}

module.exports.initialize = initialize;