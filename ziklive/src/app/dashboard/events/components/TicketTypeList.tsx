"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

interface TicketType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  sale_starts: string;
  sale_ends: string;
}

interface Props {
  eventId: string | number;
}

export default function TicketTypeList({ eventId }: Props) {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/tickets/manage-types/?event=${eventId}`);
      setTickets(res.data);
    } catch (err) {
      setError("Erreur lors du chargement des tickets.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ticketId: string) => {
    if (!confirm("Supprimer ce ticket ?")) return;
    try {
      await api.delete(`/tickets/manage-types/${ticketId}/`);
      fetchTickets();
    } catch (err) {
      alert("Échec de suppression.");
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [eventId]);

  return (
    <div className="mt-2 mb-6 px-4 py-3 bg-gray-50 border rounded shadow-sm">
      <h4 className="text-md font-semibold mb-2 text-gray-800">Tickets mis en vente</h4>

      {loading && <p className="text-gray-500">Chargement des tickets...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && tickets.length === 0 && (
        <p className="text-sm text-gray-500 italic">Aucun ticket pour cet événement.</p>
      )}

      {tickets.length > 0 && (
        <table className="w-full text-sm border mt-2">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-2">Nom</th>
              <th className="p-2">Prix</th>
              <th className="p-2">Quantité</th>
              <th className="p-2">Début vente</th>
              <th className="p-2">Fin vente</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id} className="border-t">
                <td className="p-2">{ticket.name}</td>
                <td className="p-2">{ticket.price} €</td>
                <td className="p-2">{ticket.quantity}</td>
                <td className="p-2">{ticket.sale_starts?.slice(0, 16).replace("T", " ")}</td>
                <td className="p-2">{ticket.sale_ends?.slice(0, 16).replace("T", " ")}</td>
                <td className="p-2 text-right space-x-2">
                  <button
                    className="text-blue-600 hover:underline text-xs"
                    onClick={() => alert("TODO: implémenter modification")}
                  >
                    Modifier
                  </button>
                  <button
                    className="text-red-600 hover:underline text-xs"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
