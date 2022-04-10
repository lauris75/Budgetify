import mongoose from 'mongoose';
import supertest from 'supertest';
import IncomesController from './incomes.controller';
import AuthService from '../auth/auth.service';
import Income from './income.model';


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://lauris:nesakysiu@cluster0.pq913.mongodb.net/nodejsTutorial?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("nodejsTutorial").collection("incomes");
  client.close();
});

describe('Tests for income routes', () => {
  let access_token;
  let incomeId;

  beforeAll(async () => {
    access_token = await authService.login('abc123@gmail.com', 'abc123');
    let income = await Income.create({
      accountId: '125',
      title: 'Test income',
      amount: 120,
      date: '2022-03-20'
    });
    incomeId = income.id;
  });

  afterAll(async () => {
    await Income.deleteOne({ id: incomeId });
    client.close();
  });

  describe('GET /account/125/incomes', () => {
    it('gets all incomes', async () => {
      const resp = await supertest(app)
        .get('/account/125/incomes')
        .set('Authorization', `Bearer ${access_token}`);

      expect(resp.status).toBe(200);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(resp.body).toMatchObject({
        id: expect.any(String),
        title: expect.any(String),
        amount: expect.any(Number),
        date: expect.any(String),
    }});
  });

  describe('GET /account/125/incomes/:id specific income', () => {
    it('retrieves an existing income record', async () => {
      const resp = await supertest(app)
        .get(`/account/125/incomes/${incomeId}`)
        .set('Authorization', `Bearer ${access_token}`);

      expect(resp.status).toBe(200);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });

    it('given id which does not belong to any income record', async () => {
      const resp = await supertest(app)
        .get('/account/125/incomes/5')
        .set('Authorization', `Bearer ${access_token}`);

      expect(resp.status).toBe(500);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });
  });

  describe('POST /account/125/incomes', () => {
    it('given a valid income record body', async () => {
      const resp = await supertest(app)
        .post('/account/125/incomes')
        .set('Authorization', `Bearer ${access_token}`)
        .send({
            accountId: '125',
            title: 'Monthly allowance',
            amount: 300,
            date: '2022-03-05'
          });

      expect(resp.status).toBe(201);
      expect(resp.body).toEqual(
        expect.objectContaining({
            accountId: '125',
            title: 'Monthly allowance',
            amount: 300,
            date: '2022-03-05'
          })
      );
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
   }});

    it('given not valid body', async () => {
      const resp = await supertest(app)
        .post('/account/125/incomes')
        .set('Authorization', `Bearer ${access_token}`)
        .send({ title: 'Monthly allowance' });

      expect(resp.status).toBe(500);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });

  describe('PATCH /account/:account/incomes/:id', () => {
    it('given id of already existing income record', async () => {
      const resp = await supertest(app)
        .patch(`/account/125/incomes/${incomeId}`)
        .set('Authorization', `Bearer ${access_token}`)
        .send({ title: 'Normal job salary' });

      expect(resp.status).toBe(200);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
      expect(resp.body.title).toEqual('Normal job salary');
    });

    it('given id of non existing income record', async () => {
      const resp = await supertest(app)
        .put(`/account/125/incomes/${incomeId}`)
        .set('Authorization', `Bearer ${access_token}`)
        .send({ title: 'Normal job salary' });

      expect(resp.status).toBe(500);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });
  });

  describe('DELETE /account/:account/incomes/:id', () => {
    it('given id of existing income record', async () => {
      const resp = await supertest(app)
        .delete(`/account/:account/incomes/${incomeId}`)
        .set('Authorization', `Bearer ${access_token}`)
        .send();

      expect(resp.status).toBe(200);
      expect(resp.header['content-type']).toBe(
        'application/json; charset=utf-8'
      );
    });

    it('given id which no income exists', async () => {
      const resp = await supertest(app)
        .delete(`/account/:account/incomes/123`)
        .set('Authorization', `Bearer ${access_token}`)
        .send();

      expect(resp.status).toBe(500);
    });
  });
});