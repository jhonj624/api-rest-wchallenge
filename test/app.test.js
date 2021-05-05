/* eslint-disable no-prototype-builtins */
const assert = require('assert');
const supertest = require('supertest');
const app = require('../app/start/app');

let token;

describe('Testing /users endpoint', () => {
  it('Test /users: Create user with username on request', (done) => {
    supertest(app)
      .post('/users')
      .send({
        name: 'John',
        lastname: 'Doe',
        password: 'abcd1234',
        coin: 'ARS',
      })
      .end((error, response) => {
        assert(
          response.body.errors[0].msg === 'username is required',
        );
        done();
      });
  });
  it('Test /users: Create user with password less than 8 characters on request', (done) => {
    supertest(app)
      .post('/users')
      .send({
        name: 'John',
        username: 'Test1',
        lastname: 'Doe',
        password: 'abcd123',
        coin: 'ARS',
      })
      .end((error, response) => {
        assert(
          response.body.errors[0].msg === 'The password must have at least 8 characters',
        );
        done();
      });
  });
  it('Test /users: Create user without password on request', (done) => {
    supertest(app)
      .post('/users')
      .send({
        name: 'John',
        username: 'Test1',
        lastname: 'Doe',
        password: 'abcd123',
        coin: 'ARS',
      })
      .end((error, response) => {
        assert(
          response.body.errors[0].msg === 'The password must have at least 8 characters',
        );
        done();
      });
  });
  it('Test /users: Password must be alfanumeric', (done) => {
    supertest(app)
      .post('/users')
      .send({
        name: 'John',
        username: 'Test1',
        lastname: 'Doe',
        password: 'ab&cd123',
        coin: 'ARS',
      })
      .end((error, response) => {
        assert(
          response.body.errors[0].msg === 'Password must be alphanumeric',
        );
        done();
      });
  });
  it('Test /users: Create user with a bad COIN', (done) => {
    supertest(app)
      .post('/users')
      .send({
        name: 'John',
        username: 'Test1',
        lastname: 'Doe',
        password: 'abcd1234',
        coin: 'ARSS',
      })
      .end((error, response) => {
        assert(
          response.body.errors[0].msg === 'Coin no identified',
        );
        done();
      });
  });
  it('Test /users: Creating a user', (done) => {
    supertest(app)
      .post('/users')
      .send({
        name: 'John',
        lastname: 'Doe',
        username: 'Test1',
        password: 'abcd1234',
        coin: 'ARS',
      })
      .end((error, response) => {
        assert(
          response.body.msg === 'User created successfully',
        );
        done();
      });
  });
  it('Test /users: Validate a unique username', (done) => {
    supertest(app)
      .post('/users')
      .send({
        name: 'John',
        lastname: 'Doe',
        username: 'Test1',
        password: 'abcd1234',
        coin: 'ARS',
      })
      .end((error, response) => {
        assert(
          response.body.errors[0].msg === 'Already exists an user with the username: Test1',
        );
        done();
      });
  });
});

describe('Testing /login endpoint', () => {
  it('Test /login: Login successfully - validate token', (done) => {
    supertest(app)
      .post('/login')
      .send({
        username: 'Test1',
        password: 'abcd1234',
      })
      .end((error, response) => {
        token = response.body.token;
        assert(response.body.hasOwnProperty('token'));
        done();
      });
  });
  it('Test /login: Login without username', (done) => {
    supertest(app)
      .post('/login')
      .send({
        password: 'abcd1234',
      })
      .end((error, response) => {
        assert(
          response.body.errors[0].msg === 'The username is required',
        );
        done();
      });
  });
  it('Test /login: Login without password', (done) => {
    supertest(app)
      .post('/login')
      .send({
        username: 'Test1',
      })
      .end((error, response) => {
        assert(
          response.body.errors[0].msg === 'The password is required',
        );
        done();
      });
  });
  it('Test /login: Wrong data on request (password)', (done) => {
    supertest(app)
      .post('/login')
      .send({
        username: 'Test1',
        password: 'abcd',
      })
      .end((error, response) => {
        assert(
          response.body.msg === 'Username/Password incorrects',
        );
        done();
      });
  });
  it('Test /login: Wrong data on request (username)', (done) => {
    supertest(app)
      .post('/login')
      .send({
        username: 'Test123',
        password: 'abcd',
      })
      .end((error, response) => {
        assert(
          response.body.msg === 'Username/Password incorrects',
        );
        done();
      });
  });
});

