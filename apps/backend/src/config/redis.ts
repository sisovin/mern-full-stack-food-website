import { createClient } from 'redis';

const client = createClient({
  url: process.env.REDIS_URL,
});

client.connect().catch((err) => {
  console.error('Redis connection error:', err);
});

export default client;
