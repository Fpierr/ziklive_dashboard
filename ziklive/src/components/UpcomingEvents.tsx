"use client";

import React, { useState } from "react";
import EventCard from "./EventCard";
import { useEvents } from "@/hooks/events/useEvents";
import { useReservation } from "@/hooks/events/useReservation";

export default function UpcomingEvents() {
  const { upcomingEvents, loading, error } = useEvents();
  const { reserveEvent, isReserving } = useReservation();



  if (loading)
    return (
      <p className="text-center text-gray-400 text-sm">
        Chargement des événements...
      </p>
    );

  if (error)
    return (
      <p className="text-center text-red-500 text-sm">{error}</p>
    );

  if (upcomingEvents.length === 0)
    return (
      <p className="text-center text-gray-400 text-sm">
        Aucun événement à venir.
      </p>
    );

  return (
    <div className="w-full overflow-x-auto scrollbar-hide">
      <div
        className="flex flex-nowrap gap-3 px-4 py-6"
        style={{ scrollSnapType: "x mandatory", overflow: "visible" }}
      >
        {upcomingEvents.map((event) => (
          <div
            key={event.id}
            className="
              flex-shrink-5 cursor-pointer transition-transform duration-500 
              hover:scale-105 hover:z-10 hover:shadow-xl
            "
            style={{ width: 220 }}
          >
            <EventCard
              {...event}
              onReserve={reserveEvent}
              reservable
              compact
              disabled={isReserving(event.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
