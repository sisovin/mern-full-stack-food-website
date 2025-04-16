import request from 'supertest';
import app from '../../app';
import User from '../../models/User';
import { generateToken } from '../../config/jwt';
import nock from 'nock';

describe('User Controller', () => {
  let token;
  let userId;

  beforeAll(async () => {
    // Create a test user and generate a token
    const user = new User({ username: 'testuser', email: 'testuser@example.com', password: 'password' });
    await user.save();
    userId = user._id;
    token = generateToken(user._id);
  });

  afterAll(async () => {
    // Clean up the test user
    await User.findByIdAndDelete(userId);
  });

  describe('GET /api/users/:id', () => {
    it('should return user details', async () => {
      nock('http://localhost:3000')
        .get(`/api/users/${userId}`)
        .reply(200, {
          username: 'testuser',
          email: 'testuser@example.com',
        });

      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).toHaveProperty('email', 'testuser@example.com');
    });

    it('should return 404 if user not found', async () => {
      nock('http://localhost:3000')
        .get('/api/users/invalidUserId')
        .reply(404, {
          message: 'User not found',
        });

      const res = await request(app)
        .get('/api/users/invalidUserId')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });

    it('should return 400 for invalid user ID', async () => {
      nock('http://localhost:3000')
        .get('/api/users/invalidUserId')
        .reply(400, {
          message: 'Invalid user ID',
        });

      const res = await request(app)
        .get('/api/users/invalidUserId')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid user ID');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user details', async () => {
      nock('http://localhost:3000')
        .put(`/api/users/${userId}`)
        .reply(200, {
          username: 'updateduser',
        });

      const res = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ username: 'updateduser' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'updateduser');
    });

    it('should return 400 if update data is invalid', async () => {
      nock('http://localhost:3000')
        .put(`/api/users/${userId}`)
        .reply(400, {
          message: 'Invalid update data',
        });

      const res = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'invalidEmail' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid update data');
    });

    it('should return 400 for missing fields', async () => {
      nock('http://localhost:3000')
        .put(`/api/users/${userId}`)
        .reply(400, {
          message: 'Missing fields',
        });

      const res = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Missing fields');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user', async () => {
      nock('http://localhost:3000')
        .delete(`/api/users/${userId}`)
        .reply(200, {
          message: 'User deleted successfully',
        });

      const res = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'User deleted successfully');
    });

    it('should return 404 if user not found', async () => {
      nock('http://localhost:3000')
        .delete('/api/users/invalidUserId')
        .reply(404, {
          message: 'User not found',
        });

      const res = await request(app)
        .delete('/api/users/invalidUserId')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
      expect(res.body).toHaveProperty('message', 'User not found');
    });
  });
});
