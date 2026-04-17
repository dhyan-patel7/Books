import express from "express";
import {
  getDashboardStats,
  getReports,
  getUsers
} from "../controllers/adminController.js";
import { adminOnly, protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/dashboard", protect, adminOnly, getDashboardStats);
router.get("/users", protect, adminOnly, getUsers);
router.get("/reports", protect, adminOnly, getReports);

export default router;
