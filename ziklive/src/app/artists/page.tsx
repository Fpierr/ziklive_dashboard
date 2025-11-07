"use client";

import { useEffect, useState } from "react";
import api from "@/lib/apiPublic";
import { BadgeCheck } from "lucide-react";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Artist {
  id: number;
  name: string;
  email: string;
  bio: string;
  profile_image?: string;
  profile_image_url?: string;
  email_verified: boolean;
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await api.get("/artists/");
        setArtists(res.data);
      } catch {
        setError("Échec du chargement des artistes.");
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Chargement des artistes...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center">Artistes</h1>

      {artists.length === 0 ? (
        <p className="text-center">Aucun artiste trouvé.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => (
            <div
              key={artist.id}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow hover:shadow-xl transition"
            >
              {artist.profile_image_url && (
                <Image
                  src={artist.profile_image_url}
                  alt={artist.name}
                  width={400}
                  height={200}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
              )}

              <div className="flex items-center gap-2 mb-2">
                <h2 className="text-xl font-bold">{artist.name}</h2>
                {artist.email_verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <BadgeCheck className="text-green-500 w-5 h-5" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Artiste vérifié</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400">
                {artist.bio}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
