"use client";

import { useEffect, useRef, useState } from "react";

export type City = {
  name: string;
  countryName: string;
  lat: string;
  lng: string;
};

export default function CitySelect({
  value,
  onChange,
}: {
  value: City | null;
  onChange: (city: City) => void;
}) {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch GeoNames API
  useEffect(() => {
    if (query.length < 2) return;

    const fetchCities = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://secure.geonames.org/searchJSON?q=${encodeURIComponent(
            query
          )}&maxRows=10&orderby=population&featureClass=P&username=zikl`
        );
        const json = await res.json();
        setCities(json.geonames || []);
      } catch (err) {
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(fetchCities, 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="input cursor-pointer h-10 flex items-center px-3 border rounded"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        {value ? `${value.name}, ${value.countryName}` : "Choisir une ville..."}
      </div>

      {showDropdown && (
        <div className="absolute z-10 mt-1 w-full bg-white border rounded shadow max-h-60 overflow-auto">
          <div className="p-2 relative">
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher une ville..."
              className="input w-full border rounded px-3 py-2"
            />
            {loading && <div className="absolute top-3 right-3 text-sm text-gray-400">...</div>}
          </div>
          <ul>
            {cities.map((city, index) => (
              <li
                key={index}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  onChange(city);
                  setQuery("");
                  setShowDropdown(false);
                }}
              >
                {city.name}, {city.countryName}
              </li>
            ))}
            {query.length >= 2 && !loading && cities.length === 0 && (
              <li className="px-4 py-2 text-gray-400">Aucune ville trouvée</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
