import mongoose, { Schema, Document } from "mongoose";

export interface IReadingShelf extends Document {
  user: mongoose.Types.ObjectId; 
  book: mongoose.Types.ObjectId; 
  status: "want" | "reading" | "read";
  progress?: number; 
  startedAt?: Date;
  finishedAt?: Date;
}

const readingShelfSchema = new Schema<IReadingShelf>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    status: { type: String, enum: ["want", "reading", "read"], required: true },
    progress: { type: Number, default: 0 },
    startedAt: { type: Date },
    finishedAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.ReadingShelf ||
  mongoose.model<IReadingShelf>("ReadingShelf", readingShelfSchema);
