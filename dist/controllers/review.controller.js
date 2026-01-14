"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = exports.getReviews = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const Book_1 = __importDefault(require("../models/Book"));
const getReviews = async (req, res) => {
    try {
        const { bookId, status, page = "1", limit = "10" } = req.query;
        const filter = {};
        if (bookId)
            filter.book = bookId;
        if (status &&
            ["pending", "approved", "rejected"].includes(String(status))) {
            filter.status = status;
        }
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 10;
        const skip = (pageNum - 1) * limitNum;
        const total = await Review_1.default.countDocuments(filter);
        const reviews = await Review_1.default.find(filter)
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getReviews = getReviews;
const createReview = async (req, res) => {
    try {
        const { book, userName, rating, comment } = req.body;
        if (!book || !userName || !rating || !comment) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const bookExists = await Book_1.default.findById(book);
        if (!bookExists)
            return res.status(400).json({ message: "Invalid book" });
        const review = await Review_1.default.create({ book, userName, rating, comment });
        const populatedReview = await review.populate("book", "title");
        res.status(201).json(populatedReview);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.createReview = createReview;
// UPDATE review (approve/reject or edit comment/rating)
const updateReview = async (req, res) => {
    try {
        const allowedFields = ["rating", "comment", "status"];
        const updateData = {};
        allowedFields.forEach((field) => {
            if (req.body[field] !== undefined)
                updateData[field] = req.body[field];
        });
        const review = await Review_1.default.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
        }).populate("book", "title");
        if (!review)
            return res.status(404).json({ message: "Review not found" });
        res.status(200).json(review);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateReview = updateReview;
const deleteReview = async (req, res) => {
    try {
        const review = await Review_1.default.findById(req.params.id);
        if (!review)
            return res.status(404).json({ message: "Review not found" });
        await review.remove();
        res.status(200).json({ message: "Review deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=review.controller.js.map