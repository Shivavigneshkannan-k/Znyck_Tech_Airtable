import mongoose from "mongoose";

const fieldSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    choices: [String],
    required: { type: Boolean, default: false },
    unique: { type: Boolean, default: false },
    default: { type: mongoose.Schema.Types.Mixed },
    dropDown: {
      type: String,
      enum: ["multi select", "single select"],
      default: null
    }
  },
  { timestamps: true }
);

const tableSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, default: "Untitled" },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    fields: [fieldSchema]
  },
  { timestamps: true }
);

const Table = mongoose.model("Table", tableSchema);
export default Table;
