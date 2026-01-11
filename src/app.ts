import express, { Application } from "express";
import dotenv from "dotenv";
import genreRoutes from "./routes/genre.routes";
import bookRoutes from "./routes/book.routes";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api/genres", genreRoutes);
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("BookWorm server is running!");
});

export default app;
