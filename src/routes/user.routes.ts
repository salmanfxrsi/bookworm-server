import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getAllUsers);
router.put("/:id/role", updateUserRole);
router.delete("/:id", deleteUser);

export default router;
