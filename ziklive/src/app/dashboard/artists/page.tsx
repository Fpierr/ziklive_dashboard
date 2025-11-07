"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/auth_context";
import { Check } from "lucide-react";

interface Artist {
  id: number | string;
  name: string;
  email?: string;
  bio?: string;
  created_by?: number | string;
}

export default function ArtistListPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    let isMounted = true;
    api
      .get("/artists/")
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : res.data.results;
        if (isMounted) setArtists(data || []);
      })
      .catch((err) => {
        console.error("Erreur chargement artistes:", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Liste des artistes</h1>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200 text-left">
              <th className="p-2 border">Nom</th>
              <th className="p-2 border">Email</th>
              <th className="p-2 border">Bio</th>
              <th className="p-2 border">Créé par moi</th>
            </tr>
          </thead>
          <tbody>
            {artists.map((artist) => (
              <tr key={artist.id} className="border-t">
                <td className="p-2 border font-medium">{artist.name}</td>
                <td className="p-2 border">{artist.email ?? "-"}</td>
                <td className="p-2 border">{artist.bio ?? "-"}</td>
                <td className="p-2 border text-center">
                  {artist.created_by === user?.id && (
                    <Check size={18} className="inline text-green-600" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
