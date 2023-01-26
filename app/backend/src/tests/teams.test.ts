import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamsModel from '../database/models/TeamsModel';

import { App } from '../app';
import { allTeams, team } from './mocks/teams.mocks';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests Teams', () => {
  describe('Tests teams search', () => {
    it('Tests searching all teams', async () => {
      sinon
        .stub(TeamsModel, "findAll")
        .resolves(allTeams as TeamsModel[]);
      
      const { body, status } = await chai.request(app).get('/teams');

      expect(body).to.deep.equal(allTeams);
      expect(status).to.equal(200);
    });
  
    it('Tests searching a team by id', async () => {
      sinon
        .stub(TeamsModel, "findByPk")
        .resolves(team as TeamsModel);

      const { body, status } = await chai.request(app).get('/teams/3');

      expect(body).to.deep.equal(team);
      expect(status).to.equal(200);
    });
  });

  afterEach(sinon.restore);
});
