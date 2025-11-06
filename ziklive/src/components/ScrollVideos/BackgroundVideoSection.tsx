"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

const videos = [
  { id: "qppWww9lFfo" },
  { id: "SRncDMwWW8c" },
  { id: "TRH2hh_iEy4" },
  { id: "prd-oyaxhCs" },
  { id: "CJRic7tPuZs" },
  { id: "GLuK7hk9MbU" },
  { id: "jt_TTcmjuq0" },
  { id: "lGOKlCOm5Ho" },
  { id: "uTLfkEVyj4g" },
  { id: "gowHWubKBAw" },
  { id: "KlmGnw8eDus" },
];

function shuffleArray<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export default function BackgroundVideoSection({
  children,
}: {
  children: React.ReactNode;
}) {
  const [videoIndex, setVideoIndex] = useState(0);
  const [videoOrder, setVideoOrder] = useState<string[]>([]);
  const [showPlayer, setShowPlayer] = useState(false);

  useEffect(() => {
    const shuffled = shuffleArray(videos.map((v) => v.id));
    setVideoOrder(shuffled);
  }, []);

  useEffect(() => {
    if (videoOrder.length === 0 || showPlayer) return;
    const interval = setInterval(() => {
      setVideoIndex((prev) => (prev + 1) % videoOrder.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [videoOrder, showPlayer]);

  const currentVideo = videoOrder[videoIndex];

  return (
    <section className="relative w-full overflow-hidden text-center flex flex-col items-center justify-center py-10 sm:py-16 md:py-24">
      {/* FOND VIDEO */}
      {currentVideo && (
        <div className="absolute inset-0 w-full h-full overflow-hidden transition-all duration-1000 ease-in-out">
          <iframe
            key={currentVideo}
            className="absolute top-1/2 left-1/2 min-w-full min-h-full w-auto h-auto transform -translate-x-1/2 -translate-y-1/2 scale-[1.4]"
            src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=1&loop=1&playlist=${currentVideo}&controls=0&modestbranding=1&showinfo=0`}
            title="Vidéo d'arrière-plan"
            allow="autoplay; fullscreen"
          ></iframe>

          <div
            className="absolute inset-0 z-10 bg-black/50 cursor-pointer"
            onClick={() => setShowPlayer(true)}
          />
        </div>
      )}

      {/* OVERLAY + CONTENU */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-9 text-white">
        {children}
      </div>

      {/* LECTURE PLEIN ÉCRAN */}
      {showPlayer && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={() => setShowPlayer(false)}
            className="absolute top-6 right-6 text-white hover:text-neutral-400 transition"
          >
            <X size={28} />
          </button>

          <iframe
            key={`player-${currentVideo}`}
            className="w-full h-full md:w-[90%] md:h-[90%] rounded-lg shadow-lg"
            src={`https://www.youtube.com/embed/${currentVideo}?autoplay=1&mute=0&controls=1&modestbranding=1&rel=0`}
            title="Lecture vidéo"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </section>
  );
}
