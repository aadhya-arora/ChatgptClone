import express from "express";
import mongoose from "mongoose";

import cors from "cors";
import chat from "./schema.js";
const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = "mongodb://127.0.0.1:27017/ChatgptClone";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");

    app.listen(5000, () => {
      console.log("🚀 Server is running on port 5000");
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

app.get("/history", async (req, res) => {
  const allChat = await chat.find();
  res.json(allChat);
});

app.post("/submit", async (req, res) => {
  const { question, answer } = req.body;
  const existing = await chat.findOne({ question });

  if (!existing) {
    const newChat = new chat({ question, answer });
    await newChat.save();
    return res.status(201).json({ message: "Saved successfully" });
  } else {
    return res.status(200).json({ message: "Duplicate found, not saved" });
  }
});

app.delete("/delete-all", async (req, res) => {
  await chat.deleteMany({});
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Id recieved", id);
  await chat.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted successfully" });
});
