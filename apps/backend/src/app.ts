import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

// Import config
/* import './config/db'; // MongoDB connection is initialized here */

// Import routes
/* import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import menuRoutes from './routes/menuRoutes';
import bookingRoutes from './routes/bookingRoutes';
import blogRoutes from './routes/blogRoutes';
import faqRoutes from './routes/faqRoutes'; */

// Import middlewares
/* import { errorHandler } from './middlewares/errorHandler';
import { logger } from './middlewares/logger'; */

const app: Express = express();

// Body parser middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Cookie parser middleware
app.use(cookieParser());

// Security middlewares
app.use(helmet()); // Set security headers

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX || '100', 10), // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// CORS middleware
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173', 'http://192.168.50.131:5173'];
app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
/* app.use(logger); */

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// API routes
const apiPrefix = process.env.API_PREFIX || '/api';

/* app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/users`, userRoutes);
app.use(`${apiPrefix}/roles`, roleRoutes);
app.use(`${apiPrefix}/menu`, menuRoutes);
app.use(`${apiPrefix}/bookings`, bookingRoutes);
app.use(`${apiPrefix}/blogs`, blogRoutes);
app.use(`${apiPrefix}/faqs`, faqRoutes); */

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.all('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 'error',
    message: `Cannot find ${req.originalUrl} on this server!`,
  });
});

// Global error handler middleware
/* app.use(errorHandler); */

export default app;