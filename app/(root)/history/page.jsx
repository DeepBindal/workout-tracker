import React from "react";
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";
import History from "@/components/History";
import { fetchUser } from "@/lib/actions/user.actions";
import { fetchUserWorkoutHistory } from "@/lib/actions/workout.actions";
import WorkoutCard from "@/components/WorkoutCard";

const page = async ({ searchParams }) => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const workouts = await fetchUserWorkoutHistory(searchParams.q, userInfo._id);
  console.log(workouts);

  return (
    <section>
      <h1 className="text-3xl font-semibold mb-4">Search</h1>
      <History routeType="history" />
      <div className="container mx-auto px-4 py-8">
        {/* Workouts Grid */}
        {workouts && workouts.length > 0 && (
          <div className="grid sm:grid-cols-2 gap-10 grid-cols-1">
            {workouts.map((workout) => (
              <WorkoutCard key={workout._id} workoutDetails={workout} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default page;
