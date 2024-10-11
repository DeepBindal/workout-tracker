import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workoutName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  exercises: [{type: mongoose.Schema.Types.ObjectId, ref: 'Exercise'}], // Array of exercises using the Exercise schema
  notes: {
    type: String, // Optional: Notes about the workout
  },
});

const Workout =
  mongoose.models.Workout || mongoose.model("Workout", workoutSchema);
export default Workout;
