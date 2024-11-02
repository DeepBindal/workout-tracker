import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import MobileNav from "./MobileNav";

async function Navbar() {
  return (
    <nav className="bg-secondary-500 text-white py-4 sm:py-6 sm:px-8 px-6 shadow-lg">
      <div className="container mx-auto max-w-7xl flex items-center justify-between">
        {/* Logo / Brand Name */}
        <Link className="flex gap-3 items-center hover:opacity-80 transition-opacity duration-200" href="/">
          <Image src="/assets/workout.svg" alt="logo" height={30} width={30} />
          <h1 className="font-bold text-lg sm:text-2xl tracking-wide">
            ProgressPulse
          </h1>
        </Link>

        <div className="flex items-center space-x-6">
          <SignedIn>
            <UserButton />
            <MobileNav />
          </SignedIn>
          
          <SignedOut>
            <Button asChild className="rounded-full bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white text-sm sm:text-base transition-colors duration-200">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
