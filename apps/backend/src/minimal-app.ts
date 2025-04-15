import express from 'express';
import cors from 'cors';

const app = express();

// Add CORS middleware with proper configuration
app.use(cors({
  origin: [
    'http://localhost:3000', 
    'http://localhost:5173',
    'http://192.168.50.131:5173',
    'http://192.168.50.131:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'ok',
    message: 'Server is healthy and accessible from other devices'
  });
});

app.get('/api/test', (req, res) => {
  res.status(200).json({ 
    status: 'success',
    message: 'API endpoint is working'
  });
});

export default app;