import { z } from "zod";


// -------FORMULAIRE --------------

export const eventInputSchema = z.object({
  title: z.string().min(3, "Titre requis"),
  description: z.string().optional(),
  date: z.string().min(1, "Date requise"), // ISO string attendue
  location: z.string().optional(),
  artist_id: z
    .union([z.string(), z.number()])
    .refine(val => val !== "" && val !== null && val !== undefined, {
      message: "Sélection obligatoire de l'artiste",
    }),
  banner: z
    .any()
    .optional(),
});


// ----- ARTIST --------------

export const artistSchema = z.object({
  id: z.union([z.string(), z.number()]),
  name: z.string().min(1),
  //profile_image: z.string().url().optional(),
  // ajout d'autres
});


// ---- API RESPONSE (Lecture depuis le back) ----------

export const eventOutputSchema = z.object({
  id: z.union([z.string(), z.number()]),
  title: z.string(),
  description: z.string().nullable().optional(),
  date: z.string(),
  location: z.string().nullable().optional(),
  artist: artistSchema,
  created_by: z.union([z.string(), z.number()]).optional(),
});


export const eventListSchema = z.array(eventOutputSchema);


// ---- TICKET TYPES --------------

export const ticketTypeSchema = z.object({
  name: z.string().min(2, "Nom requis"),
  price: z.number().min(0, "Prix invalide"),
  quantity: z.number().min(1, "Minimum 1 ticket"),
  sale_starts: z.string(),
  sale_ends: z.string(),
});
