import mongoose from "mongoose";

const questions = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: [String],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const chat = mongoose.model("history", questions);
export default chat;
