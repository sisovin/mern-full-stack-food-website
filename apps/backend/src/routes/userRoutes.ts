import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private
 */
router.get("/", authMiddleware, (req, res) => {
  res.status(200).json({ message: "Get all users" });
});

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private
 */
router.get("/:id", authMiddleware, (req, res) => {
  res.status(200).json({ message: `Get user with ID: ${req.params.id}` });
});

/**
 * @route   POST /api/users
 * @desc    Create new user
 * @access  Private
 */
router.post("/", authMiddleware, (req, res) => {
  res.status(201).json({ message: "Create new user", data: req.body });
});

export default router;
