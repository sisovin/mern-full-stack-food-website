import dotenv from 'dotenv';
import path from 'path';

// Load environment variables first, before importing any other module
dotenv.config({
  path: path.resolve(__dirname, '../.env'),
});

import http from 'http';
import { AddressInfo } from 'net';
/* import app from './app'; */
import app from './minimal-app';  // Change this line

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  process.exit(1);
});

// Create HTTP server
const server = http.createServer(app);

// Set port
const port = parseInt(process.env.PORT || '5000', 10);

// Start server
server.listen(port, () => {
  const address = server.address() as AddressInfo;
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${address.port}`);
  console.log(`API available at http://localhost:${address.port}${process.env.API_PREFIX || '/api'}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.error('UNHANDLED REJECTION! 💥 Shutting down...');
  console.error(err.name, err.message);
  console.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});

// Handle SIGTERM signal
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥 Process terminated!');
  });
});