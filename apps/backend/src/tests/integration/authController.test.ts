import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import User from '../../models/User';

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
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({ token });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('data');
      expect(res.body.data).toHaveProperty('token');
    });

    it('should not refresh with invalid token', async () => {
      const res = await request(app)
        .post('/api/auth/refresh-token')
        .send({ token: 'invalidtoken' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Token refresh failed');
    });

    it('should not refresh with expired token', async () => {
      const expiredToken = 'expiredToken'; // Replace with actual expired token
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
      const res = await request(app)
        .get('/api/auth/logout')
        .send({ userId: user._id });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Logged out successfully');
    });

    it('should not logout with invalid user ID', async () => {
      const res = await request(app)
        .get('/api/auth/logout')
        .send({ userId: 'invalidUserId' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Logout failed');
    });
  });
});
