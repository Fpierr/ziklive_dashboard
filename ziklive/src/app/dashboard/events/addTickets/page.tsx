"use client";

import { useSearchParams, useRouter } from "next/navigation";
import TicketTypeForm from "../components/TicketTypeForm";

export default function AddTicketsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const eventId = searchParams?.get("eventId");

  if (!eventId) {
    return <p className="text-red-500">Paramètre `eventId` requis dans l’URL</p>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ajouter des tickets</h2>
      <TicketTypeForm
        eventId={eventId}
        onSuccess={() => void router.push("/dashboard/tickets")}
      />
    </div>
  );
}
