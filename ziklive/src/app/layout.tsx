import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar";
import BackgroundWrapper from "../components/BackgroundWrapper";
import { AuthProvider } from "@/context/auth_context";
import ClientLayout from "@/components/ClientLayout";
import ProgressBar from "@/components/ProgressBar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ZikLive",
  description: "Music events and artists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-transparent`}
      >
        <AuthProvider>
          <ProgressBar />
          <Navbar />
          <BackgroundWrapper>
            {/* Client-only for logout auto */}
            <ClientLayout>
              <div className="pt-24">{children}</div> {/* espace navbar */}
            </ClientLayout>
          </BackgroundWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
