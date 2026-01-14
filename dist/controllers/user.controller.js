"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// REGISTER
const registerUser = async (req, res) => {
    const { name, email, password, photo } = req.body;
    try {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser)
            return res.status(400).json({ message: "Email already exists" });
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({
            name,
            email,
            password: hashedPassword,
            photo,
        });
        res.status(201).json({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo ?? null,
        });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.registerUser = registerUser;
// LOGIN
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User_1.default.findOne({ email }).select("+password");
        if (!user)
            return res.status(401).json({ message: "Invalid credentials" });
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            return res.status(401).json({ message: "Invalid credentials" });
        res.status(200).json({
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            photo: user.photo ?? null,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
};
exports.loginUser = loginUser;
//# sourceMappingURL=user.controller.js.map