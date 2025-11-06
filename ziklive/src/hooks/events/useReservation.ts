"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import api from "@/lib/api";

export function useReservation() {
  const [reservingId, setReservingId] = useState<number | null>(null);

  const reserveEvent = async (eventId: number) => {
    setReservingId(eventId);
    try {
      await api.post("/booking", { eventId });
      toast.success("Réservation réussie !");
    } catch (error) {
      console.error(error);
      toast.error("Erreur lors de la réservation.");
    } finally {
      setReservingId(null);
    }
  };

  return {
    reserveEvent,
    reservingId,
    isReserving: (id: number) => reservingId === id,
  };
}
