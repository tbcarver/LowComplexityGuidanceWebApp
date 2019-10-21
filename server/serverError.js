
class ServerError extends Error {
	constructor(message, status = 500) {
		super(message);

		// express-error-handler looks for a status property with the http status code
		this.status = status;
		this.date = new Date();
	}
}

module.exports = ServerError;