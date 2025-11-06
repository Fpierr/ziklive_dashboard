'use client';

import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Autoplay, Keyboard  } from 'swiper/modules';

const videos = [
  { id: 'qppWww9lFfo', artist: 'Artiste 1' },
  { id: 'SRncDMwWW8c', artist: 'Artiste 2' },
  { id: 'TRH2hh_iEy4', artist: 'Artiste 3' },
  { id: 'CJRic7tPuZs', artist: 'Artiste 4' },
  { id: 'GLuK7hk9MbU', artist: 'Artiste 5' },
  { id: 'jt_TTcmjuq0', artist: 'Artiste 6' },
  { id: 'uTLfkEVyj4g', artist: 'Artiste 7' },
  { id: 'Y8vbbLAEVIw', artist: 'Artiste 8' },
  { id: 'prd-oyaxhCs', artist: 'Artiste 9' },
  { id: 'gowHWubKBAw', artist: 'Artiste 10' },
  { id: 'B4aai0t17WU', artist: 'Artiste 11' },
  { id: 'jonBwEw3Qgw', artist: 'Artiste 12' },
  { id: 'CgQhZ3exA4w', artist: 'Artiste 13' },
  { id: '8E7ccA0niQk', artist: 'Artiste 14' },
  { id: 'bqP30vEiepI', artist: 'Artiste 15' },
  { id: '3WHicAXx9nY', artist: 'Artiste 16' },
  { id: 'apMoR-CDkCA', artist: 'Artiste 17' },
  { id: 't5fznAhBisA', artist: 'Artiste 18' },
  { id: 'KlmGnw8eDus', artist: 'Artiste 19' },
];

export default function ArtistCarousel() {
  const [YTReady, setYTReady] = useState(false);
  const playersRef = useRef({});
  const swiperRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(null);
  const autoplayRef = useRef(true);

  // Load YouTube API
  useEffect(() => {
    if (window.YT && window.YT.Player) {
      setYTReady(true);
      return;
    }
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    window.onYouTubeIframeAPIReady = () => {
      setYTReady(true);
    };
    document.body.appendChild(tag);
    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  useEffect(() => {
    if (!YTReady) return;

    videos.forEach(({ id }) => {
      if (playersRef.current[id]) return;

      playersRef.current[id] = new window.YT.Player(id, {
        events: {
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              setActiveVideo(null);
              autoplayRef.current = true;
              swiperRef.current?.autoplay.start();
            }
            else if (event.data === window.YT.PlayerState.PAUSED) {
            }
            else if (event.data === window.YT.PlayerState.PLAYING) {
              autoplayRef.current = false;
              swiperRef.current?.autoplay.stop();
            }
          },
        },
      });
    });


    return () => {
      Object.values(playersRef.current).forEach((player) => {
        if (player && player.destroy) player.destroy();
      });
      playersRef.current = {};
    };
  }, [YTReady]);


  function playVideo(id) {
    Object.entries(playersRef.current).forEach(([key, player]) => {
      if (key === id) {
        player.playVideo();
        setActiveVideo(id);
        autoplayRef.current = false;
        swiperRef.current?.autoplay.stop();
      } else {
        player.pauseVideo();
      }
    });
  }

  return (
    <div className="w-full max-w-7xl mx-auto relative">
      <Swiper
        modules={[Navigation, Autoplay, Keyboard ]}
        spaceBetween={20}
        navigation
        speed={400}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        keyboard={{ enabled: true }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            slidesPerGroup: 1,
          },
          640: { 
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1024: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        {videos.map(({ id, artist }) => (
          <SwiperSlide key={id} className="rounded-lg overflow-hidden shadow-lg relative">
            <iframe
              id={id}
              src={`https://www.youtube.com/embed/${id}?enablejsapi=1&version=3&playerapiid=ytplayer&controls=1&rel=0`}
              title={`Vidéo de ${artist}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full aspect-video border-0"
              style={{ pointerEvents: activeVideo === id ? 'auto' : 'none' }} // interaction uniquement sur vidéo active
            />
            {activeVideo !== id && (
              <button
                onClick={() => playVideo(id)}
                className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg font-bold cursor-pointer"
                aria-label={`Lire la vidéo de ${artist}`}
              >
              </button>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
