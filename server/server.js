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

//Schemas
const workoutSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    exercises: [
      {
        id: String,
        name: String,
        sets: [String],
      },
    ],
  },
  { timestamps: true }
);
const ProteinSchema = new mongoose.Schema({
  id: String,
  proteinInGrams: Number,
  date: Date,
});
const WeightSchema = new mongoose.Schema({
  id: String,
  weight: Number,
  date: Date,
});

// Models
const Workout = mongoose.model("Workout", workoutSchema);
const Weight = mongoose.model("Weight", WeightSchema);
const Protein = mongoose.model("Protein", ProteinSchema);

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

app.put("/api/workouts/:id", async (req, res) => {
  try {
    console.log("Received PUT request for workout:", req.params.id);
    console.log("Request body:", req.body);

    const updatedWorkout = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedWorkout) {
      console.log("No workout found with ID:", req.params.id);
      return res.status(404).json({
        message: "Workout not found",
        workoutId: req.params.id,
      });
    }

    console.log("Successfully updated workout:", updatedWorkout);
    res.json(updatedWorkout);
  } catch (error) {
    console.error("Error updating workout:", error);
    res.status(400).json({ message: error.message });
  }
});

app.delete("/api/workouts/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ message: "Workout not found" });
    }
    res.status(200).json({ message: "Workout deleted successfully" });
  } catch (error) {
    console.error("Error deleting Workout:", error);
    res.status(500).json({ message: error.message });
  }
});

// Weight
app.get("/api/weights", async (req, res) => {
  try {
    const weights = await Weight.find();
    res.json(weights);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/api/weights", async (req, res) => {
  try {
    const weight = new Weight(req.body);
    const savedWeight = await weight.save();
    res.status(201).json(savedWeight);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

app.put("/api/wights/:id", async (req, res) => {
  try {
    console.log("Reveived PUT request for weight:", req.params.id);
    console.log("Request body:", req.body);

    const updatedWeight = await Workout.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedWeight) {
      console.log("No weight found with ID:", req.params.id);
      return res.status(404).json({
        message: "Weight not found",
        workoutId: req.params.id,
      });
    }
    console.log("Successfully updated weight:", updatedWeight);
    res.json(updatedWeight);
  } catch (error) {
    console.error("Error updating weight:", error);
    res.status(400).json({ message: error.message });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
