import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import FAQ from '../../models/FAQ';

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
    const res = await request(app).get('/api/faqs');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
  });

  it('should get an FAQ by id', async () => {
    const res = await request(app).get(`/api/faqs/${faqId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', faqId);
  });

  it('should update an FAQ', async () => {
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
    const res = await request(app).delete(`/api/faqs/${faqId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'FAQ deleted successfully');
  });
});
