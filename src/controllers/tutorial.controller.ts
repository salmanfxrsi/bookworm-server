import { Request, Response } from "express";
import Tutorial from "../models/Tutorial";

export const getTutorials = async (req: Request, res: Response) => {
  try {
    const tutorials = await Tutorial.find().sort({ createdAt: -1 });
    res.status(200).json(tutorials);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createTutorial = async (req: Request, res: Response) => {
  try {
    const { title, description, url } = req.body;
    const tutorial = await Tutorial.create({ title, description, url });
    res.status(201).json(tutorial);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTutorial = async (req: Request, res: Response) => {
  try {
    const tutorial = await Tutorial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!tutorial)
      return res.status(404).json({ message: "Tutorial not found" });
    res.status(200).json(tutorial);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTutorial = async (req: Request, res: Response) => {
  try {
    await Tutorial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tutorial deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
