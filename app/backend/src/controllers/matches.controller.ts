import { Request, Response, NextFunction } from 'express';
import { IMatch } from '../interfaces';
import MatchesService from '../services/matches.service';

export default class MatchesController {
  public getAllMatches = async (req: Request, res: Response): Promise<void> => {
    const { inProgress: matchInProgress } = req.query;

    const matches = await MatchesService.getAllMatches();

    const filteredMatches = matches
      .filter((match: IMatch) =>
        match.inProgress.toString() === matchInProgress || matchInProgress === undefined);

    res.status(200).json(filteredMatches);
  };

  public editMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;

    const matchData = req.body;

    await MatchesService.editMatch(Number(id), matchData);

    return res.status(200).json({ message: 'Edited' });
  };

  public saveMatch = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { user, ...matchInfo } = req.body;

      const newMatch = await MatchesService.saveMatch(matchInfo);

      res.status(201).json(newMatch);
    } catch (e) {
      next(e);
    }
  };

  public finishMatch = async (req: Request, res: Response): Promise<void | Response> => {
    const { id } = req.params;

    await MatchesService.finishMatch(Number(id));

    return res.status(200).json({ message: 'Finished' });
  };
}
