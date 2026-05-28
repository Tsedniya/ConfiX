import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  role: "attendee" | "speaker" | "organizer" | "admin";

  status: "active" | "pending" | "rejected" | "suspended";

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["attendee", "speaker", "organizer", "admin"],
      default: "attendee",
    },

    status: {
      type: String,
      enum: ["active", "pending", "rejected", "suspended"],
      default: "active",
    },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", userSchema);