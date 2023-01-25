import { Request, Response, NextFunction } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userData = req.body;

      const token = await UserService.login(userData);

      res.status(200).json({ token });
    } catch (e) {
      next(e);
    }
  };

  public getRole = async (req: Request, res: Response): Promise<void> => {
    const userData = req.body;

    const { role } = await UserService.getUser(userData);

    res.status(200).json({ role });
  };
}
