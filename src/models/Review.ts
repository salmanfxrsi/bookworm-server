import mongoose, { Schema, Document } from "mongoose";

export interface IReview extends Document {
  book: mongoose.Types.ObjectId;
  userName: string;
  rating: number;
  comment: string;
  status: "pending" | "approved" | "rejected";
}

const reviewSchema = new Schema<IReview>(
  {
    book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    userName: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Review ||
  mongoose.model<IReview>("Review", reviewSchema);
