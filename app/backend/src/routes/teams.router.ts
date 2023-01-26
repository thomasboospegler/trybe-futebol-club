import * as express from 'express';
import TeamsController from '../controllers/teams.controller';

const teamsRouter = express.Router();

const teamsController = new TeamsController();

teamsRouter.get('/', teamsController.getAllTeams);

teamsRouter.get('/:id', teamsController.getTeamById);

export default teamsRouter;
