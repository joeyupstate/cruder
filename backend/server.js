const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://joeisbro89:maxismydog2@cruder.grgdv.mongodb.net/?retryWrites=true&w=majority&appName=cruder",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Task Schema and Model
const wordSchema = new mongoose.Schema({
  spanish: String,
  english: String,
});

const Word = mongoose.model("Word", wordSchema);

// Routes for CRUD operations

// Create a task (POST)
app.post("/words", async (req, res) => {
  const word = new Word(req.body);
  try {
    const savedWord = await word.save();
    res.status(201).json(savedWord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all tasks (GET)
app.get("/words", async (req, res) => {
  try {
    const words = await Word.find();
    res.status(200).json(words);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a task (PUT)
app.put("/words/:id", async (req, res) => {
  try {
    const updatedWord = await Word.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedWord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a task (DELETE)
app.delete("/words/:id", async (req, res) => {
  try {
    await Word.findByIdAndDelete(req.params.id);
    res.status(204).json({ message: "Word deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Start the server
const port = 2800;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
