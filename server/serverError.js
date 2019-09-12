
class ServerError extends Error {
	constructor(message, httpStatusCode = 500) {
		super(message);

		this.httpStatusCode = httpStatusCode;
		this.date = new Date();

		// express-error-handler looks for a status property with the http status code
		this.status = httpStatusCode;
	}
}


module.exports = ServerError;