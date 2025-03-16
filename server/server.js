import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";

// Get dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: __dirname + "/.env" });

// Debug for environment variables
console.log("MONGODB_URI exists:", process.env.MONGODB_URI ? "Yes" : "No");

const app = express();

// Make sure this comes BEFORE any routes
app.use(
  cors({
    origin: "*", // Very permissive - only use for development
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Then your other middleware
app.use(express.json());

// Set mongoose debug mode
mongoose.set("debug", true);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define workout schema
const workoutSchema = new mongoose.Schema({
  name: String,
  description: String,
  exercises: [
    {
      name: String,
      sets: [Number],
    },
  ],
});

const Workout = mongoose.model("Workout", workoutSchema);

// Routes
app.get("/api/workouts", async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post("/api/workouts", async (req, res) => {
  try {
    const workout = new Workout(req.body);
    const savedWorkout = await workout.save();
    res.status(201).json(savedWorkout);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
