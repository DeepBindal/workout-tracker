"use client";
import React from "react";
import { sideBarLinks } from "@/lib/constants/index";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const {userId} = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex flex-1 flex-col gap-6 w-full px-6">
        {sideBarLinks?.map((link) => {
          const isActive =
            (pathname.includes(link.route) && link.route.length > 1) ||
            pathname === link.route;
            if(link.route === "/workouts") link.route = `${link.route}/${userId}`
          return (
            <Link href={link.route} key={link.label} className={`leftsidebar_link ${isActive && ("bg-zinc-800 rounded")}`}>
              <Image
                src={link.imgURL}
                alt="link image"
                width={24}
                height={24}
              />
              <p className="text-light-1 max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Sidebar;