import User from '../models/User';
import jwt from 'jsonwebtoken';
import argon2 from 'argon2';

const registerUser = async (username: string, email: string, password: string) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists');
  }

  const hashedPassword = await argon2.hash(password);
  const newUser = new User({ username, email, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { user: newUser, token };
};

const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Invalid email or password');
  }

  const isPasswordValid = await argon2.verify(user.password, password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

  return { user, token };
};

const refreshToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const newToken = jwt.sign({ id: (decoded as any).id }, process.env.JWT_SECRET as string, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    return newToken;
  } catch (error) {
    throw new Error('Invalid token');
  }
};

const logoutUser = async (userId: string) => {
  // Implement any necessary logic for logging out a user, such as invalidating tokens
  return true;
};

export { registerUser, loginUser, refreshToken, logoutUser };
