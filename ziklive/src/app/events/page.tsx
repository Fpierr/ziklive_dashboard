"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import EventCard from "@/components/EventCard";
import { useEvents } from "@/hooks/events/useEvents";

const PAGE_SIZE = 2;

export default function EventsPage() {
  const { upcomingEvents, pastEvents, loading, error } = useEvents();
  const [query, setQuery] = useState("");
  const [upcomingLimit, setUpcomingLimit] = useState(PAGE_SIZE);
  const [pastLimit, setPastLimit] = useState(PAGE_SIZE);

  const handleReserve = (id: number) =>
    alert(`Réservation pour l'événement ID ${id} ! (backend à implémenter)`);

  const filteredUpcoming = useMemo(
    () =>
      upcomingEvents.filter((e) =>
        e.title.toLowerCase().includes(query.toLowerCase())
      ),
    [upcomingEvents, query]
  );

  const filteredPast = useMemo(
    () =>
      pastEvents.filter((e) =>
        e.title.toLowerCase().includes(query.toLowerCase())
      ),
    [pastEvents, query]
  );

  const cardSizeClasses =
    "w-[clamp(120px,14vw,140px)] h-[clamp(180px,20vw,210px)]";

  return (
    <div className="space-y-16 px-4 sm:px-8">
      {/* Barre de recherche */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="relative w-full sm:w-1/2">
          <Search className="absolute left-3 top-3.5 text-gray-400" size={18} />
          <input
            type="text"
            placeholder="Rechercher un événement..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-sm"
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all">
          <Filter size={16} /> Filtres
        </button>
      </motion.div>

      {/* Événements à venir */}
      <section className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold text-pink-600 dark:text-pink-400 tracking-tight">
            Événements à venir
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Réservez vos places dès maintenant pour vivre des moments uniques.
          </p>
        </motion.div>

        {loading && (
          <p className="text-center text-gray-600 dark:text-gray-400 italic animate-pulse">
            Chargement des événements...
          </p>
        )}
        {error && (
          <p className="text-center text-red-600 dark:text-red-400 font-semibold">
            {error}
          </p>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-3 justify-items-center">
          {filteredUpcoming.slice(0, upcomingLimit).map((event) => (
            <motion.div
              key={event.id}
              whileHover={{
                y: -3,
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0,0,0,0.12)",
              }}
              transition={{ type: "spring", stiffness: 200, damping: 16 }}
              className={cardSizeClasses}
            >
              <EventCard {...event} banner={event.banner_url} onReserve={handleReserve} reservable compact />
            </motion.div>
          ))}
        </div>
        {upcomingLimit < filteredUpcoming.length && (
          <div className="text-center mt-4">
            <button
              onClick={() => setUpcomingLimit(upcomingLimit + PAGE_SIZE)}
              className="px-6 py-2 rounded-xl bg-pink-600 text-white font-semibold hover:bg-pink-700 transition"
            >
              Voir plus
            </button>
          </div>
        )}
      </section>

      <hr className="border-gray-300 dark:border-gray-700 w-2/3 mx-auto" />

      {/* Événements passés */}
      <section className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-gray-100 tracking-tight">
            Événements passés
          </h2>
          <p className="mt-2 text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Revivez les moments forts et performances légendaires de nos artistes.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-x-2 gap-y-3 justify-items-center">
          {filteredPast.slice(0, pastLimit).map((event) => (
            <motion.div
              key={event.id}
              whileHover={{
                y: -2,
                scale: 1.02,
                boxShadow: "0 8px 16px rgba(0,0,0,0.08)",
              }}
              transition={{ type: "spring", stiffness: 180, damping: 15 }}
              className={cardSizeClasses}
            >
              <EventCard {...event} reservable={false} compact />
            </motion.div>
          ))}
        </div>
        {pastLimit < filteredPast.length && (
          <div className="text-center mt-4">
            <button
              onClick={() => setPastLimit(pastLimit + PAGE_SIZE)}
              className="px-6 py-2 rounded-xl bg-gray-800 text-white font-semibold hover:bg-gray-900 transition"
            >
              Voir plus
            </button>
          </div>
        )}
      </section>     
    </div>
    
  );
  
}
