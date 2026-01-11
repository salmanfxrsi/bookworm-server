import express from "express";
import {
  createGenre,
  getGenres,
  updateGenre,
  deleteGenre,
} from "../controllers/genre.controller";

const router = express.Router();

router.get("/", getGenres);
router.post("/", createGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
