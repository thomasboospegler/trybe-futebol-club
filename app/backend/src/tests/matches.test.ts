import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import MatchesModel from '../database/models/MatchesModel';

import { App } from '../app';
import { allMatches, newMatch, matchBody, equalsTeamsBody, editMatchBody, incorrectTeamsBody } from './mocks/matches.mock';
import { correctUser } from './mocks/user.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests Matches', () => {
  describe('Tests matches search', () => {
    it('Tests searching all matches', async () => {
      sinon
        .stub(MatchesModel, "findAll")
        .resolves(allMatches as unknown as MatchesModel[]);
      
      const { body, status } = await chai.request(app).get('/matches');

      expect(body).to.deep.equal(allMatches);
      expect(status).to.equal(200);
    });
  });

  describe('Tests saving a match', () => {
    it('Tests saving a match', async () => {
      sinon
        .stub(MatchesModel, "create")
        .resolves(newMatch as unknown as MatchesModel);
      
      const { body: { token } } = await chai.request(app).post('/login').send(correctUser);

      const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(matchBody)
        .set({ authorization: token })

      expect(body).to.deep.equal(newMatch);
      expect(status).to.equal(201);
    });
  
    it('Tests saving a match with wrong token', async () => {
      const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(matchBody)
        .set({ authorization: 'tokenInválido' });

      expect(body.message).to.equal('Token must be a valid token');
      expect(status).to.equal(401);
    });

    it('Tests saving a match with equal teams', async () => { 
      const { body: { token } } = await chai.request(app).post('/login').send(correctUser);

      const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(equalsTeamsBody)
        .set({ authorization: token });

      expect(body.message).to.equal('It is not possible to create a match with two equal teams');
      expect(status).to.equal(422);
    });

    it('Tests saving a match with inesxisting team', async () => {
      const { body: { token } } = await chai.request(app).post('/login').send(correctUser);

      const { body, status } = await chai
        .request(app)
        .post('/matches')
        .send(incorrectTeamsBody)
        .set({ authorization: token });

      expect(body.message).to.equal('There is no team with such id!');
      expect(status).to.equal(404);
    });
  });

  describe('Tests end a match', () => {
    it('Tests ending a match', async () => {
      sinon
        .stub(MatchesModel, "update")
        .resolves(undefined);
      
      const { body, status } = await chai.request(app).patch('/matches/1/finish');

      expect(body.message).to.equal('Finished');
      expect(status).to.equal(200);
    });
  });

  describe('Tests edit matches', () => {
    it('Tests editing a match', async () => {
      sinon
        .stub(MatchesModel, "update")
        .resolves(undefined);
      
      const { body, status } = await chai.request(app).patch('/matches/1').send(editMatchBody);

      expect(body.message).to.equal('Edited');
      expect(status).to.equal(200);
    });
  });

  afterEach(sinon.restore);
});
