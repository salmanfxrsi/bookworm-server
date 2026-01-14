"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const Book_1 = __importDefault(require("../models/Book"));
const Genre_1 = __importDefault(require("../models/Genre"));
const mongoose_1 = __importDefault(require("mongoose"));
const getBooks = async (req, res) => {
    try {
        let { search = "", genre, page = "1", limit = "5" } = req.query;
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 5;
        const skip = (pageNum - 1) * limitNum;
        const filter = {};
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: "i" } },
                { author: { $regex: search, $options: "i" } },
            ];
        }
        if (genre) {
            filter.genre = new mongoose_1.default.Types.ObjectId(genre);
        }
        const total = await Book_1.default.countDocuments(filter);
        const books = await Book_1.default.find(filter)
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
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== "string" || !mongoose_1.default.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid book ID" });
        }
        const book = await Book_1.default.findById(id).populate("genre", "name");
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getBookById = getBookById;
const createBook = async (req, res) => {
    try {
        const { title, author, genre, description, cover } = req.body;
        const genreExists = await Genre_1.default.findById(genre);
        if (!genreExists)
            return res.status(400).json({ message: "Invalid genre" });
        const book = await Book_1.default.create({
            title,
            author,
            genre,
            description,
            cover,
        });
        const populatedBook = await book.populate("genre", "name");
        res.status(201).json(populatedBook);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    try {
        const { genre } = req.body;
        if (genre) {
            const genreExists = await Genre_1.default.findById(genre);
            if (!genreExists)
                return res.status(400).json({ message: "Invalid genre" });
        }
        const book = await Book_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).populate("genre", "name");
        if (!book)
            return res.status(404).json({ message: "Book not found" });
        res.status(200).json(book);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        await Book_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Book deleted" });
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteBook = deleteBook;
//# sourceMappingURL=book.controller.js.map