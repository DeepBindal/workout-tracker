"use server";

import Exercise from "../models/exercise.model";
import User from "../models/user.model";
import Workout from "../models/workout.model";
import { connectToDb } from "../utils/db";

export const addWorkout = async ({ workout, exercises, userId, note }) => {
  try {
    // Connect to the database
    await connectToDb();

    // Find the user by userId
    const user = await User.findOne({ id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    // Create Exercise documents and save them to the database
    const savedExercises = await Promise.all(
      exercises.map(async (exercise) => {
        const newExercise = new Exercise({
          exerciseName: exercise.exerciseName,
          category: "Strength",  // Assuming it's always strength, you can update this logic
          muscleGroup: exercise.muscleGroup,
          sets: exercise.sets.map((set) => ({
            reps: set.reps,
            weight: set.weight,
          })),
          user: user._id,  // Reference the user performing the exercise
        });
        return await newExercise.save(); // Save each exercise and return it
      })
    );

    // Create a new Workout document
    const newWorkout = new Workout({
      workoutName: workout,
      user: user._id, // Reference the user
      exercises: savedExercises.map((exercise) => exercise._id), // Reference the saved exercises by ObjectId
      notes: note,
    });

    // Save the workout to the database
    await newWorkout.save();

    // Add the workout to the user's workout list
    user.workouts.push(newWorkout._id);
    await user.save();

    return { success: true, message: "Workout added successfully" };
  } catch (error) {
    console.error("Error adding workout:", error);
    return { success: false, message: "Failed to add workout" };
  }
};


export const fetchUserWorkouts = async (id) => {
  try {
    await connectToDb();
    // Populate exercises in the workout
    return await Workout.find({ user: id })
      .populate("exercises")
      .sort({ date: "desc" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserWorkoutHistory = async (key, id) => {
  try {
    await connectToDb();
    const regex = new RegExp(key, "i");    
    return await Workout.find({
      user: id,
      workoutName: { $regex: regex },
    })
      .populate("exercises")
      .sort({ date: "desc" });
  } catch (error) {
    console.log(error);
  }
};
