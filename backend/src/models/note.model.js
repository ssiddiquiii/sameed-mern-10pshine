import mongoose, { Schema } from "mongoose";

const noteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPinned: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: Schema.Types.ObjectId, // 🔗 Relation: Links to the User who created it
      ref: "User", // Must match the name inside mongoose.model("User")
      required: true,
    },
  },
  {
    timestamps: true, // Auto-manages 'createdAt' and 'updatedAt'
  }
);

export const Note = mongoose.model("Note", noteSchema);