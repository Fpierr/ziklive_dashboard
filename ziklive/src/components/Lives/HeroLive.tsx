"use client";

import { useEffect, useState } from "react";
import { Radio, Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/auth_context";
import GoLiveMenu from "./GoLiveMenu";


interface Live {
  id: string;
  title: string;
  artist: string;
  stream_url: string;
}

export default function HeroLive() {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [showLives, setShowLives] = useState(false);
  const [lives, setLives] = useState<Live[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showLives && lives.length === 0) {
      setLoading(true);
      fetch("/api/lives/active")
        .then(res => res.json())
        .then(data => setLives(data))
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [showLives]);

  const handleGoLive = (mode: "camera" | "stream") => {
    if (mode === "camera") alert("Mode Caméra");
    else alert("Mode Streaming OBS");
  };

  return (
    <div className="w-full md:w-1/2 flex flex-col gap-4">
      {/* Titre + toggle */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold drop-shadow-lg">
          Regarder vos événements en temps réel
        </h2>
      </div>

      <div className='flex items-center gap-4 flex-wrap'>
        {/* Go Live Menu */}
        {isLoggedIn && <GoLiveMenu onSelect={handleGoLive} />}
        <button
          title='Afficher ou masquer les lives'
          onClick={() => setShowLives(!showLives)}
          className={`flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full text-white font-semibold transition ${
            showLives
              ? "bg-pink-600 hover:bg-pink-700 text-white"
              : "bg-pink-600 hover:bg-pink-700 text-white"
          }`}
        >
          <Radio size={16} />
          <span>
            {showLives ? "Hide Live" : "Show Live"}
          </span>
          {showLives ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>

      {/* Contenu principal */}
      {!showLives ? (
        <div className="aspect-video rounded-lg shadow-2xl overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/MaG6b4G2Ffw"
            title="Live Kompa"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
            className="w-full h-full"
          />
        </div>
      ) : loading ? (
        <p className="text-center text-gray-300 py-6 animate-pulse">Chargement des lives...</p>
      ) : lives.length === 0 ? (
        <div className="aspect-video rounded-lg shadow-2xl overflow-hidden bg-gray-800 flex items-center justify-center">
          <p className="text-center text-gray-300">Aucun live en cours pour le moment.</p>
        </div>
      ) : (
        <div className="overflow-x-auto snap-x snap-mandatory flex gap-4 py-2 scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-gray-700">
        {lives.map(live => (
          <div
            key={live.id}
            className="snap-center min-w-full relative flex-shrink-0 rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform duration-200"
          >
            <div className="aspect-video relative">
              <iframe
                src={live.stream_url}
                title={live.title}
                allowFullScreen
                loading="lazy"
                className="w-full h-full rounded-t-xl"
              />
              <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-0.5 rounded-full text-xs font-bold animate-pulse">
                LIVE
              </span>
              <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white p-2">
                <h3 className="font-bold text-sm">{live.title}</h3>
                <p className="text-xs opacity-75">{live.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
}
