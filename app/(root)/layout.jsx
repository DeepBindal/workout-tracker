import Navbar from "@/components/Navbar";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";
import {Poppins} from "next/font/google"

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
          className={`${poppins.variable}  antialiased bg-primary-500 text-textColour custom-scrollbar`}
        >
            <Navbar />
            <main className="flex flex-row">
              <Sidebar />
              <section className="flex min-h-screen flex-1 flex-col items-center bg-primary-500 px-6 pb-10 pt-14  max-md:pb-32 sm:px-10">
                <div className="w-full max-w-4xl">{children}</div>
              </section>
            </main>
            {/* <Bottombar /> */}
          <Toaster position="bottom-right" />
        </body>
      </ClerkProvider>
    </html>
  );
}
