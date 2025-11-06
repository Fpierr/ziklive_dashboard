"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { TicketType } from "../events/components/models";

export default function TicketsPage() {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.get("/tickets/sold-tickets")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results || [];
        setTickets(data);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des tickets.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Types de billets</h1>
      {tickets.length === 0 ? (
        <p>Aucun ticket trouvé.</p>
      ) : (
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Nom</th>
              <th className="p-2 text-left">Prix</th>
              <th className="p-2 text-left">Quantité</th>
              <th className="p-2 text-left">Début vente</th>
              <th className="p-2 text-left">Fin vente</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t border-gray-200">
                <td className="p-2">{ticket.name}</td>
                <td className="p-2">{ticket.price} €</td>
                <td className="p-2">{ticket.quantity}</td>
                <td className="p-2">{new Date(ticket.sale_starts).toLocaleString()}</td>
                <td className="p-2">{new Date(ticket.sale_ends).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
