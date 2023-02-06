import { Request, Response } from 'express';
import LeaderBoardService from '../services/leaderBoard.service';

export default class LeaderBoardController {
  public getLeaderBoard = async (_req: Request, res: Response): Promise<void> => {
    const leaderBoard = await LeaderBoardService.getLeaderBoard();

    res.status(200).json(leaderBoard);
  };

  public getHomeLeaderBoard = async (_req: Request, res: Response): Promise<void> => {
    const leaderBoard = await LeaderBoardService.getLeaderBoard(true);

    res.status(200).json(leaderBoard);
  };

  public getAwayLeaderBoard = async (_req: Request, res: Response): Promise<void> => {
    const leaderBoard = await LeaderBoardService.getLeaderBoard(false);

    res.status(200).json(leaderBoard);
  };
}
