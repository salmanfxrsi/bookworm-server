import cors from "cors";
import express, { Application } from "express";
import dotenv from "dotenv";
import bookRoutes from "./routes/book.routes";
import genreRoutes from "./routes/genre.routes";
import reviewRoutes from "./routes/review.routes";

dotenv.config();

const app: Application = express();

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.use("/api/books", bookRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/reviews", reviewRoutes);

app.get("/", (req, res) => {
  res.send("BookWorm server is running!");
});

export default app;
