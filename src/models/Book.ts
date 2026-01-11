import mongoose, { Schema, Document, Types } from "mongoose";

export interface IBook extends Document {
  title: string;
  author: string;
  description: string;
  coverImage: string;
  genre: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    coverImage: { type: String, required: true },
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBook>("Book", BookSchema);
