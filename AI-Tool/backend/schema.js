import mongoose from "mongoose";
const questions = new mongoose.Schema({
  question: { type: String, required: true },
  answer: { type: [String], require: true },
  createdAt: { type: Date, default: Date.now },
});
const chat = mongoose.model("history", questions);
export default chat;
