"use client";
import { useSearchParams } from "next/navigation";
import TicketTypeForm from "../components/TicketTypeForm";
import { useRouter } from "next/navigation";

export default function AddTicketsPage() {
  const searchParams = useSearchParams();
  const eventId = searchParams.get("eventId");
  const router = useRouter();

  if (!eventId) {
    return <p className="text-red-500">Paramètre `eventId` requis dans l’URL</p>;
  }

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Ajouter des tickets</h2>
      <TicketTypeForm
        eventId={eventId}
        onSuccess={() => router.push("/dashboard/tickets")}
      />
    </div>
  );
}
