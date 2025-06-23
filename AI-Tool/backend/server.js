import express from "express";
import mongoose from "mongoose";
<<<<<<< HEAD
=======
import path from "path";
import dotenv from "dotenv";

>>>>>>> b4316bd4ce5f211375b9af2646b254e52841b1c1
import cors from "cors";
import chat from "./schema.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "dist", "index.html"));
});

const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
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
  res.status(200).json({ message: "All chats deleted" });
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Id recieved", id);
  await chat.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted successfully" });
});
