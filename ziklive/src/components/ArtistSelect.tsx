"use client";

import { useEffect, useState } from "react";
import axios from "@/lib/api";

type Artist = {
  id: string;
  name: string;
};

type Props = {
  value: string;
  onChange: (id: string) => void;
  onCreateArtist: (artist: Artist) => void;
};

export default function ArtistSelect({ value, onChange, onCreateArtist }: Props) {
  const [search, setSearch] = useState("");
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArtists = async () => {
      if (search.length < 2) {
        setFilteredArtists([]);
        return;
      }

      setLoading(true);
      try {
        const res = await axios.get(`/artists/?search=${search}`);
        const data = res.data;
        const artists = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];

        setFilteredArtists(artists);
      } catch (err) {
        console.error("Erreur recherche artistes", err);
        setFilteredArtists([]);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchArtists, 300);
    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="relative">
      <input
        type="text"
        className="input w-full"
        placeholder="Rechercher un artiste..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {loading && (
        <div className="absolute top-2 right-3 text-sm text-gray-400 animate-pulse">
          ...
        </div>
      )}
      {filteredArtists.length > 0 && (
        <ul className="border rounded mt-1 bg-white shadow max-h-40 overflow-auto z-10 absolute w-full">
          {filteredArtists.map((artist) => (
            <li
              key={artist.id}
              onClick={() => {
                onChange(artist.id);
                setSearch(artist.name);
                setFilteredArtists([]);
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {artist.name}
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        onClick={() => onCreateArtist({ id: "", name: search })}
        className="text-sm text-blue-600 mt-1"
      >
        + Créer un nouvel artiste
      </button>
    </div>
  );
}
