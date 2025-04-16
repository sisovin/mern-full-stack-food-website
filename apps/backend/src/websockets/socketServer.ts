import { Server as SocketIOServer } from 'socket.io';

const io = new SocketIOServer();

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

export default io;
