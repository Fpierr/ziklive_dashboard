"use client";

import IdleLogoutHandler from "@/components/IdleLogoutHandler";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <IdleLogoutHandler />
    </>
  );
}
