import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs.jsx";

const WorkoutCard = ({ workoutDetails }) => {
  return (
    <article className="bg-zinc-900 border border-zinc-800 shadow-xl hover:opacity-90 transition-opacity rounded-xl py-6 px-5 w-full max-w-3xl mx-auto">
      {/* Workout Header */}
      <h1 className="text-2xl font-bold text-center mb-4 text-white">
        {workoutDetails.workoutName}
      </h1>

      {/* Workout Info */}
      <div className="text-gray-400 mb-6">
        <p>
          <span className="font-semibold text-white">Date:</span>{" "}
          {new Date(workoutDetails.date).toLocaleDateString()}
        </p>
      </div>

      {/* Tabs Section */}
      <Tabs
        defaultValue={workoutDetails.exercises[0]?.exerciseName} // Ensure default value exists
        className="w-full"
      >
        <TabsList
          className={`w-full overflow-auto grid grid-cols-2 custom-scrollbar`}
        >
          {workoutDetails.exercises.map((exercise, index) => (
            <TabsTrigger
              key={index}
              value={exercise.exerciseName} // Ensure exerciseName is correct
            >
              {exercise.exerciseName || "Exercise"}{" "}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Exercise Sets */}
        {workoutDetails.exercises.map((exercise, index) => (
          <TabsContent
            key={index}
            value={exercise.exerciseName} // Ensure exerciseName matches the trigger
            className="text-gray-400"
          >
            {exercise.sets.map((set, setIndex) => (
              <p
                key={setIndex}
                className="flex my-1 justify-between p-2 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors duration-200"
              >
                <span>Reps: {set.reps}</span>
                <span>Weight: {set.weight} Kg</span>
              </p>
            ))}
          </TabsContent>
        ))}
      </Tabs>

      {/* Optional Notes Section */}
      {workoutDetails.notes && (
        <div className="mt-6 p-4 bg-gray-800 text-white rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Additional Notes</h3>
          <p>{workoutDetails.notes}</p>
        </div>
      )}
    </article>
  );
};

export default WorkoutCard;
