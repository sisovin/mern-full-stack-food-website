import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';

const router: Router = Router();

/**
 * @route   GET /api/roles
 * @desc    Get all roles
 * @access  Private
 */
router.get('/', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'Get all roles' });
});

/**
 * @route   GET /api/roles/:id
 * @desc    Get role by ID
 * @access  Private
 */
router.get('/:id', authMiddleware, (req, res) => {
  res.status(200).json({ message: `Get role with ID: ${req.params.id}` });
});

export default router;