import mongoose, { Schema, Document } from "mongoose";

export interface IGenre extends Document {
  name: string;
  description?: string;
}

const GenreSchema: Schema<IGenre> = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.model<IGenre>("Genre", GenreSchema);
