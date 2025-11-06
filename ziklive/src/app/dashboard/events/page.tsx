"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api";
import Link from "next/link";
import type { EventOutput } from "../events/components/models";
import { eventListSchema } from "../events/components/schemas";
import TicketTypeList from "./components/TicketTypeList";


export default function EventsPage() {
  const [events, setEvents] = useState<EventOutput[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [page, setPage] = useState(1);
  const pageSize = 10;

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`/events/manage?page=${page}&limit=${pageSize}`);

        const eventsData = res.data.results ?? res.data;
        // Validation & parsing avec Zod
        const parsed = eventListSchema.safeParse(eventsData);

        if (!parsed.success) {
          console.error("Validation error:", parsed.error.format());
          setError("Erreur de validation des données.");
          setEvents([]);
        } else {
          setEvents(parsed.data);
        }
      } catch (err) {
        setError("Erreur lors du chargement des événements.");
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [page]);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Mes événements</h1>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-600">{error}</p>}

      {!loading && !error && events.length === 0 && (
        <p>
          Aucun événement trouvé.{" "}
          <Link href="/dashboard/events/create" className="text-purple-600 underline">
            Créez-en un !
          </Link>
        </p>
      )}

      {!loading && events.length > 0 && (
        <>
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Artist</th>
                <th className="p-3 text-left">Titre</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Lieu</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-3">{event.artist?.name}</td>
                  <td className="p-3">{event.title}</td>
                  <td className="p-3">{new Date(event.date).toLocaleDateString()}</td>
                  <td className="p-3">{event.location ?? "—"}</td>
                  <td className="p-3 text-center">
                    <Link
                      href={`/dashboard/events/addTickets?eventId=${event.id}`}
                      className="text-purple-600 hover:underline"
                    >
                      Ajouter tickets
                    </Link>
                  </td>
                </tr>
                 ))}
                
            </tbody>
          </table>
        
          


          <div className="mt-4 flex justify-end gap-2">
            <button
              className="btn-primary disabled:opacity-50"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Précédent
            </button>
            <button
              className="btn-primary disabled:opacity-50"
              onClick={() => setPage((p) => p + 1)}
              disabled={events.length < pageSize}
            >
              Suivant
            </button>
          </div>
          
          {/* <div className="p-6 bg-white rounded shadow"> */}
          <h1 className="text-2xl font-bold mb-4">Mes Tickets</h1>
          
            {/* <h1></h1> */}
            {events.map((event) => (
              <div key={`tickets-${event.id}`} className="mt-6">
                <h3 className="text-lg font-semibold mb-2">
                  Tickets pour <span className="text-purple-700">{event.title}</span>
                </h3>

                <div className="bg-gray-50 p-4 rounded border shadow-sm">
                  <TicketTypeList eventId={event.id} />
                </div>
              </div>
            ))}
          {/* </div> */}
        </>
      )}
    </div>
  );
}
