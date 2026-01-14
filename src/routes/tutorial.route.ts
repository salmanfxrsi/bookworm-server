import { Router } from "express";
import {
  getTutorials,
  createTutorial,
  updateTutorial,
  deleteTutorial,
} from "../controllers/tutorial.controller";

const router = Router();

router.get("/", getTutorials);
router.post("/", createTutorial);
router.put("/:id", updateTutorial);
router.delete("/:id", deleteTutorial);

export default router;
