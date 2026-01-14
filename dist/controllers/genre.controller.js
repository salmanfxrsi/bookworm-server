"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGenre = exports.updateGenre = exports.createGenre = exports.getGenres = void 0;
const Genre_1 = __importDefault(require("../models/Genre"));
const getGenres = async (req, res) => {
    try {
        const genres = await Genre_1.default.find();
        res.status(200).json(genres);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getGenres = getGenres;
const createGenre = async (req, res) => {
    try {
        const { name } = req.body;
        const genre = await Genre_1.default.create({ name });
        res.status(201).json(genre);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.createGenre = createGenre;
const updateGenre = async (req, res) => {
    try {
        const genre = await Genre_1.default.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!genre)
            return res.status(404).json({ message: "Genre not found" });
        res.status(200).json(genre);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateGenre = updateGenre;
const deleteGenre = async (req, res) => {
    try {
        await Genre_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Genre deleted" });
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteGenre = deleteGenre;
//# sourceMappingURL=genre.controller.js.map