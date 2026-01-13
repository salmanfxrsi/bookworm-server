import { Router } from "express";
import { getGenres, createGenre, updateGenre, deleteGenre } from "../controllers/genre.controller";

const router = Router();

router.get("/", getGenres);
router.post("/", createGenre);
router.put("/:id", updateGenre);
router.delete("/:id", deleteGenre);

export default router;
