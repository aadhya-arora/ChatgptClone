import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import chat from "./schema.js";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "./user.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://chatgpt-clone-five-sigma.vercel.app",
    ],
    credentials: true,
  })
);
app.use(cookieParser());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });

app.get("/history", async (req, res) => {
  try {
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECURITY);
    const email = decoded.email;

    const userChats = await chat.find({ email });
    res.json(userChats);
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.post("/submit", async (req, res) => {
  const { question, answer } = req.body;
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.SECURITY);
    const email = decoded.email;

    const existing = await chat.findOne({ question, email });

    if (!existing) {
      const newChat = new chat({ question, answer, email });
      await newChat.save();
      return res.status(201).json({ message: "Saved successfully" });
    } else {
      return res.status(200).json({ message: "Duplicate found, not saved" });
    }
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

app.delete("/delete-all", async (req, res) => {
  await chat.deleteMany({});
  res.status(200).json({ message: "All chats deleted" });
});

app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Id received", id);
  await chat.findByIdAndDelete(id);
  res.status(200).json({ message: "Deleted successfully" });
});

app.post("/create", (req, res) => {
  const { username, email, phone, password } = req.body;
  console.log(req.body);

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return res.status(500).json({ error: "Salt error" });
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) return res.status(500).json({ error: "Hash error" });

      try {
        const createUser = await User.create({
          username,
          email,
          phone,
          password: hash,
        });

        const token = jwt.sign({ email, username }, process.env.SECURITY);
        res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });

        console.log("✅ User created:", createUser);
        res.status(201).json(createUser);
      } catch (dbError) {
        console.error("❌ MongoDB error:", dbError);
        res.status(500).json({ error: dbError.message });
      }
    });
  });
});

app.get("/logout", (req, res) => {
  res.cookie("token", " ");
  res.redirect("/");
});

app.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) return res.status(500).json({ error: "Bcrypt error" });

    if (result) {
      const token = jwt.sign(
        { email: user.email, username: user.username },
        process.env.SECURITY
      );
      res.cookie("token", token, { httpOnly: true, sameSite: "Lax" });
      res.status(200).json({ message: "Login success" });
    } else {
      res.status(401).json({ error: "Incorrect password" });
    }
  });
});

app.get("/me", (req, res) => {
  console.log("Cookies received:", req.cookies); // Log cookies

  try {
    const token = req.cookies.token;
    if (!token) {
      console.log("❌ No token found");
      return res.status(401).json({ error: "Unauthorized - No token" });
    }

    const decoded = jwt.verify(token, process.env.SECURITY);
    console.log("✅ Token decoded:", decoded);
    res.status(200).json({ email: decoded.email, username: decoded.username });
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
});
