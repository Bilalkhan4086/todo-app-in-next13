import mongoose, { Schema } from "mongoose";

const TodoSchema = new Schema({
  title: String,
  is_done: Boolean,
});

export default mongoose.models.Todo || mongoose.model("Todo", TodoSchema);
