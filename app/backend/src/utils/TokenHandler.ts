import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import IUser from '../interfaces';

const secret = process.env.JWT_SECRET;
const jwtConfig: jwt.SignOptions = { algorithm: 'HS256', expiresIn: '1d' };

export default class TokenHandler {
  public createToken = (user: IUser): string => {
    const token = jwt.sign({ ...user }, secret as jwt.Secret, jwtConfig);

    return token;
  };

  public validateJWT = (req: Request, res: Response, next: NextFunction): void | Response => {
    const { authorization: token } = req.headers;

    if (!token) return res.status(404).json({ message: 'Token not found' });

    jwt.verify(token, secret as jwt.Secret, (err, user) => {
      if (err) return res.status(401).json({ message: 'Token must be a valid token' });

      req.body = { ...user };

      next();
    });
  };
}
