import * as express from 'express';
import LeaderBoardController from '../controllers/leaderBoard.controller';

const leaderBoardRouter = express.Router();
const leaderBoardController = new LeaderBoardController();

leaderBoardRouter.get('/', leaderBoardController.getLeaderBoard);

leaderBoardRouter.get('/home', leaderBoardController.getHomeLeaderBoard);

leaderBoardRouter.get('/away', leaderBoardController.getAwayLeaderBoard);

export default leaderBoardRouter;
