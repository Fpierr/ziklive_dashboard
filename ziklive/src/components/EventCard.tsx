"use client";

import { useState } from "react";
import { ImageOff } from "lucide-react";


interface Artist {
  id: number;
  name: string;
  profile_image?: string;
  profile_image_url?: string;
}

interface EventCardProps {
  id: number;
  title: string;
  date: string;
  location: string;
  banner?: string;
  artist: Artist;
  onReserve?: (id: number) => void;
  reservable?: boolean;
  compact?: boolean;
  disabled?: boolean;
}

export default function EventCard({
  id,
  title,
  date,
  location,
  banner,
  artist,
  onReserve,
  reservable = false,
  compact = false,
  disabled = false,
}: EventCardProps) {
  const [imgError, setImgError] = useState(false);
  const [bannerError, setBannerError] = useState(false);

  const formattedDate = new Date(date).toLocaleDateString("fr-FR", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const fallbackInitial = artist.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 1)
    .toUpperCase();

  const profileImg = artist.profile_image_url || artist.profile_image;
  return (
    <article
      className={`
        rounded-xl overflow-hidden shadow-md border transition-all duration-300 backdrop-blur-sm
        bg-white dark:bg-gray-900 hover:shadow-lg
        flex flex-col
        w-[clamp(120px,12vw,140px)] 
        h-[clamp(180px,18vw,210px)]
        text-[10px] sm:text-[11px]
      `}
    >
      {/* IMAGE / BANNIÈRE */}
      <div className="w-full h-[40%] overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
        {banner && !bannerError ? (
          <img
            src={banner}
            alt={`Bannière de ${title}`}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setBannerError(true)}
          />
        ) : (
          <ImageOff className="w-6 h-6 text-gray-400" />
        )}
      </div>

      {/* CONTENU */}
      <div className="flex flex-col p-2 flex-1 justify-between">
        <div className="space-y-1">
          <h3 className="font-semibold text-black font-bold truncate text-[0.8rem]">{title}</h3>
          <time className="text-gray-500 text-[8px]" dateTime={date}>
            {formattedDate}
          </time>
          <p className="truncate text-gray-600 dark:text-gray-400 text-[8px]">
            {location}
          </p>
          <div className="flex items-center gap-1 text-[8px]">
            {!imgError && profileImg ? (
              <img
                src={profileImg}
                alt={`Photo de ${artist.name}`}
                className="rounded-full w-5 h-5 object-cover border"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center w-5 h-5 text-[0.6rem] font-semibold text-white">
                {fallbackInitial || <ImageOff className="w-3 h-3" />}
              </div>
            )}
            <span className="truncate text text-gray-600 text-[11px] ">{artist.name}</span>
          </div>
        </div>

        {/* BOUTON */}
        {reservable ? (
          <button
            onClick={() => onReserve?.(id)}
            disabled={disabled}
            className={`mt-1 rounded bg-pink-600 text-white hover:bg-pink-700 transition text-[0.7rem] py-1 ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {disabled ? "En cours..." : "Réserver"}
          </button>
        ) : (
          <span className="italic text-gray-500 text-[0.7rem]">Réservation clôturée</span>
        )}
      </div>
    </article>
  );
}


