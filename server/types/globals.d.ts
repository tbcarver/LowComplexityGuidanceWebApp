
import * as winston from 'winston';
import * as ServerError from "../serverError";

declare global {
	const logger:winston.Logger;
	const ServerError:ServerError;
  }
