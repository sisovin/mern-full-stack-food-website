import wss from './socketServer';

const sendOrderStatusUpdate = (orderId: string, status: string) => {
  const message = JSON.stringify({ orderId, status });
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

export { sendOrderStatusUpdate };