describe('Testing /list endpoint', () => {
  it('Test /list: List coins successfully - validate token', (done) => {
    supertest(app)
      .get('/list')
      .set('x-token', token)
      .query({ page: 1 })
      .query({ per_page: 10 })
      .end((error, response) => {
        assert(
          response.body.msg === 'Cryptocurrencies successfully obtained',
        );
        done();
      });
  });
  it('Test /list: No token on header', (done) => {
    supertest(app)
      .get('/list')
      .query({ page: 1 })
      .query({ per_page: 10 })
      .end((error, response) => {
        assert(
          response.body.msg === 'There is no token in the request',
        );
        done();
      });
  });
  it('Test /list: Sending a currupted token', (done) => {
    supertest(app)
      .get('/list')
      .set('x-token', token.concat('ss'))
      .query({ page: 1 })
      .query({ per_page: 10 })
      .end((error, response) => {
        assert(
          response.body.msg === 'Invalid token',
        );
        done();
      });
  });
  it('Test /list: Validate answer keys', (done) => {
    supertest(app)
      .get('/list')
      .set('x-token', token)
      .query({ page: 1 })
      .query({ per_page: 3 })
      .end((error, response) => {
        assert(response.body.finalList[0].hasOwnProperty('symbol'));
        assert(response.body.finalList[0].hasOwnProperty('current_price'));
        assert(response.body.finalList[0].hasOwnProperty('name'));
        assert(response.body.finalList[0].hasOwnProperty('image'));
        assert(response.body.finalList[0].hasOwnProperty('last_updated'));
        done();
      });
  });
});

describe('Testing /currencies endpoint', () => {
  it('Test /currencies: Adding real cryptocurrencies', (done) => {
    supertest(app)
      .post('/currencies')
      .send({
        ids: ['litecoin', 'bitcoin', 'ethereum'],
      })
      .set('x-token', token)
      .end((error, response) => {
        assert(
          response.body.msg === 'Crypto currencies successfully added',
        );
        done();
      });
  });
  it('Test /currencies; Adding non-real cryptocurrencies', (done) => {
    supertest(app)
      .post('/currencies')
      .send({
        ids: ['bitocoin', 'ethernum', 'supercoin'],
      })
      .set('x-token', token)
      .end((error, response) => {
        assert(response.body.coins_rejected[0] === 'bitocoin');
        assert(response.body.coins_rejected[1] === 'ethernum');
        done();
      });
  }); it('Test /currencies; adding non-real cryptocurrencies', (done) => {
    supertest(app)
      .post('/currencies')
      .send({
        ids: ['bitocoin', 'ethernum', 'supercoin'],
      })
      .set('x-token', token)
      .end((error, response) => {
        assert(response.body.coins_rejected[0] === 'bitocoin');
        assert(response.body.coins_rejected[1] === 'ethernum');
        done();
      });
  });
});

describe('Testing /top endpoint', () => {
  it('Test /top: Validate answer keys', (done) => {
    supertest(app)
      .get('/top')
      .set('x-token', token)
      .query({ top: 5 })
      .end((error, response) => {
        assert(response.body.top_list[0].hasOwnProperty('symbol'));
        assert(response.body.top_list[0].hasOwnProperty('current_price_ars'));
        assert(response.body.top_list[0].hasOwnProperty('current_price_usd'));
        assert(response.body.top_list[0].hasOwnProperty('current_price_eur'));
        assert(response.body.top_list[0].hasOwnProperty('name'));
        assert(response.body.top_list[0].hasOwnProperty('image'));
        assert(response.body.top_list[0].hasOwnProperty('last_updated'));
        done();
      });
  });
  it('Test /top: Validate top N value (1 - 25)', (done) => {
    supertest(app)
      .get('/top')
      .set('x-token', token)
      .query({ top: 35 })
      .end((error, response) => {
        assert(response.body.errors[0].msg === 'top must be an integer between 1 and 25');
        done();
      });
  });
});
