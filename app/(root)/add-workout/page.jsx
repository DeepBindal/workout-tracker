import AddWorkoutForm from '@/components/AddWorkoutForm'
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

const page = async () => {
  const user = await currentUser();

  if (!user) {
    redirect('/login'); // Redirect to login if user is not logged in
  }

  const userInfo = await fetchUser(user.id);

  if (!userInfo?.onboarded) {
    redirect('/onboarding'); // Redirect to homepage if the user is already onboarded
  }
  return (
    <>
        <h1 className='text-3xl font-semibold mb-2'>Add a Workout</h1>
        <AddWorkoutForm userId={user.id} />
    </>
  )
}

export default page