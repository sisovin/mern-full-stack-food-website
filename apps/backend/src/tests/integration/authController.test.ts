import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import User from '../../models/User';
import nock from 'nock';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/authControllerTest`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Auth Controller', () => {
  describe('POST /api/auth/register', () => {
    it('should register a new user', async () => {
      nock('http://localhost:3000')
        .post('/api/auth/register')
        .reply(201, {
          data: {
            user: {
              username: 'testuser',
              email: 'testuser@example.com',
            },
            token: 'testtoken',
          },
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'testuser@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data).toHaveProperty('token');
    });

    it('should not register a user with an existing email', async () => {
      nock('http://localhost:3000')
        .post('/api/auth/register')
        .reply(400, {
          message: 'User registration failed',
        });

      const res = await request(app)
        .post('/api/auth/register')
        .send({
          username: 'testuser2',
          email: 'testuser@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User registration failed');
    });
  });

  describe('POST /api/auth/login', () => {
    it('should login an existing user', async () => {
      nock('http://localhost:3000')
        .post('/api/auth/login')
        .reply(200, {
          data: {
            user: {
              email: 'testuser@example.com',
            },
            token: 'testtoken',
          },
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'password123',
        });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('user');
      expect(res.body.data).toHaveProperty('token');
    });

    it('should not login with incorrect password', async () => {
      nock('http://localhost:3000')
        .post('/api/auth/login')
        .reply(400, {
          message: 'User login failed',
        });

      const res = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'testuser@example.com',
          password: 'wrongpassword',
        });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User login failed');
    });
  });

  describe('POST /api/auth/refresh-token', () => {
    it('should refresh the token', async () => {
      const user = await User.findOne({ email: 'testuser@example.com' });
      const token = user.generateAuthToken();

      nock('http://localhost:3000')
        .post('/api/auth/refresh-token')
        .reply(200, {
          data: {
            token: 'newtesttoken',
          },
        });

      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({ token });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('token');
    });

    it('should not refresh with invalid token', async () => {
      nock('http://localhost:3000')
        .post('/api/auth/refresh-token')
        .reply(400, {
          message: 'Token refresh failed',
        });

      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({ token: 'invalidtoken' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Token refresh failed');
    });

    it('should not refresh with expired token', async () => {
      const expiredToken = 'expiredToken'; // Replace with actual expired token

      nock('http://localhost:3000')
        .post('/api/auth/refresh-token')
        .reply(400, {
          message: 'Token refresh failed',
        });

      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({ token: expiredToken });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Token refresh failed');
    });
  });

  describe('GET /api/auth/logout', () => {
    it('should logout the user', async () => {
      const user = await User.findOne({ email: 'testuser@example.com' });

      nock('http://localhost:3000')
        .get('/api/auth/logout')
        .reply(200, {
          message: 'Logged out successfully',
        });

      const res = await request(app)
        .get('/api/auth/logout')
        .send({ userId: user._id });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Logged out successfully');
    });

    it('should not logout with invalid user ID', async () => {
      nock('http://localhost:3000')
        .get('/api/auth/logout')
        .reply(400, {
          message: 'Logout failed',
        });

      const res = await request(app)
        .get('/api/auth/logout')
        .send({ userId: 'invalidUserId' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Logout failed');
    });
  });
});
