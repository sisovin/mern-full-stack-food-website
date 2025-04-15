import cors from 'cors';

const corsMiddleware = cors({
  origin: (origin, callback) => {
    const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://192.168.50.131:5173'];
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
});

export default corsMiddleware;
