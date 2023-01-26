import TeamsModel from '../database/models/TeamsModel';
import ErrorHandler from '../utils/ErrorHandler';
import { ITeam } from '../interfaces';

export default class TeamsService {
  public static async getAllTeams(): Promise<ITeam[]> {
    const allTeams = await TeamsModel.findAll();

    return allTeams;
  }

  public static async getTeamById(id: number): Promise<ITeam> {
    const searchedTeam = await TeamsModel.findByPk(id);

    if (!searchedTeam) throw new ErrorHandler('Team not found', 404);

    return searchedTeam;
  }
}
