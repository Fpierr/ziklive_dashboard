"use client";

import { useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import Modal from "@/components/modal";
import toast from "react-hot-toast";

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

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<TicketType | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchTickets = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get<TicketType[]>(`/tickets/manage-types/?event=${eventId}`);
      setTickets(res.data);
    } catch {
      setError("Erreur lors du chargement des tickets.");
    } finally {
      setLoading(false);
    }
  }, [eventId]);

  useEffect(() => {
    void fetchTickets();
  }, [fetchTickets]);

  const openDeleteModal = (ticket: TicketType) => {
    setTicketToDelete(ticket);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!ticketToDelete) return;
    setDeleting(true);
    try {
      await api.delete(`/tickets/manage-types/${ticketToDelete.id}/`);
      setDeleteModalOpen(false);
      setTicketToDelete(null);
      await fetchTickets();
    } catch {
      toast.error("Échec de suppression du ticket.");
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = (ticket: TicketType) => {
    // TO IMPLEMENT EDIT TICKETS
    toast("En cours de construction !");
  };

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
                <td className="p-2">{ticket.sale_starts.slice(0, 16).replace("T", " ")}</td>
                <td className="p-2">{ticket.sale_ends.slice(0, 16).replace("T", " ")}</td>
                <td className="p-2 text-right space-x-2">
                  <button
                    type="button"
                    className="text-blue-600 hover:underline text-xs"
                    onClick={() => handleEdit(ticket)}
                  >
                    Modifier
                  </button>
                  <button
                    type="button"
                    className="text-red-600 hover:underline text-xs"
                    onClick={() => openDeleteModal(ticket)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal de confirmation suppression */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-2">Confirmer la suppression</h2>
          <p>Voulez-vous vraiment supprimer le ticket &quot;{ticketToDelete?.name}&quot; ?</p>
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 border rounded"
              onClick={() => setDeleteModalOpen(false)}
              disabled={deleting}
            >
              Annuler
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-600 text-white rounded"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting ? "Suppression..." : "Supprimer"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}