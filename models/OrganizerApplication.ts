import mongoose, { Schema, Document } from "mongoose";

export interface IOrganizerApplication extends Document {
  userId: mongoose.Types.ObjectId;
  organizationName: string;
  position?: string;
  website?: string;
  motivation?: string;
  expectedEvents?: number;

  status: "pending" | "approved" | "rejected";

  reviewedBy?: mongoose.Types.ObjectId;
  reviewedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const organizerApplicationSchema =
  new Schema<IOrganizerApplication>(
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      organizationName: {
        type: String,
        required: true,
      },

      position: {
        type: String,
      },

      website: {
        type: String,
      },

      motivation: {
        type: String,
      },

      expectedEvents: {
        type: Number,
      },

      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },

      reviewedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },

      reviewedAt: {
        type: Date,
      },
    },
    {
      timestamps: true,
    }
  );

export default mongoose.models.OrganizerApplication ||
  mongoose.model<IOrganizerApplication>(
    "OrganizerApplication",
    organizerApplicationSchema
  );