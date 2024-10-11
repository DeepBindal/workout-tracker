import { SignedIn, SignOutButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

async function Navbar() {
  return (
    <nav className="bg-zinc-900 text-white sm:py-6 sm:px-8 px-10 py-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo / Brand Name */}
        <Link className="flex gap-2  items-center" href="/">
          <Image src="/assets/workout.svg" alt="logo" height={30} width={30} />
          <h1 className="font-bold text-xl sm:text-2xl">Workout Tracker</h1>
        </Link>

        <div className="flex items-center space-x-4">
          <SignedIn>
            <SignOutButton>
              <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity duration-300">
                <Image
                  src="/assets/logout.svg"
                  alt="logout"
                  height={24}
                  width={24}
                />
                <span>Logout</span>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;