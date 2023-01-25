import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

const errorHandler = (
  err: ErrorRequestHandler,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: 'Internal server error' });
};

export default errorHandler;
