import { Request, Response } from "express";
import Genre from "../models/Genre";

export const getGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createGenre = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const genre = await Genre.create({ name });
    res.status(201).json(genre);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateGenre = async (req: Request, res: Response) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!genre) return res.status(404).json({ message: "Genre not found" });
    res.status(200).json(genre);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteGenre = async (req: Request, res: Response) => {
  try {
    await Genre.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Genre deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
