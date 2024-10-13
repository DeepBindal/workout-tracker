"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sideBarLinks } from "@/lib/constants";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Separator } from "./ui/separator";
function MobileNav() {
  const pathname = usePathname();
  const { userId } = useAuth();
  return (
    <div className="md:hidden flex">
      <Sheet>
        <SheetTrigger>
          <Image src="/assets/bars.svg" width={28} height={28} />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold mb-2">ProgressPulse</SheetTitle>
          </SheetHeader>
          <Separator />
          {sideBarLinks?.map((link) => {
            const isActive =
              (pathname.includes(link.route) && link.route.length > 1) ||
              pathname === link.route;
            if (link.route === "/workouts")
              link.route = `${link.route}/${userId}`;
            return (
              <Link
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${
                  isActive && "bg-zinc-800 rounded"
                }`}
              >
                <Image
                  src={link.imgURL}
                  alt="link image"
                  width={24}
                  height={24}
                />
                <p className="text-white ">{link.label}</p>
              </Link>
            );
          })}
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNav;
