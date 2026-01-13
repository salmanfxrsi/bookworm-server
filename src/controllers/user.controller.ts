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
    if (!user)
      return res.status(401).json({ message: "Invalid credentials" });

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
