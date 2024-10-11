import WorkoutCard from "@/components/WorkoutCard.jsx";
import { fetchUser } from "@/lib/actions/user.actions.js";
import { fetchUserWorkouts } from "@/lib/actions/workout.actions.js";
import { currentUser } from "@clerk/nextjs/server";
import { Link } from "lucide-react";
import { redirect } from "next/navigation";

const page = async ({ params }) => {
  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }

  const workouts = await fetchUserWorkouts(userInfo._id);

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold mb-4">Your workouts</h1>
      {/* Workouts Grid */}
      {workouts && workouts.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-4 lg:gap-10 grid-cols-1">
          {workouts.map((workout) => (
            <WorkoutCard key={workout._id} workoutDetails={workout} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center py-16">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            No workouts added yet
          </h2>
          <p className="text-gray-400 mb-6">
            Start by adding your first workout to track your progress.
          </p>
          <Link
            href="/add-workout"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-500 transition-colors"
          >
            Add First Workout
          </Link>
        </div>
      )}
    </div>
  );
};

export default page;
