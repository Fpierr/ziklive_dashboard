"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchCurrentUser } from "@/lib/fetch_endpoints";
import { User } from "@/types/user";
import { useAuth } from "@/context/auth_context";
import ProfileLayout from "./profile_layout";
import api from "@/lib/api";

export default function ProfilePage() {
  const router = useRouter();
  const { logout } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<{ events: number; tickets: number } | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await fetchCurrentUser();
        if (!data.user) {
          router.push("/login");
          return;
        }
        setUser(data.user);

        const [eventRes, ticketRes] = await Promise.all([
          api.get("/events/manage/"),
          api.get("/tickets/"),
        ]);

        const events = eventRes.data.results ?? eventRes.data;
        const tickets = ticketRes.data.results ?? ticketRes.data;

        setStats({
          events: Array.isArray(events) ? events.length : 0,
          tickets: Array.isArray(tickets) ? tickets.length : 0,
        });

      } catch {
        setError("Erreur lors du chargement des données utilisateur.");
      } finally {
        setLoading(false);
      }
    }
    loadUser();
  }, [router]);

  if (loading) return <div className="p-6 text-center">Chargement...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;

  if (!user) return null;

  return (
    <>
      <header className="bg-white shadow-md py-4 px-6 mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold text-purple-700">Mon Profil</h1>
          <p className="mt-1 text-gray-600">
            Bienvenue, <span className="font-medium">{user.name}</span> !
          </p>
        </div>
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition"
        >
          Aller au Dashboard
        </button>
      </header>

      <ProfileLayout userName={user.name} stats={stats}>
        <section>
          <p><strong>Nom :</strong> {user.name}</p>
          <p><strong>Email :</strong> {user.email}</p>
        </section>

        <button
          onClick={() => logout()}
          className="mt-6 bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded"
        >
          Se déconnecter
        </button>
      </ProfileLayout>
    </>
  );
}
