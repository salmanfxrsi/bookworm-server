import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";

// User interface
export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  photo?: string;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

// Schema
const userSchema: Schema<IUser> = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    photo: { type: String, default: "" },
  },
  { timestamps: true }
);

// ✅ Modern async pre-save middleware (no `next`!)
userSchema.pre<IUser>("save", async function () {
  if (!this.isModified("password")) return; // only hash if password is modified
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Compare password
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Export model
const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);
export default User;
