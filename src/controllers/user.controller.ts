import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";

// REGISTER
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, photo } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      photo,
    });

    res.status(201).json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo ?? null,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// LOGIN
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    res.status(200).json({
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      photo: user.photo ?? null,
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE USER ROLE
export const updateUserRole = async (req: Request, res: Response) => {
  const { role } = req.body;

  if (!role) return res.status(400).json({ message: "Role is required" });

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE USER
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
