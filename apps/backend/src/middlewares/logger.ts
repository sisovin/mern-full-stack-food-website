import { Request, Response, NextFunction } from 'express';
import logger from '../config/winston';

const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.url}`);
  next();
};

export { loggerMiddleware };
