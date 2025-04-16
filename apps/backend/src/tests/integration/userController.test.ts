import request from 'supertest';
import app from '../../app';
import User from '../../models/User';
import { generateToken } from '../../config/jwt';

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
      const res = await request(app)
        .get(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'testuser');
      expect(res.body).toHaveProperty('email', 'testuser@example.com');
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app)
        .get('/api/users/invalidUserId')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
    });

    it('should return 400 for invalid user ID', async () => {
      const res = await request(app)
        .get('/api/users/invalidUserId')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user details', async () => {
      const res = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ username: 'updateduser' });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('username', 'updateduser');
    });

    it('should return 400 if update data is invalid', async () => {
      const res = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({ email: 'invalidEmail' });

      expect(res.statusCode).toEqual(400);
    });

    it('should return 400 for missing fields', async () => {
      const res = await request(app)
        .put(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({});

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user', async () => {
      const res = await request(app)
        .delete(`/api/users/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
    });

    it('should return 404 if user not found', async () => {
      const res = await request(app)
        .delete('/api/users/invalidUserId')
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(404);
    });
  });
});
