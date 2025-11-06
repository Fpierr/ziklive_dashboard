"use client";

import React, { ReactNode } from "react";

interface ProfileLayoutProps {
  children: ReactNode;
  userName: string;
  stats: { events: number; tickets: number } | null;
}

export default function ProfileLayout({ children, userName, stats }: ProfileLayoutProps) {
  return (
    <main className="max-w-5xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      <aside className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center mb-4">
            <span className="text-purple-500 text-4xl font-bold">{userName.charAt(0)}</span>
          </div>
          <h2 className="text-xl font-semibold">{userName}</h2>
          <p className="text-gray-500">Membre ZikLive</p>
        </div>
      </aside>

      <section className="md:col-span-2 space-y-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Informations Utilisateur</h3>
          {children}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-200 pb-2">Statistiques</h3>
          {stats ? (
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>Événements créés : {stats.events}</li>
              <li>Tickets vendus : {stats.tickets}</li>
            </ul>
          ) : (
            <p className="text-gray-500">Pas de statistiques disponibles.</p>
          )}
        </div>
      </section>
    </main>
  );
}
