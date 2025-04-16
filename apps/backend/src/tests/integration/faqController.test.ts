import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import FAQ from '../../models/FAQ';
import nock from 'nock';

beforeAll(async () => {
  const url = `mongodb://127.0.0.1/faqControllerTest`;
  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('FAQ Controller', () => {
  let faqId;

  it('should create a new FAQ', async () => {
    nock('http://localhost:3000')
      .post('/api/faqs')
      .reply(201, {
        _id: 'mockFAQId',
        question: 'What is the return policy?',
        answer: 'You can return any item within 30 days.',
      });

    const res = await request(app)
      .post('/api/faqs')
      .send({
        question: 'What is the return policy?',
        answer: 'You can return any item within 30 days.',
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('_id');
    faqId = res.body._id;
  });

  it('should get all FAQs', async () => {
    nock('http://localhost:3000')
      .get('/api/faqs')
      .reply(200, [
        {
          _id: 'mockFAQId',
          question: 'What is the return policy?',
          answer: 'You can return any item within 30 days.',
        },
      ]);

    const res = await request(app).get('/api/faqs');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get an FAQ by id', async () => {
    nock('http://localhost:3000')
      .get(`/api/faqs/${faqId}`)
      .reply(200, {
        _id: 'mockFAQId',
        question: 'What is the return policy?',
        answer: 'You can return any item within 30 days.',
      });

    const res = await request(app).get(`/api/faqs/${faqId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', faqId);
  });

  it('should update an FAQ', async () => {
    nock('http://localhost:3000')
      .put(`/api/faqs/${faqId}`)
      .reply(200, {
        _id: 'mockFAQId',
        question: 'What is the updated return policy?',
        answer: 'You can return any item within 60 days.',
      });

    const res = await request(app)
      .put(`/api/faqs/${faqId}`)
      .send({
        question: 'What is the updated return policy?',
        answer: 'You can return any item within 60 days.',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('question', 'What is the updated return policy?');
  });

  it('should delete an FAQ', async () => {
    nock('http://localhost:3000')
      .delete(`/api/faqs/${faqId}`)
      .reply(200, {
        message: 'FAQ deleted successfully',
      });

    const res = await request(app).delete(`/api/faqs/${faqId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'FAQ deleted successfully');
  });

  it('should return 400 when creating an FAQ with missing fields', async () => {
    const res = await request(app)
      .post('/api/faqs')
      .send({
        question: 'Incomplete FAQ',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });

  it('should return 400 for invalid FAQ ID', async () => {
    const res = await request(app)
      .put('/api/faqs/invalidFAQId')
      .send({
        question: 'Invalid FAQ ID',
        answer: 'This is an invalid FAQ ID',
      });
    expect(res.statusCode).toEqual(400);
    expect(res.body).toHaveProperty('message');
  });
});
