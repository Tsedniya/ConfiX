import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "attendee" | "speaker" | "organizer" | "admin";   // ← Added "admin"
  isApproved: boolean;        // Good to have for Speaker & Organizer
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["attendee", "speaker", "organizer", "admin"],
      default: "attendee",
    },
    isApproved: {
      type: Boolean,
      default: true,   // Admin = true, Speaker/Organizer can be false initially
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>("User", userSchema);