import * as express from 'express';
import MatchesController from '../controllers/matches.controller';
import TokenHandler from '../utils/TokenHandler';

const matchesController = new MatchesController();

const tokenHandler = new TokenHandler();

const matchesRouter = express.Router();

matchesRouter.get('/', matchesController.getAllMatches);

matchesRouter.post('/', tokenHandler.validateJWT, matchesController.saveMatch);

matchesRouter.patch('/:id/finish', matchesController.finishMatch);

matchesRouter.patch('/:id', matchesController.editMatch);

export default matchesRouter;
