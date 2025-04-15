import { setCache, getCache } from '../utils/cacheUtils';

const cacheMiddleware = async (req, res, next) => {
  const key = req.originalUrl;

  try {
    const cachedData = await getCache(key);
    if (cachedData) {
      return res.status(200).json(cachedData);
    } else {
      res.sendResponse = res.send;
      res.send = async (body) => {
        await setCache(key, body, 3600); // Cache for 1 hour
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
