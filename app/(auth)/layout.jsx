import React from "react";

import { ClerkProvider } from "@clerk/nextjs";
// import { dark } from "@clerk/themes";
// import localFont from "next/font/local";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

import "../globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "Auth",
  description: "Authentication for workout tracker app",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
    //   appearance={{
    //     baseTheme: dark,
    //   }}
    >
      <html lang="en">
        <body className={`bg-black text-gray-200`}>
          <div className="w-full flex justify-center items-center min-h-screen">
          {children}
          </div>
          <Toaster position="bottom-right"/>
          </body>
      </html>
    </ClerkProvider>
  );
}