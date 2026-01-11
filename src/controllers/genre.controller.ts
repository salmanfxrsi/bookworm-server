import { Request, Response } from "express";
import Genre from "../models/Genre";

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name, description } = req.body;

    const existing = await Genre.findOne({ name });
    if (existing)
      return res.status(400).json({ message: "Genre already exists" });

    const genre = await Genre.create({ name, description });
    res.status(201).json({ message: "Genre created", genre });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });
    res.status(200).json({ genres });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updated = await Genre.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json({ message: "Genre updated", genre: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Genre.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json({ message: "Genre deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
