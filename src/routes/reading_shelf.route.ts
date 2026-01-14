import { Router } from "express";
import {
  getUserShelves,
  addToShelf,
  updateShelf,
  deleteShelf,
} from "../controllers/reading_shelf.controller";

const router = Router();

router.get("/", getUserShelves);
router.post("/", addToShelf);
router.put("/:id", updateShelf);
router.delete("/:id", deleteShelf);

export default router;
