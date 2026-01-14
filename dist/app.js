"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const genre_routes_1 = __importDefault(require("./routes/genre.routes"));
const review_routes_1 = __importDefault(require("./routes/review.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const tutorial_route_1 = __importDefault(require("./routes/tutorial.route"));
const reading_shelf_route_1 = __importDefault(require("./routes/reading_shelf.route"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials: true,
}));
app.use(express_1.default.json());
app.use("/api/books", book_routes_1.default);
app.use("/api/genres", genre_routes_1.default);
app.use("/api/reviews", review_routes_1.default);
app.use("/api/users", user_routes_1.default);
app.use("/api/tutorials", tutorial_route_1.default);
app.use("/api/shelves", reading_shelf_route_1.default);
app.get("/", (req, res) => {
    res.send("BookWorm server is running!");
});
exports.default = app;
//# sourceMappingURL=app.js.map