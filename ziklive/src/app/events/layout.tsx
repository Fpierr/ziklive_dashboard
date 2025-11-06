"use client";

import React, { ReactNode } from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import getCurrentYear from "@/components/FooterDate";

export default function EventsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-950 dark:to-black">
      {/* HERO */}
      <section className="relative py-20 sm:py-28 overflow-hidden text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-transparent blur-3xl animate-pulse" />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <h1 className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
            Explorez Nos Événements
          </h1>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Des centaines d’expériences musicales et culturelles à travers le monde.
          </p>
        </motion.div>
      </section>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-12">{children}</div>
     {/* FOOTER */}
      <div className='-mt-1'>
        <Footer/>
      </div>
      <footer className="mt-0 py-9 px-6 bg-black hover:bg-gray-900 text-gray-400 text-[10px] text-center text-sm tracking-wide transition-transform duration-500 ease-in-out transform hover:scale-105">
        <p className='text-[12px]'>&copy; { getCurrentYear() } ZikLive. Tous droits réservés.</p>
        <div className="mt-2 flex justify-center text-neutral-500 gap-6">
        </div>
      </footer> 
    </main>
    
  );
}
