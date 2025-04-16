import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import Cart from '../../models/Cart';
import User from '../../models/User';
import Product from '../../models/Product';
import nock from 'nock';

describe('Cart Controller', () => {
  let userId;
  let productId;
  let token;

  beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const user = new User({ username: 'testuser', email: 'testuser@example.com', password: 'password' });
    await user.save();
    userId = user._id;

    const product = new Product({ name: 'Test Product', price: 10 });
    await product.save();
    productId = product._id;

    token = 'test_token'; // Replace with actual token generation logic
  });

  afterAll(async () => {
    await Cart.deleteMany({});
    await User.deleteMany({});
    await Product.deleteMany({});
    await mongoose.connection.close();
  });

  describe('GET /api/cart/:userId', () => {
    it('should get the cart for a user', async () => {
      nock('http://localhost:3000')
        .get(`/api/cart/${userId}`)
        .reply(200, {
          items: [],
        });

      const res = await request(app)
        .get(`/api/cart/${userId}`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('items');
    });
  });

  describe('POST /api/cart/:userId/add', () => {
    it('should add an item to the cart', async () => {
      nock('http://localhost:3000')
        .post(`/api/cart/${userId}/add`)
        .reply(200, {
          items: [{ productId, quantity: 1 }],
        });

      const res = await request(app)
        .post(`/api/cart/${userId}/add`)
        .set('Authorization', `Bearer ${token}`)
        .send({ productId, quantity: 1 });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('items');
      expect(res.body.items.length).toBe(1);
    });

    it('should return 400 for invalid product ID', async () => {
      nock('http://localhost:3000')
        .post(`/api/cart/${userId}/add`)
        .reply(400, {
          message: 'Invalid product ID',
        });

      const res = await request(app)
        .post(`/api/cart/${userId}/add`)
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 'invalidProductId', quantity: 1 });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/cart/:userId/remove', () => {
    it('should remove an item from the cart', async () => {
      nock('http://localhost:3000')
        .post(`/api/cart/${userId}/remove`)
        .reply(200, {
          items: [],
        });

      const res = await request(app)
        .post(`/api/cart/${userId}/remove`)
        .set('Authorization', `Bearer ${token}`)
        .send({ productId });

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('items');
      expect(res.body.items.length).toBe(0);
    });

    it('should return 400 for non-existent product ID', async () => {
      nock('http://localhost:3000')
        .post(`/api/cart/${userId}/remove`)
        .reply(400, {
          message: 'Product not found in cart',
        });

      const res = await request(app)
        .post(`/api/cart/${userId}/remove`)
        .set('Authorization', `Bearer ${token}`)
        .send({ productId: 'nonExistentProductId' });

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message');
    });
  });

  describe('POST /api/cart/:userId/clear', () => {
    it('should clear the cart', async () => {
      nock('http://localhost:3000')
        .post(`/api/cart/${userId}/clear`)
        .reply(200, {
          message: 'Cart cleared successfully',
        });

      const res = await request(app)
        .post(`/api/cart/${userId}/clear`)
        .set('Authorization', `Bearer ${token}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Cart cleared successfully');
    });
  });
});
