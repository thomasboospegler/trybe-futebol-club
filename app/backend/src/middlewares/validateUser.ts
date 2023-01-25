import { Request, Response, NextFunction } from 'express';

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void | Response> => {
  const userInfo = req.body;

  if (!userInfo.email || !userInfo.password) {
    return res.status(400).json({ message: 'All fields must be filled' });
  }

  next();
};

export default validateUser;
