import Navbar from "@/components/Navbar";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import localFont from "next/font/local";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import Bottombar from "@/components/Bottombar";
import { ThemeProvider } from "@/components/theme-provider";
import {Poppins} from "next/font/google"
import { icons } from "lucide-react";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ['latin'], 
  weight: ['300', '400', '500', '900'],
});

export const metadata = {
  title: "ProgressPulse",
  description:
    "This is workout tracker & logger allowing you to track and log your progress in the gym",
    icons: {
      icon: "/assets/workout.svg"
    }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body
          className={`${poppins.variable}  antialiased bg-black text-gray-200 custom-scrollbar`}
        >
          <ThemeProvider attribute="class" defaultTheme="dark">
            <Navbar />
            <main className="flex flex-row">
              <Sidebar />
              <section className="flex min-h-screen flex-1 flex-col items-center bg-black px-6 pb-10 pt-14  max-md:pb-32 sm:px-10">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
            </main>
            {/* <Bottombar /> */}
          </ThemeProvider>
          <Toaster position="bottom-right" />
        </body>
      </ClerkProvider>
    </html>
  );
}
