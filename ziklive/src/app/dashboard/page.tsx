"use client";
import { useEffect, useState } from "react";
import api from "@/lib/api";

interface Stats {
  events: number;
  tickets: number;
  revenue: number;
}

export default function DashboardHome() {
  const [stats, setStats] = useState<Stats>({ events: 0, tickets: 0, revenue: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchStats = async () => {
      try {
        const [eventRes, ticketRes] = await Promise.all([
          api.get("/events/manage/"),
          api.get("/tickets/"),
        ]);

        const events = eventRes.data.results ?? eventRes.data;
        const tickets = ticketRes.data.results ?? ticketRes.data;

        if (isMounted) {
          setStats({
            events: Array.isArray(events) ? events.length : 0,
            tickets: Array.isArray(tickets) ? tickets.length : 0,
            revenue: Array.isArray(tickets)
              ? tickets.reduce((acc, t: { price: number }) => acc + (t.price || 0), 0)
              : 0,
          });
          setError(null);
        }
      } catch {
        if (isMounted) {
          setError("Impossible de charger les statistiques. Veuillez réessayer plus tard.");
        }
      }
    };

    void fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Tableau de bord</h1>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card title="Événements" value={stats.events} />
        <Card title="Tickets vendus" value={stats.tickets} />
        <Card title="Revenus" value={`${stats.revenue.toLocaleString()} Euros`} />
      </div>
    </div>
  );
}

interface CardProps {
  title: string;
  value: string | number;
}

function Card({ title, value }: CardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow text-center">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}