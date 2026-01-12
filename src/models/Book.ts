import mongoose, { Schema, Document } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  genre: mongoose.Types.ObjectId; 
  description: string;
  cover?: string;
  avgRating?: number;
}

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: Schema.Types.ObjectId, ref: "Genre", required: true },
  description: { type: String },
  cover: { type: String },
  avgRating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.models.Book || mongoose.model<IBook>("Book", bookSchema);
