"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTutorial = exports.updateTutorial = exports.createTutorial = exports.getTutorials = void 0;
const Tutorial_1 = __importDefault(require("../models/Tutorial"));
const getTutorials = async (req, res) => {
    try {
        const tutorials = await Tutorial_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(tutorials);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.getTutorials = getTutorials;
const createTutorial = async (req, res) => {
    try {
        const { title, description, url } = req.body;
        const tutorial = await Tutorial_1.default.create({ title, description, url });
        res.status(201).json(tutorial);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.createTutorial = createTutorial;
const updateTutorial = async (req, res) => {
    try {
        const tutorial = await Tutorial_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        if (!tutorial)
            return res.status(404).json({ message: "Tutorial not found" });
        res.status(200).json(tutorial);
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateTutorial = updateTutorial;
const deleteTutorial = async (req, res) => {
    try {
        await Tutorial_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Tutorial deleted" });
    }
    catch {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteTutorial = deleteTutorial;
//# sourceMappingURL=tutorial.controller.js.map