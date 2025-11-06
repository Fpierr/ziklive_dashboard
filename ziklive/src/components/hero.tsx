"use client";
import { motion } from "framer-motion";
import HeroLive from "./Lives/HeroLive";

export default function Hero() {
  return (
    <header 
      className="relative flex flex-col md:flex-row items-center justify-between min-h-screen px-6 md:px-12 text-white hero-clear">
      {/*-- bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-900-- */}

      <motion.div
        className="w-full md:w-1/2 max-w-lg space-y-8 mb-12 md:mb-0"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl  font-extrabold leading-tight drop-shadow-lg">
          ZikLive, la scène Kompa à portée de main !
        </h1>
        <p className="text-base md:text-lg drop-shadow-md">
          Découvrez les meilleurs événements et expériences Kompa avec ZikLive. Suivez vos artistes où que vous soyez.
        </p>

        <form className="flex flex-col sm:flex-row max-w-md gap-4 w-full">
          <input
            title='Entrer votre texte ici pour rechercher par mots clés'
            type="search"
            placeholder="Recherchez un artiste ou événement"
            className="flex-grow rounded-full px-6 py-3 text-black focus:outline-none"
          />
          <button
            title='Appuyez pour lancer votre recherche'
            type="submit"
            className="bg-white text-pink-600 font-semibold rounded-full px-6 py-3 hover:bg-pink-100 transition w-full sm:w-auto"
          >
            Rechercher
          </button>
        </form>

        <div className="flex gap-6 flex-wrap">
          <a
            href="/events"
            className="bg-pink-500 hover:bg-pink-700 rounded-full px-6 py-3 font-semibold shadow-lg transition"
          >
            Voir les événements
          </a>
          <a
            title='Rejoignez notre communauté'
            href="/register"
            className="border border-white rounded-full px-6 py-3 font-semibold hover:bg-pink-700 transition"
          >
            Rejoindre
          </a>
        </div>
      </motion.div>

      {/* Vidéo live YouTube */}
      {/* <div className="w-full md:w-1/2 flex flex-col gap-6">
        <h2 className="text-2xl font-bold mb-4 drop-shadow-lg">Regarder vos événements en temps réel</h2>
        <div className="aspect-video rounded-lg shadow-2xl overflow-hidden">
          <iframe
            //src="https://www.youtube.com/embed/live_stream?channel=UCjShW7lxCxyhp-DQB9r2_ig"
            src="https://www.youtube.com/embed/MaG6b4G2Ffw"
            title="Live Kompa"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div> */}
      <HeroLive/>
    </header>
  );
}
