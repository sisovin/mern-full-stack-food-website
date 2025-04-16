import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import path from 'path';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import { i18next, i18nextMiddleware } from './config/i18n';
import { generateToken, verifyToken } from './config/jwt';
import logger from './config/winston';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import wss from './websockets/socketServer';

// Import config
import './config/db'; // MongoDB connection is initialized here

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import roleRoutes from './routes/roleRoutes';
import menuRoutes from './routes/menuRoutes';
import bookingRoutes from './routes/bookingRoutes';
import blogRoutes from './routes/blogRoutes';
import faqRoutes from './routes/faqRoutes';
import orderRoutes from './routes/orderRoutes';

// Import middlewares
import { authMiddleware } from './middlewares/authMiddleware';
import cacheMiddleware from './middlewares/cacheMiddleware';
import { errorHandler } from './middlewares/errorHandler';
import { loggerMiddleware } from './middlewares/logger';
import rateLimiter from './middlewares/rateLimiter';
import { validatorMiddleware } from './middlewares/validator';
import corsMiddleware from './middlewares/corsMiddleware';

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
app.use(loggerMiddleware);

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// i18next middleware
app.use(i18nextMiddleware.handle(i18next));

// API routes
const apiPrefix = process.env.API_PREFIX || '/api';

app.use(`${apiPrefix}/auth`, authRoutes);
app.use(`${apiPrefix}/users`, userRoutes);
app.use(`${apiPrefix}/roles`, roleRoutes);
app.use(`${apiPrefix}/menu`, menuRoutes);
app.use(`${apiPrefix}/bookings`, bookingRoutes);
app.use(`${apiPrefix}/blogs`, blogRoutes);
app.use(`${apiPrefix}/faqs`, faqRoutes);
app.use(`${apiPrefix}/orders`, orderRoutes);

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
app.use(errorHandler);

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server
const io = new SocketIOServer(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  },
});

// Add WebSocket server to HTTP server
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, (ws) => {
    wss.emit('connection', ws, request);
  });
});

// Add event listeners for connection and disconnection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export default app;
