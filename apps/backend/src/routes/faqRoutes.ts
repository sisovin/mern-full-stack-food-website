import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";

const router: Router = Router();

/**
 * @route   GET /api/faqs
 * @desc    Get all FAQs
 * @access  Public
 */
router.get("/", (req, res) => {
  res.status(200).json({ message: "Get all FAQs" });
});

/**
 * @route   GET /api/faqs/:id
 * @desc    Get FAQ by ID
 * @access  Public
 */
router.get("/:id", (req, res) => {
  res.status(200).json({ message: `Get FAQ with ID: ${req.params.id}` });
});

/**
 * @route   POST /api/faqs
 * @desc    Create new FAQ
 * @access  Private
 */
router.post("/", authMiddleware, (req, res) => {
  res.status(201).json({ message: "Create new FAQ", data: req.body });
});

export default router;
