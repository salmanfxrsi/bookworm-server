import mongoose, { Schema, Document } from "mongoose";

export interface ITutorial extends Document {
  title: string;
  description?: string;
  url: string;
}

const tutorialSchema = new Schema<ITutorial>(
  {
    title: { type: String, required: true },
    description: { type: String },
    url: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Tutorial ||
  mongoose.model<ITutorial>("Tutorial", tutorialSchema);
