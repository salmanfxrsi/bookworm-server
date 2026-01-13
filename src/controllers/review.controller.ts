import { Request, Response } from "express";
import Review from "../models/Review";
import Book from "../models/Book";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.query;
    const filter: any = {};
    if (bookId) filter.book = bookId;

    const reviews = await Review.find(filter).populate("book", "title");
    res.status(200).json(reviews);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { book, userName, rating, comment } = req.body;

    const bookExists = await Book.findById(book);
    if (!bookExists) return res.status(400).json({ message: "Invalid book" });

    const review = await Review.create({ book, userName, rating, comment });
    const populatedReview = await review.populate("book", "title");
    res.status(201).json(populatedReview);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("book", "title");
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review deleted" });
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};
