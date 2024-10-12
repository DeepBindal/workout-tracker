import mongoose from "mongoose";
import Workout from "./workout.model.js"; // Import the Workout schema

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  onboarded: {
    type: Boolean,
    required: true,
    default: false,
  },
  workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Workout" }],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
