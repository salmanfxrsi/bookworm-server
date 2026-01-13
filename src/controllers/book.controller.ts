import { Request, Response } from "express";
import Book from "../models/Book";
import Genre from "../models/Genre";
import mongoose from "mongoose";


export const getBooks = async (req: Request, res: Response) => {
  try {
    let { search = "", genre, page = "1", limit = "5" } = req.query;

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 5;
    const skip = (pageNum - 1) * limitNum;

    const filter: any = {};

    if (search) {
      filter.$or = [
        { title: { $regex: search as string, $options: "i" } },
        { author: { $regex: search as string, $options: "i" } },
      ];
    }

    if (genre) {
      filter.genre = new mongoose.Types.ObjectId(genre as string);
    }

    const total = await Book.countDocuments(filter);
    const books = await Book.find(filter)
      .populate("genre", "name") 
      .skip(skip)
      .limit(limitNum);

    res.status(200).json({
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      data: books,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


export const getBookById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || typeof id !== "string" || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id).populate("genre", "name");

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, description, cover } = req.body;

    const genreExists = await Genre.findById(genre);
    if (!genreExists) return res.status(400).json({ message: "Invalid genre" });

    const book = await Book.create({
      title,
      author,
      genre,
      description,
      cover,
    });
    const populatedBook = await book.populate("genre", "name");
    res.status(201).json(populatedBook);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { genre } = req.body;

    if (genre) {
      const genreExists = await Genre.findById(genre);
      if (!genreExists)
        return res.status(400).json({ message: "Invalid genre" });
    }

    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("genre", "name");

    if (!book) return res.status(404).json({ message: "Book not found" });
    res.status(200).json(book);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Book deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
