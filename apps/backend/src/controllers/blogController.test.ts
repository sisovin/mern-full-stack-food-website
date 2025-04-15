import request from 'supertest';
import app from '../app';
import Blog from '../models/Blog';
import mongoose from 'mongoose';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/blog_test`;
  await mongoose.connect(url, { useNewUrlParser: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Blog Controller', () => {
  let blogId;

  it('should create a new blog post', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .send({
        title: 'Test Blog',
        content: 'This is a test blog post',
        author: new mongoose.Types.ObjectId(),
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    blogId = res.body._id;
  });

  it('should get all blog posts', async () => {
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get a blog post by id', async () => {
    const res = await request(app).get(`/api/blogs/${blogId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', blogId);
  });

  it('should update a blog post', async () => {
    const res = await request(app)
      .put(`/api/blogs/${blogId}`)
      .send({
        title: 'Updated Test Blog',
        content: 'This is an updated test blog post',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('title', 'Updated Test Blog');
  });

  it('should delete a blog post', async () => {
    const res = await request(app).delete(`/api/blogs/${blogId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Blog deleted successfully');
  });

  it('should return an empty array when there are no blog posts', async () => {
    await Blog.deleteMany({});
    const res = await request(app).get('/api/blogs');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(0);
  });

  it('should return 400 when creating a blog post with missing fields', async () => {
    const res = await request(app)
      .post('/api/blogs')
      .send({
        title: 'Incomplete Blog',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });
});
