"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";

const artistSchema = z.object({
  name: z.string().min(3),
  email: z.string().email().optional().or(z.literal("")),
  bio: z.string().optional(),
  profile_image: z.any().optional(),
});

type ArtistFormData = z.infer<typeof artistSchema>;

type ArtistFormProps = {
  onCreated: (artist: { id: number; name: string }) => void;
};

export default function ArtistForm({ onCreated }: ArtistFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ArtistFormData>({
    resolver: zodResolver(artistSchema),
  });

  const onSubmit = async (data: ArtistFormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.email) formData.append("email", data.email);
    if (data.bio) formData.append("bio", data.bio);
    if (data.profile_image?.[0]) {
      formData.append("profile_image", data.profile_image[0]);
    }

    try {
      const res = await api.post("/artists/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onCreated({
        id: res.data.id,           // id en number
        name: res.data.name || "",
      });
    } catch (err: any) {
      console.error("Erreur création artiste :", err.response?.data || err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <label className="block mb-1 font-medium">Nom</label>
        <input {...register("name")} className="w-full border px-3 py-2 rounded" />
        <p className="text-sm text-red-500">{errors.name?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" {...register("email")} className="w-full border px-3 py-2 rounded" />
        <p className="text-sm text-red-500">{errors.email?.message}</p>
      </div>

      <div>
        <label className="block mb-1 font-medium">Bio</label>
        <textarea {...register("bio")} className="w-full border px-3 py-2 rounded" rows={4} />
      </div>

      <div>
        <label className="block mb-1 font-medium">Image de profil</label>
        <input type="file" accept="image/*" {...register("profile_image")} />
      </div>

      <button
        type="submit"
        className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Création..." : "Créer l'artiste"}
      </button>
    </form>
  );
}
