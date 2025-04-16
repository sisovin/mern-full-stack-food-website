import io from './socketServer';

const sendNotification = (message: string) => {
  io.emit('notification', message);
};

export { sendNotification };
