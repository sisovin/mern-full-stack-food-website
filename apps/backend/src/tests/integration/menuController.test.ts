import request from 'supertest';
import app from '../../app';
import Menu from '../../models/Menu';
import { connect, disconnect } from '../../config/db';

beforeAll(async () => {
  await connect();
});

afterAll(async () => {
  await disconnect();
});

describe('Menu Controller', () => {
  let menuItemId;

  it('should create a new menu item', async () => {
    const response = await request(app)
      .post('/api/menu')
      .send({
        name: 'Test Menu Item',
        description: 'Test Description',
        price: 10.99,
        category: 'Test Category',
      });

    expect(response.status).toBe(201);
    expect(response.body.name).toBe('Test Menu Item');
    menuItemId = response.body._id;
  });

  it('should return 400 when creating a menu item with missing fields', async () => {
    const response = await request(app)
      .post('/api/menu')
      .send({
        name: 'Incomplete Menu Item',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should get all menu items', async () => {
    const response = await request(app).get('/api/menu');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a menu item by id', async () => {
    const response = await request(app).get(`/api/menu/${menuItemId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(menuItemId);
  });

  it('should update a menu item', async () => {
    const response = await request(app)
      .put(`/api/menu/${menuItemId}`)
      .send({
        name: 'Updated Test Menu Item',
        description: 'Updated Test Description',
        price: 12.99,
        category: 'Updated Test Category',
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated Test Menu Item');
  });

  it('should return 400 for invalid menu item ID', async () => {
    const response = await request(app)
      .put('/api/menu/invalidMenuItemId')
      .send({
        name: 'Invalid Menu Item',
        description: 'Invalid Description',
        price: 12.99,
        category: 'Invalid Category',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should delete a menu item', async () => {
    const response = await request(app).delete(`/api/menu/${menuItemId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Menu item deleted successfully');
  });
});
