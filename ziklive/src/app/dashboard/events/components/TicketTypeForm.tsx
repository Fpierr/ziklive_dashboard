"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ticketTypeSchema } from "./schemas";
import { z } from "zod";
import axios from "@/lib/api";

type Props = {
  eventId: string;
  onSuccess?: () => void;
};

export default function TicketTypeForm({ eventId, onSuccess }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof ticketTypeSchema>>({
    resolver: zodResolver(ticketTypeSchema),
  });

  const onSubmit = async (data: z.infer<typeof ticketTypeSchema>) => {
    try {
      await axios.post("/tickets/manage-types/", {
        ...data,
        event: eventId,
      });
      onSuccess?.();
    } catch (error) {
      console.error("Erreur création ticket", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label>Nom du ticket</label>
        <input {...register("name")} className="input" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label>Prix (€)</label>
        <input type="number" {...register("price", { valueAsNumber: true })} className="input" />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label>Quantité</label>
        <input type="number" {...register("quantity", { valueAsNumber: true })} className="input" />
        {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity.message}</p>}
      </div>

      <div>
        <label>Début des ventes</label>
        <input type="datetime-local" {...register("sale_starts")} className="input" />
      </div>

      <div>
        <label>Fin des ventes</label>
        <input type="datetime-local" {...register("sale_ends")} className="input" />
      </div>

      <button type="submit" className="btn-primary">
        Ajouter
      </button>
    </form>
  );
}
