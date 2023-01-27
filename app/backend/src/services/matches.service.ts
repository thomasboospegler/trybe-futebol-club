import TeamsModel from '../database/models/TeamsModel';
import MatchesModel from '../database/models/MatchesModel';
import IMatch from '../interfaces/IMatch';
import ErrorHandler from '../utils/ErrorHandler';

export default class MatchesService {
  public static matchExampleModel = [
    {
      model: TeamsModel,
      as: 'homeTeam',
      attributes: ['teamName'],
    },
    {
      model: TeamsModel,
      as: 'awayTeam',
      attributes: ['teamName'],
    },
  ];

  public static async verifyMatches(team1: number, team2: number): Promise<void> {
    if (team1 === team2) {
      throw new ErrorHandler('It is not possible to create a match with two equal teams', 422);
    }

    const teamHome = await TeamsModel.findByPk(team1);

    const teamAway = await TeamsModel.findByPk(team2);

    if (!teamHome || !teamAway) throw new ErrorHandler('There is no team with such id!', 404);
  }

  public static async getAllMatches(): Promise<MatchesModel[]> {
    const allMatches = await MatchesModel.findAll({ include: this.matchExampleModel });

    return allMatches;
  }

  public static async editMatch(id: number, data: Partial<IMatch>): Promise<void> {
    await MatchesModel.update({ ...data }, { where: { id } });
  }

  public static async saveMatch(match: Partial<IMatch>): Promise<MatchesModel> {
    await this.verifyMatches(match.homeTeamId as number, match.awayTeamId as number);

    const matchCreated = await MatchesModel.create({ ...match, inProgress: true });

    return matchCreated;
  }

  public static async finishMatch(id: number): Promise<void> {
    await MatchesModel.update({ inProgress: false }, { where: { id } });
  }
}
