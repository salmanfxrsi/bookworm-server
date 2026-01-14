import { Request, Response } from "express";
import ReadingShelf from "../models/ReadingShelf";

export const getUserShelves = async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId as string;
    if (!userId) return res.status(400).json({ message: "userId required" });

    const shelves = await ReadingShelf.find({ user: userId }).populate(
      "book",
      "title author genre cover"
    );

    res.status(200).json(shelves);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const addToShelf = async (req: Request, res: Response) => {
  try {
    const { user, book, status } = req.body;

    const existing = await ReadingShelf.findOne({ user, book });
    if (existing)
      return res.status(400).json({ message: "Book already in shelf" });

    const newEntry = await ReadingShelf.create({
      user,
      book,
      status,
      progress: 0,
    });
    const populated = await newEntry.populate(
      "book",
      "title author genre cover"
    );
    res.status(201).json(populated);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateShelf = async (req: Request, res: Response) => {
  try {
    const { status, progress } = req.body;
    const shelf = await ReadingShelf.findByIdAndUpdate(
      req.params.id,
      { status, progress },
      { new: true }
    ).populate("book", "title author genre cover");

    if (!shelf)
      return res.status(404).json({ message: "Shelf entry not found" });
    res.status(200).json(shelf);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a shelf entry
export const deleteShelf = async (req: Request, res: Response) => {
  try {
    await ReadingShelf.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted from shelf" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
