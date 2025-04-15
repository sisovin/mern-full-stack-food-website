import express from 'express';
import { register, login, refreshToken, logout } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.get('/logout', logout);

export default router;
