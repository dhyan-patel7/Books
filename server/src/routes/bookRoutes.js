import express from "express";
import {
  createBook,
  deleteBook,
  getBookById,
  getBooks,
  updateBook
} from "../controllers/bookController.js";
import { adminOnly, protect } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.get("/", getBooks);
router.get("/:id", getBookById);
router.post("/", protect, adminOnly, upload.single("coverImage"), createBook);
router.put("/:id", protect, adminOnly, upload.single("coverImage"), updateBook);
router.delete("/:id", protect, adminOnly, deleteBook);

export default router;
