import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import Link from "next/link";

async function page() {
  const user = await currentUser();

  return (
    <div className="bg-zinc-900 text-white">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center p-6">
        <div className="text-center px-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
            Track Your Progress, Transform Your Fitness
          </h1>
          <p className="text-md sm:text-lg lg:text-xl mb-6 max-w-lg mx-auto">
            Achieve your fitness goals with personalized workout plans, progress tracking, and performance analysis.
          </p>

          {/* CTA Button */}
          {!user && (
            <Link href="/sign-up">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 mb-6">
                Get Started
              </button>
            </Link>
          )}

          {/* Responsive Image */}
          <div className="mt-4">
            <Image
              src="/workout-image.avif"
              alt="Workout illustration"
              height={300}
              width={300}
              className="mx-auto rounded-lg shadow-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default page;
