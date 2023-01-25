import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import UserModel from '../database/models/UserModel';
import {
  userWithoutEmail,
  userWithoutPassword,
  userWithWrongEmail,
  userwithWrongPassword,
  correctUser,
  completeUser,
} from './mocks/user.mocks';

import IUser from '../interfaces/IUser';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Tests Users and Login', () => {
  afterEach(sinon.restore);

  describe('Test without credentials', () => {
    it('Test without email', async () => {
      const { body, status } = await chai.request(app).post('/login').send(userWithoutEmail);
  
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
      expect(status).to.equal(400);
    });
  
    it('Test without password', async () => {
      const { body, status } = await chai.request(app).post('/login').send(userWithoutPassword);
  
      expect(body).to.deep.equal({ message: 'All fields must be filled' });
      expect(status).to.equal(400);
    });
  });
  
  describe('Test with wrong credentials', () => {
    it('Test with wrong email', async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(null);
  
      const { body, status } = await chai.request(app).post('/login').send(userWithWrongEmail);
  
      expect(body).to.deep.equal({ message: 'Incorrect email or password' });
      expect(status).to.equal(401);
    });
  
    it('Test with wrong password', async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(completeUser as UserModel);
  
      const { body, status } = await chai.request(app).post('/login').send(userwithWrongPassword);
  
      expect(body).to.deep.equal({ message: 'Incorrect email or password' });
      expect(status).to.equal(401);
    });
  });
  
  describe('Test with correct credentials', () => {
    it('Test login with valid credentials', async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(completeUser as IUser | any);
  
      const { body, status } = await chai.request(app).post('/login').send(correctUser);

      expect(body).to.haveOwnProperty('token');
      expect(status).to.equal(200);
    });
  });

  describe('Test route /validate', () => {
    it('Test with no token', async () => {
      const { body, status } = await chai.request(app).get('/login/validate');
  
      expect(body.message).to.equal('Token not found');
      expect(status).to.equal(404);
    });

    it('Test with wrong token', async () => {  
      const { body, status } = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: 'aaaaaaaaaaa' });
  
      expect(body.message).to.equal('Token must be a valid token');
      expect(status).to.equal(401);
    });

    it('Test with valid token', async () => {
      sinon
        .stub(UserModel, "findOne")
        .resolves(completeUser as IUser | any);
      
      const { body: { token } } = await chai.request(app).post('/login').send(correctUser);
  
      const { body, status } = await chai
        .request(app)
        .get('/login/validate')
        .set({ authorization: token });
  
      expect(body).to.deep.equal({ role: 'user' });
      expect(status).to.equal(200);
    });
  });
});
