import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-screen bg-background text-foreground font-[family-name:var(--font-geist-sans)]'>
      {children}
    </div>
  );
}
