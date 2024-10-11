"use server"
import Exercise from "../models/exercise.model";
import { connectToDb } from "../utils/db";

export const fetchUserExercises = async (id) => {
    try {
        await connectToDb();
        const exercises = await Exercise.find({user: id});
        // console.log(exercises);
        return exercises;
    } catch (error) {
        console.log("Error fetching", error);
    }
}