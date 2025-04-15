import client from '../config/redis';

const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;

  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    } else {
      res.sendResponse = res.send;
      res.send = async (body) => {
        await client.set(key, JSON.stringify(body), 'EX', 3600); // Cache for 1 hour
        res.sendResponse(body);
      };
      next();
    }
  } catch (error) {
    console.error('Redis error:', error);
    next();
  }
};

export default cacheMiddleware;
