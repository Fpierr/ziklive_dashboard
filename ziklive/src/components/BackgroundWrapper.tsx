"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";

export default function BackgroundWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const withImageBackground = ["/", "/login", "/signup"].includes(pathname);

  return (
    <div
      className={`min-h-screen ${
        withImageBackground ? "text-white" : "bg-white text-black"
      }`}
      style={
        withImageBackground
          ? {
              backgroundImage: "url('/imgbg.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }
          : {}
      }
    >
      {children}
    </div>
  );
}
