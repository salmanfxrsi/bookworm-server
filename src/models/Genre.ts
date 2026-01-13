import mongoose, { Schema, Document } from "mongoose";

export interface IGenre extends Document {
  name: string;
}

const genreSchema = new Schema<IGenre>(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Genre ||
  mongoose.model<IGenre>("Genre", genreSchema);
