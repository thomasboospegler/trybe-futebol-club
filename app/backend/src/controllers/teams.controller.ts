import { Request, Response, NextFunction } from 'express';
import TeamsService from '../services/teams.service';

export default class TeamsController {
  public getAllTeams = async (_req: Request, res: Response): Promise<void> => {
    const allTeams = await TeamsService.getAllTeams();

    res.status(200).json(allTeams);
  };

  public getTeamById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;

      const searchedTeam = await TeamsService.getTeamById(Number(id));

      res.status(200).json(searchedTeam);
    } catch (e) {
      next(e);
    }
  };
}
