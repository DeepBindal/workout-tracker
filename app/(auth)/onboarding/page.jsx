import OnboardForm from '@/components/OnboardForm';
import { fetchUser } from '@/lib/actions/user.actions';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react';

async function page() {
  const user = await currentUser();

  if (!user) {
    redirect('/login'); // Redirect to login if user is not logged in
  }

  const userInfo = await fetchUser(user.id);

  if (userInfo?.onboarded) {
    redirect('/'); // Redirect to homepage if the user is already onboarded
  }

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo ? userInfo?.username : `@${user?.username}`,
    name: userInfo ? userInfo?.name : user?.firstName || '',
    bio: userInfo ? userInfo?.bio : '',
  };

  return (
    <main className="my-10 flex max-w-3xl flex-col items-center mx-4">
      <h1 className="text-2xl font-bold">Onboarding</h1>
      <p className="mb-6">Complete your profile now to continue to Workout Tracker</p>
      <section className="p-6 bg-zinc-900 shadow-lg rounded-lg max-w-lg w-full">
        <OnboardForm user={userData} />
      </section>
    </main>
  );
}

export default page;
