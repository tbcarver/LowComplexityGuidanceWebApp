
import * as winston from 'winston';
import * as ServerError from "../serverError";
import * as ServerError from "../appModel";

declare global {
	const logger:winston.Logger;
	const ServerError:ServerError;
	const AppModel:AppModel;
  }
