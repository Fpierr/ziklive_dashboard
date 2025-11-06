"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function DashboardHome() {
  const [stats, setStats] = useState({ events: 0, tickets: 0, revenue: 0 });

  useEffect(() => {
    async function fetchStats() {
  try {
    const [eventRes, ticketRes] = await Promise.all([
      api.get("/events/manage/"),
      api.get("/tickets/"),
    ]);

    const events = eventRes.data.results ?? eventRes.data;
    const tickets = ticketRes.data.results ?? ticketRes.data;

    setStats({
      events: Array.isArray(events) ? events.length : 0,
      tickets: Array.isArray(tickets) ? tickets.length : 0,
      revenue: Array.isArray(tickets)
        ? tickets.reduce((acc: number, t: { price: number }) => acc + (t.price || 0), 0)
        : 0,
    });
  } catch (err) {
    console.error("Erreur chargement stats", err);
  }
}


    fetchStats();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Événements" value={stats.events} />
        <Card title="Tickets vendus" value={stats.tickets} />
        <Card title="Revenus" value={`${stats.revenue.toLocaleString()} Euros`} />
      </div>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}
