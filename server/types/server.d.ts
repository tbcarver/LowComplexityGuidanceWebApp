
/**
 * Server Error
 *
 * @param {string} message Error message
 * @param {number} status Http status code, default 500
 */
interface ServerError extends Error {
	status: number;
	date: Date;
}

interface ServerErrorConstructor {
	new(message?: string, status?: number): ServerError;
	(message?: string, status?: number): ServerError;
	readonly prototype: ServerError;
}

declare var ServerError: ServerErrorConstructor;