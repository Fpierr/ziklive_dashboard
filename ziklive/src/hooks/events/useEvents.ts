"use client";

import { useEffect, useState } from "react";
import apiPublic from "@/lib/apiPublic";
import type { Event, UseEventsResult } from "@/types/event";


export function useEvents(): UseEventsResult {
  const [upcomingEvents, setUpcomingEvents] = useState<Event[]>([]);
  const [pastEvents, setPastEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      setLoading(true);
      setError(null);
      try {
        const [upcomingRes, pastRes] = await Promise.all([
          apiPublic.get<Event[]>("/events/public/"),
          apiPublic.get<Event[]>("/events/public/past/"),
        ]);
        setUpcomingEvents(upcomingRes.data);
        setPastEvents(pastRes.data);
      } catch (err) {
        setError("Échec du chargement des événements.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  return { upcomingEvents, pastEvents, loading, error };
}
