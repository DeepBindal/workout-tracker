import Progress from '@/components/Progress';
import { fetchUserExercises } from '@/lib/actions/exercise.actions';
import { fetchUser } from '@/lib/actions/user.actions';
import { fetchUserWorkouts } from '@/lib/actions/workout.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
    const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect("/onboarding");
  }
  let data = await fetchUserExercises(userInfo._id);
  data = JSON.parse(JSON.stringify(data));  
  return (
    <>
      <Progress data={data}/> 
    </>
  )
}

export default page