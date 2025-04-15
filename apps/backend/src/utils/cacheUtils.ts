import client from '../config/redis';

export const setCache = async (key: string, value: any, expiration: number = 3600) => {
  try {
    await client.set(key, JSON.stringify(value), 'EX', expiration);
  } catch (error) {
    console.error('Error setting cache:', error);
  }
};

export const getCache = async (key: string) => {
  try {
    const cachedData = await client.get(key);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  } catch (error) {
    console.error('Error getting cache:', error);
    return null;
  }
};
