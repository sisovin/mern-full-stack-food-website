import io from './socketServer';

const sendOrderStatusUpdate = (orderId: string, status: string) => {
  const message = { orderId, status };
  io.emit('orderStatusUpdate', message);
};

export { sendOrderStatusUpdate };
