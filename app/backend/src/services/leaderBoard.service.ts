import IMatchScore from '../interfaces/IMatchScore';
import TeamsService from './teams.service';
import MatchesService from './matches.service';
import IMatch from '../interfaces/IMatch';

type teamResults = { wins: number, loses: number, draws: number };

export default class LeaderboardService {
  private static getTeamMatches = (
    matches: IMatch[],
    teamId: number,
    isHome?: boolean,
  ) : IMatch[] => matches.filter(({ homeTeamId, awayTeamId }) => {
    if (isHome === undefined) return homeTeamId === teamId || awayTeamId === teamId;

    if (isHome) return homeTeamId === teamId;

    return awayTeamId === teamId;
  });

  private static getTeamGoals = (
    matches: IMatch[],
    teamId: number,
    favor: boolean,
  ) : number => matches.reduce((acc, { homeTeamId, homeTeamGoals, awayTeamGoals }) => {
    const isHomeMatch: boolean = favor ? homeTeamId === teamId : homeTeamId !== teamId;

    const teamGoals = isHomeMatch ? acc + homeTeamGoals : acc + awayTeamGoals;

    return teamGoals;
  }, 0);

  private static getTeamMatchesResults = (
    matches: IMatch[],
    teamId: number,
  ) : teamResults => matches.reduce((acc, cur) => {
    const isHomeMatch: boolean = cur.homeTeamId === teamId;

    const teamGolasBalance : number = cur.homeTeamGoals - cur.awayTeamGoals;

    if (teamGolasBalance === 0) acc.draws += 1;

    if (
      (teamGolasBalance > 0 && isHomeMatch) || (teamGolasBalance < 0 && !isHomeMatch)
    ) acc.wins += 1;

    if (
      (teamGolasBalance < 0 && isHomeMatch) || (teamGolasBalance > 0 && !isHomeMatch)
    ) acc.loses += 1;

    return acc;
  }, { wins: 0, loses: 0, draws: 0 });

  private static getTeamScore = (name : string, matches: IMatch[], teamId: number, isHome?: boolean)
  : IMatchScore => {
    const teamMatches = this.getTeamMatches(matches, teamId, isHome);
    const teamMatchesResults = this.getTeamMatchesResults(teamMatches, teamId);
    const totalTeampoints = (teamMatchesResults.wins * 3) + teamMatchesResults.draws;
    const favorTeamGoals = this.getTeamGoals(teamMatches, teamId, true);
    const ownTeamGoals = this.getTeamGoals(teamMatches, teamId, false);

    return {
      name,
      totalPoints: totalTeampoints,
      totalGames: teamMatches.length,
      totalVictories: teamMatchesResults.wins,
      totalDraws: teamMatchesResults.draws,
      totalLosses: teamMatchesResults.loses,
      goalsFavor: favorTeamGoals,
      goalsOwn: ownTeamGoals,
      goalsBalance: favorTeamGoals - ownTeamGoals,
      efficiency: +((totalTeampoints / (teamMatches.length * 3)) * 100).toFixed(2),
    };
  };

  private static orderLeaderBoard = (board: IMatchScore[]): IMatchScore[] => board
    .sort((a, b) => b.totalPoints - a.totalPoints
    || b.totalVictories - a.totalVictories
    || b.goalsBalance - a.goalsBalance
    || b.totalVictories - a.totalVictories
    || b.goalsFavor - a.goalsFavor
    || b.goalsOwn - a.goalsOwn);

  public static getLeaderBoard = async (isHome?: boolean): Promise<IMatchScore[]> => {
    const allTeams = await TeamsService.getAllTeams();

    const allMatches = (await MatchesService.getAllMatches())
      .filter(({ inProgress }) => !inProgress);

    const leaderBoard = allTeams.map(({ teamName, id }) => ({
      ...this.getTeamScore(teamName, allMatches, id, isHome),
    }));

    return this.orderLeaderBoard(leaderBoard);
  };
}
