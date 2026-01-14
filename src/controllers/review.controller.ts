import { Request, Response } from "express";
import Review from "../models/Review";
import Book from "../models/Book";

export const getReviews = async (req: Request, res: Response) => {
  try {
    const { bookName, status, page = "1", limit = "10" } = req.query;

    const filter: any = {};
    if (
      status &&
      ["pending", "approved", "rejected"].includes(String(status))
    ) {
      filter.status = status;
    }

    if (bookName) {
      const books = await Book.find({
        title: { $regex: bookName as string, $options: "i" },
      }).select("_id");
      filter.book = { $in: books.map((b) => b._id) };
    }

    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 10;
    const skip = (pageNum - 1) * limitNum;

    const total = await Review.countDocuments(filter);
    const reviews = await Review.find(filter)
      .populate("book", "title")
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    res.status(200).json({
      reviews,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const { book, userName, rating, comment } = req.body;

    if (!book || !userName || !rating || !comment) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const bookExists = await Book.findById(book);
    if (!bookExists) return res.status(400).json({ message: "Invalid book" });

    const review = await Review.create({ book, userName, rating, comment });
    const populatedReview = await review.populate("book", "title");

    res.status(201).json(populatedReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE review (approve/reject or edit comment/rating)
export const updateReview = async (req: Request, res: Response) => {
  try {
    const allowedFields = ["rating", "comment", "status"];
    const updateData: any = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    });

    const review = await Review.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    }).populate("book", "title");

    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });

    await review.remove();
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
