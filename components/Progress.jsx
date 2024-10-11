"use client";
import {
  Line,
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

export default function Progress({ data }) {
  const [prompt, setPrompt] = useState("");
  const [exercises, setExercises] = useState([]);

  // Function to calculate the average weight per session
  const calculateAverageWeight = (exercise) => {
    return exercise.sets.map((set) => set.weight).reduce((a, b) => a + b, 0) / exercise.sets.length;
  };

  const handleAction = () => {
    const regex = new RegExp(prompt, "i");
    const filteredExercises = data.filter((item) => regex.test(item.exerciseName));

    // Add a new field `averageWeight` to each exercise
    const exercisesWithAverages = filteredExercises.map((exercise) => ({
      ...exercise,
      averageWeight: calculateAverageWeight(exercise), // Calculate the average weight for each exercise
    }));

    setExercises(exercisesWithAverages);
  };

  return (
    <>
    <h1 className="text-4xl font-semibold">Track your progress</h1>
      <Input
        type="text"
        placeholder="Type an exercise you want to see progress in. Eg: Lat pulldowns"
        onChange={(e) => setPrompt(e.target.value)}
        className="border-gray-300 my-4 focus:ring-blue-500 focus:border-blue-500 rounded-xl"
      />
      <Button onClick={handleAction} className="rounded mb-4 bg-blue-700">
        Submit
      </Button>

      {exercises && exercises.length > 0 ? (
        <Card className="max-w-3xl mx-auto p-6 shadow-lg rounded-lg"> {/* Increased max width */}
          <CardHeader className="text-center mb-4">
            <CardTitle className="text-xl font-semibold">{prompt.toUpperCase() || "Exercise Progress"}</CardTitle>
            <CardDescription className="text-sm text-gray-600">
              Average weight lifted across sessions:
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <ResponsiveContainer width="100%" height={450}> {/* Increased height */}
              <LineChart
                data={exercises.map((exercise, index) => ({
                  session: `Session ${index + 1}`, // Label sessions
                  averageWeight: exercise.averageWeight, // Plot average weight
                }))}
                margin={{ top: 20, right: 30, left: 0, bottom: 20 }} // Add padding
              >
                {/* Add clearer grid lines */}
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                
                {/* X Axis styling */}
                <XAxis
                  dataKey="session"
                  tick={{ fill: "#555", fontSize: 14 }} // Larger ticks
                  label={{
                    value: "Sessions",
                    position: "insideBottom",
                    offset: -10,
                    fill: "#333",
                    fontSize: 16, // Larger label
                  }}
                />
                {/* Y Axis styling */}
                <YAxis
                  tick={{ fill: "#555", fontSize: 14 }} // Larger ticks
                  label={{
                    value: "Avg Weight (kg)",
                    angle: -90,
                    position: "insideLeft",
                    offset: 15,
                    fill: "#333",
                    fontSize: 16, // Larger label
                  }}
                />
                
                {/* Tooltip styling */}
                <Tooltip
                  contentStyle={{ backgroundColor: "#333", borderRadius: "8px", color: "#fff" }}
                  labelStyle={{ color: "#fff", fontSize: 14 }} // Larger label in tooltip
                  cursor={{ stroke: "#888", strokeWidth: 1 }}
                />
                
                {/* Legend styling */}
                <Legend
                  wrapperStyle={{ top: 0 }}
                  verticalAlign="top"
                  align="center"
                  iconType="circle"
                  iconSize={12} // Larger icon
                  formatter={(value) => <span className="text-sm font-medium">{value}</span>} // Larger legend text
                />
                
                {/* Line styling */}
                <Line
                  type="monotone"
                  dataKey="averageWeight"
                  stroke="#8884d8"
                  strokeWidth={4} // Thicker line
                  dot={{ fill: "#8884d8", r: 6 }} // Larger dots
                  activeDot={{ r: 8 }} // Larger active dot
                  name="Avg Weight (kg)"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ) : (
        <p className="text-xl font-bold mt-4 text-center">No exercises found for your search.</p>
      )}
    </>
  );
}
