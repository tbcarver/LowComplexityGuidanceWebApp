
function initialize(app, acl) {
    
    acl.allow('public exact', "/test/error", '*');
    app.get("/test/error", getError);
    
    acl.allow('public exact', "/test/exception", '*');
    app.get("/test/exception", getException);
    
    acl.allow('public exact', "/test/log/:level?", '*');
    app.get("/test/log/:level?", getLog);
}

/** @param { Request } req @param { Response } res */
function getError(req, res, next) {

	next(new ServerError("Test error handled with next(err)"));
};

/** @param { Request } req @param { Response } res */
function getException(req, res) {

	throw new ServerError("Thrown test error");
};

/** @param { Request } req @param { Response } res */
function getLog(req, res) {

	var level = req.params.level || "info";
	var message = `This is a *${level}* level test log.`;

	logger.log(level, message);
	res.send("Logged: " + message);
};


module.exports.initialize = initialize;