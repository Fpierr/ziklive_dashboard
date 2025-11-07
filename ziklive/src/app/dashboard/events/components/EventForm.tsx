"use client";

import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import api from "@/lib/api";
import Modal from "@/components/modal";
import ArtistForm from "@/components/ArtistForm";
import { eventInputSchema } from "./schemas";
import CitySelect, { City } from "@/components/CitySelect";

type Artist = { id: number; name: string };

export default function EventForm({ onSuccess }: { onSuccess?: () => void }) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof eventInputSchema>>({
    resolver: zodResolver(eventInputSchema),
  });

  const [query, setQuery] = useState("");
  const [filteredArtists, setFilteredArtists] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showArtistModal, setShowArtistModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const bannerFile = watch("banner");

  useEffect(() => {
    const fetchArtists = async () => {
      if (query.length < 2) {
        setFilteredArtists([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const res = await api.get(`/artists/?search=${query}`);
        const data = res.data;
        const artists = Array.isArray(data)
          ? data
          : Array.isArray(data.results)
          ? data.results
          : [];
        setFilteredArtists(artists);
      } catch {
        setFilteredArtists([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchArtists, 300);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: z.infer<typeof eventInputSchema>) => {
    try {
      if (data.date) data.date = new Date(data.date).toISOString();

      const formData = new FormData();
      for (const key of Object.keys(data) as (keyof typeof data)[]) {
        if (key === "banner" && data.banner?.length > 0) {
          formData.append("banner", data.banner[0]);
        } else {
          const value = data[key];
          if (value !== undefined && value !== null) {
            formData.append(key, String(value));
          }
        }
      }


      await api.post("/events/manage/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 bg-white p-6 rounded shadow"
        encType="multipart/form-data"
      >
        {/* Artiste */}
        <div>
          <label className="block text-sm font-medium mb-1">Artiste</label>
          <div className="flex gap-2 items-center">
            <div className="w-full relative" ref={dropdownRef}>
              <div
                className="input cursor-pointer h-10 flex items-center px-3 border rounded"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                {selectedArtist?.name ?? "Sélectionner un artiste..."}
              </div>

              {showDropdown && (
                <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
                  <div className="p-2 relative">
                    <input
                      autoFocus
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Rechercher..."
                      className="input w-full border rounded px-3 py-2"
                    />
                    {loading && (
                      <div className="absolute top-3 right-3 text-sm text-gray-400 animate-pulse">
                        ...
                      </div>
                    )}
                  </div>
                  <ul>
                    {filteredArtists.map((artist) => (
                      <li
                        key={artist.id}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSelectedArtist(artist);
                          setValue("artist_id", artist.id);
                          setShowDropdown(false);
                          setQuery("");
                        }}
                      >
                        {artist.name}
                      </li>
                    ))}
                    {query.length >= 2 && !loading && filteredArtists.length === 0 && (
                      <li className="px-4 py-2 text-gray-400">Aucun artiste trouvé</li>
                    )}
                  </ul>
                </div>
              )}
              <input type="hidden" {...register("artist_id")} />
              {errors.artist_id && (
                <p className="text-sm text-red-500 mt-1">{errors.artist_id.message}</p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowArtistModal(true)}
              className="btn-primary whitespace-nowrap h-10 px-4 rounded"
            >
              + Nouvel artiste
            </button>
          </div>
        </div>

        {/* Titre */}
        <div>
          <label>Titre</label>
          <input {...register("title")} className="input border rounded px-3 py-2 w-full" />
          {errors.title && <p className="text-sm text-red-500">{errors.title.message}</p>}
        </div>

        {/* Date */}
        <div>
          <label>Date</label>
          <input
            type="datetime-local"
            {...register("date")}
            className="input border rounded px-3 py-2 w-full"
          />
          {errors.date && <p className="text-sm text-red-500">{errors.date.message}</p>}
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea {...register("description")} className="input border rounded px-3 py-2 w-full" />
        </div>

        {/* Lieu */}
        <div>
          <label>Lieu</label>
          <CitySelect
            value={selectedCity}
            onChange={(city) => {
              setSelectedCity(city);
              setValue("location", `${city.name}, ${city.countryName}`);
            }}
          />
          <input type="hidden" {...register("location")} />
          {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
        </div>

        {/* Banner upload optionnel */}
        <div>
          <label>Image bannière (optionnel)</label>
          <input
            type="file"
            accept="image/*"
            {...register("banner")}
            className="input border rounded px-3 py-2 w-full"
          />
        </div>

        <button type="submit" className="btn-primary px-6 py-2 rounded mt-4">
          Créer
        </button>
      </form>

      {/* Modal artiste */}
      <Modal open={showArtistModal} onClose={() => setShowArtistModal(false)}>
        <ArtistForm
          onCreated={(artist) => {
            setSelectedArtist(artist);
            setValue("artist_id", artist.id);
            setShowDropdown(false);
            setShowArtistModal(false);
          }}
        />
      </Modal>
    </>
  );
}
