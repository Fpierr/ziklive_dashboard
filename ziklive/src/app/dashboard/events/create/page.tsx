"use client";
import EventForm from "../components/EventForm";
import { useRouter } from "next/navigation";

export default function CreateEventPage() {
  const router = useRouter();

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Créer un événement</h2>
      <EventForm onSuccess={() => router.push("/dashboard/events")} />
    </div>
  );
}
