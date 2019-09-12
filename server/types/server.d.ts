
/**
 * Server Error
 *
 * @param {string} message Error message
 * @param {number} httpStatusCode Http status code, default 500
 */
interface ServerError extends Error {
	httpStatusCode: number;
	date: Date;
}

interface ServerErrorConstructor {
	new(message?: string, httpStatusCode?: number): ServerError;
	(message?: string, httpStatusCode?: number): ServerError;
	readonly prototype: ServerError;
}

declare var ServerError: ServerErrorConstructor;