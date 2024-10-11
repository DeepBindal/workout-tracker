import mongoose from 'mongoose';

const setSchema = new mongoose.Schema({
    reps: {
        type: Number,
        required: true,  // Number of reps in this set
    },
    weight: {
        type: Number,    // Optional: Weight lifted in this set
    },
}, { _id: false });  // Disable _id for each set

const exerciseSchema = new mongoose.Schema({
    exerciseName: {
        type: String,
        required: true,
    },
    category: {
        type: String,  // e.g., Strength, Cardio, etc.
        required: true,
    },
    muscleGroup: {
        type: String,  // e.g., Chest, Legs, Back
    },
    sets: {
        type: [setSchema],  // Array of set objects with reps and weight
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  // Reference to the user who performed the exercise
        ref: 'User',
        required: true,
    },
});

const Exercise = mongoose.models?.Exercise || mongoose.model('Exercise', exerciseSchema);
export default Exercise;
