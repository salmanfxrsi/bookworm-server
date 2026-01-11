import express from "express";
import {
  createBook,
  getBooks,
  updateBook,
  deleteBook,
} from "../controllers/book.controller";

const router = express.Router();

router.get("/", getBooks);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
