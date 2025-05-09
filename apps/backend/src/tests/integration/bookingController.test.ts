import request from 'supertest';
import app from '../../app';
import Booking from '../../models/Booking';
import nock from 'nock';

describe('Booking Controller', () => {
  let bookingId;

  beforeAll(async () => {
    // Connect to the test database
    await Booking.deleteMany({});
  });

  afterAll(async () => {
    // Clean up the test database
    await Booking.deleteMany({});
  });

  it('should create a new booking', async () => {
    nock('http://localhost:3000')
      .post('/api/bookings')
      .reply(201, {
        _id: 'mockBookingId',
        customerName: 'John Doe',
        date: '2023-05-01',
        time: '18:00',
        numberOfGuests: 4,
      });

    const response = await request(app)
      .post('/api/bookings')
      .send({
        customerName: 'John Doe',
        date: '2023-05-01',
        time: '18:00',
        numberOfGuests: 4,
      });

    expect(response.status).toBe(201);
    expect(response.body.customerName).toBe('John Doe');
    bookingId = response.body._id;
  });

  it('should get all bookings', async () => {
    nock('http://localhost:3000')
      .get('/api/bookings')
      .reply(200, [
        {
          _id: 'mockBookingId',
          customerName: 'John Doe',
          date: '2023-05-01',
          time: '18:00',
          numberOfGuests: 4,
        },
      ]);

    const response = await request(app).get('/api/bookings');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should get a booking by ID', async () => {
    nock('http://localhost:3000')
      .get(`/api/bookings/${bookingId}`)
      .reply(200, {
        _id: 'mockBookingId',
        customerName: 'John Doe',
        date: '2023-05-01',
        time: '18:00',
        numberOfGuests: 4,
      });

    const response = await request(app).get(`/api/bookings/${bookingId}`);

    expect(response.status).toBe(200);
    expect(response.body._id).toBe(bookingId);
  });

  it('should update a booking', async () => {
    nock('http://localhost:3000')
      .put(`/api/bookings/${bookingId}`)
      .reply(200, {
        _id: 'mockBookingId',
        customerName: 'Jane Doe',
        date: '2023-05-01',
        time: '18:00',
        numberOfGuests: 4,
      });

    const response = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .send({
        customerName: 'Jane Doe',
      });

    expect(response.status).toBe(200);
    expect(response.body.customerName).toBe('Jane Doe');
  });

  it('should delete a booking', async () => {
    nock('http://localhost:3000')
      .delete(`/api/bookings/${bookingId}`)
      .reply(200, {
        message: 'Booking deleted successfully',
      });

    const response = await request(app).delete(`/api/bookings/${bookingId}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Booking deleted successfully');
  });

  it('should return 400 for invalid date format', async () => {
    const response = await request(app)
      .post('/api/bookings')
      .send({
        customerName: 'John Doe',
        date: 'invalid-date',
        time: '18:00',
        numberOfGuests: 4,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  it('should return 400 for invalid booking ID', async () => {
    const response = await request(app)
      .put('/api/bookings/invalidBookingId')
      .send({
        customerName: 'Jane Doe',
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
