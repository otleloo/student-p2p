"use client";


import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/Footer";
import { AuthProvider } from "@/components/SessionProvider";
import { Toaster } from "sonner";
import { usePathname } from "next/navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata is not allowed in client components, so we'll remove it or handle it differently if needed.
// For now, I'll comment it out as it's not directly related to the task of conditional rendering.
// export const metadata: Metadata = {
//   title: "P2P Learning Platform",
//   description: "Connect with fellow students, create and book courses, and share resources in a centralized hub.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showFooter = !pathname.startsWith("/dashboard");

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
          {showFooter && <Footer />}
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}