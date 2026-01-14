"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteShelf = exports.updateShelf = exports.addToShelf = exports.getUserShelves = void 0;
const ReadingShelf_1 = __importDefault(require("../models/ReadingShelf"));
const getUserShelves = async (req, res) => {
    try {
        const userId = req.query.userId;
        if (!userId)
            return res.status(400).json({ message: "userId required" });
        const shelves = await ReadingShelf_1.default.find({ user: userId }).populate("book", "title author genre cover");
        res.status(200).json(shelves);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getUserShelves = getUserShelves;
const addToShelf = async (req, res) => {
    try {
        const { user, book, status } = req.body;
        const existing = await ReadingShelf_1.default.findOne({ user, book });
        if (existing)
            return res.status(400).json({ message: "Book already in shelf" });
        const newEntry = await ReadingShelf_1.default.create({
            user,
            book,
            status,
            progress: 0,
        });
        const populated = await newEntry.populate("book", "title author genre cover");
        res.status(201).json(populated);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.addToShelf = addToShelf;
const updateShelf = async (req, res) => {
    try {
        const { status, progress } = req.body;
        const shelf = await ReadingShelf_1.default.findByIdAndUpdate(req.params.id, { status, progress }, { new: true }).populate("book", "title author genre cover");
        if (!shelf)
            return res.status(404).json({ message: "Shelf entry not found" });
        res.status(200).json(shelf);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateShelf = updateShelf;
// Delete a shelf entry
const deleteShelf = async (req, res) => {
    try {
        await ReadingShelf_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Deleted from shelf" });
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteShelf = deleteShelf;
//# sourceMappingURL=reading_shelf.controller.js.map