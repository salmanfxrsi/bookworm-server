import { Request, Response } from "express";
import Book from "../models/Book";
import Genre from "../models/Genre";

export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, description, coverImage, genre } = req.body;

    const existingGenre = await Genre.findById(genre);
    if (!existingGenre)
      return res.status(400).json({ message: "Invalid genre" });

    const book = await Book.create({
      title,
      author,
      description,
      coverImage,
      genre,
    });
    res.status(201).json({ message: "Book created", book });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getBooks = async (req: Request, res: Response) => {
  try {
    let {
      search = "",
      genres = "",
      rating = "",
      page = "1",
      limit = "8",
    } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 8;
    const skip = (pageNum - 1) * limitNum;
    const filter: any = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search as string, $options: "i" } },
        { author: { $regex: search as string, $options: "i" } },
      ];
    }

    if (genres) {
      const genresArray = (genres as string).split(",");
      filter.genre = { $in: genresArray };
    }

    if (rating) {
      filter.avgRating = { $gte: Number(rating) };
    }

    const total = await Book.countDocuments(filter);

    const books = await Book.find(filter)
      .populate("genre")
      .sort({ title: 1 })
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      data: books,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, author, description, coverImage, genre } = req.body;

    if (genre) {
      const existingGenre = await Genre.findById(genre);
      if (!existingGenre)
        return res.status(400).json({ message: "Invalid genre" });
    }

    const updated = await Book.findByIdAndUpdate(
      id,
      { title, author, description, coverImage, genre },
      { new: true }
    ).populate("genre");

    if (!updated) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book updated", book: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Book.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Book not found" });

    res.status(200).json({ message: "Book deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
