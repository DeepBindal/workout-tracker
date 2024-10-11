"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button"; // Import your Button component
import { Textarea } from "./ui/textarea";
import { addWorkout } from "@/lib/actions/workout.actions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { buttonVariants } from "@/components/ui/button";

function AddWorkoutForm({ userId }) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      workoutName: "",
      note: "",
    },
  });
  const [loading, setLoading] = useState(false);

  // State to hold multiple exercises and their sets
  const [exercises, setExercises] = useState([
    { exerciseName: "", muscleGroup: "", sets: [{ reps: "", weight: "" }] },
  ]);

  const onSubmit = async (data) => {
    // console.log(data)
    try {
      setLoading(true);
      await addWorkout({
        workout: data.workoutName,
        note: data.note,
        exercises,
        userId,
      });
      toast.success("Workout added 🏋️.");

      router.push("/");
    } catch (error) {
      toast.error("Something went wrong.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Function to add a new exercise
  const addExercise = () => {
    setExercises([
      ...exercises,
      { exerciseName: "", muscleGroup: "", sets: [{ reps: "", weight: "" }] },
    ]);
  };

  // Function to remove an exercise
  const removeExercise = (index) => {
    const updatedExercises = exercises.filter((_, i) => i !== index);
    setExercises(updatedExercises);
  };

  // Function to add a set to an exercise
  const addSet = (index) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return {
          ...exercise,
          sets: [...exercise.sets, { reps: "", weight: "" }],
        };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  // Function to remove a set from an exercise
  const removeSet = (exerciseIndex, setIndex) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === exerciseIndex) {
        return {
          ...exercise,
          sets: exercise.sets.filter((_, j) => j !== setIndex),
        };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  // Function to handle input change for exercises and sets
  const handleExerciseChange = (index, field, value) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === index) {
        return { ...exercise, [field]: value };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  // Function to handle input change for sets
  const handleSetChange = (exerciseIndex, setIndex, field, value) => {
    const updatedExercises = exercises.map((exercise, i) => {
      if (i === exerciseIndex) {
        const updatedSets = exercise.sets.map((set, j) => {
          if (j === setIndex) {
            return { ...set, [field]: value };
          }
          return set;
        });
        return { ...exercise, sets: updatedSets };
      }
      return exercise;
    });
    setExercises(updatedExercises);
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          {/* Workout Name */}
          <FormField
            control={form.control}
            name="workoutName"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold text-lg">
                  Workout Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter your workout name. E.g., Push, Pull..."
                    className="border-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Exercises */}
          {exercises.map((exercise, exerciseIndex) => (
            <div
              key={exerciseIndex}
              className="border border-zinc-900 p-4 rounded-xl"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">
                  Exercise {exerciseIndex + 1}
                </h2>
                <Button
                  type="button"
                  onClick={() => removeExercise(exerciseIndex)}
                  variant="destructive"
                  className="rounded"
                >
                  Remove Exercise
                </Button>
              </div>

              {/* Exercise Name */}
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold text-lg">
                  Exercise Name
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter exercise name. E.g., Bench Press"
                    className="border-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    value={exercise.exerciseName}
                    onChange={(e) =>
                      handleExerciseChange(
                        exerciseIndex,
                        "exerciseName",
                        e.target.value
                      )
                    }
                  />
                </FormControl>
              </FormItem>

              {/* Muscle Group */}
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold text-lg">
                  Muscle Group
                </FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter muscle group. E.g., Chest, Legs"
                    className="border-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    value={exercise.muscleGroup}
                    onChange={(e) =>
                      handleExerciseChange(
                        exerciseIndex,
                        "muscleGroup",
                        e.target.value
                      )
                    }
                  />
                </FormControl>
              </FormItem>

              {/* Sets */}
              {exercise.sets.map((set, setIndex) => (
                <div key={setIndex} className="mt-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg">Set {setIndex + 1}</h3>
                    <Button
                      type="button"
                      onClick={() => removeSet(exerciseIndex, setIndex)}
                      variant="destructive"
                      className="rounded"
                    >
                      Remove Set
                    </Button>
                  </div>

                  {/* Reps */}
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-semibold">Reps</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Reps"
                        className="border-gray-900 mb-2 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                        value={set.reps}
                        onChange={(e) =>
                          handleSetChange(
                            exerciseIndex,
                            setIndex,
                            "reps",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>

                  {/* Weight */}
                  <FormItem className="flex flex-col gap-2">
                    <FormLabel className="font-semibold mt-2">
                      Weight (kg)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Weight"
                        className="border-gray-900 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                        value={set.weight}
                        onChange={(e) =>
                          handleSetChange(
                            exerciseIndex,
                            setIndex,
                            "weight",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                  </FormItem>
                </div>
              ))}

              {/* Add Set Button */}
              <Button
                type="button"
                onClick={() => addSet(exerciseIndex)}
                className="mt-4 bg-green-600 text-white py-2 px-4 rounded-full"
              >
                Add Set
              </Button>
            </div>
          ))}

          {/* Add Exercise Button */}
          <Button
            type="button"
            onClick={addExercise}
            className="rounded"
            variant="secondary"
          >
            Add Exercise
          </Button>

          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2">
                <FormLabel className="font-semibold text-lg">Note</FormLabel>
                <FormControl>
                  <Textarea
                    rows={6}
                    placeholder="Leave a note for workout..."
                    className="border-zinc-900 rounded-xl focus:ring-blue-500 focus:border-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="rounded"
            variant="outline"
          >
            Submit Workout
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default AddWorkoutForm;
