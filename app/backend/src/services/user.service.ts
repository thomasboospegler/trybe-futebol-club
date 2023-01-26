import * as bcrypt from 'bcryptjs';
import { IUser } from '../interfaces';
import Token from '../utils/TokenHandler';
import UserModel from '../database/models/UserModel';
import ErrorHandler from '../utils/ErrorHandler';

const tokenHandler = new Token();

export default class UserService {
  public static getUser = async (user: IUser): Promise<IUser> => {
    const userExists = await UserModel.findOne({ where: { email: user.email }, raw: true });

    if (!userExists) throw new ErrorHandler('Incorrect email or password', 401);

    return userExists as IUser;
  };

  private static validateUser = async (user: IUser): Promise<void> => {
    const userData = await this.getUser(user);

    const rightPass = bcrypt.compareSync(user.password, userData.password);

    if (!rightPass || !user) throw new ErrorHandler('Incorrect email or password', 401);
  };

  public static async login(user: IUser): Promise<string> {
    await this.validateUser(user);

    return tokenHandler.createToken(user as IUser);
  }
}
