import express, { Application } from "express";
import dotenv from "dotenv";
import genreRoutes from "./routes/genre.routes";

dotenv.config();

const app: Application = express();

app.use(express.json());

app.use("/api/genres", genreRoutes);

app.get("/", (req, res) => {
  res.send("BookWorm server is running!");
});

export default app;
