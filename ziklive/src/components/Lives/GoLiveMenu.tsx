"use client";

import { useState, useEffect } from "react";
import { Video, Camera, Monitor, ChevronDown } from "lucide-react";
import ClickOutsideHandler from "../common/ClickOutsideHandler";

interface GoLiveMenuProps {
  onSelect: (mode: "camera" | "stream") => void;
}

export default function GoLiveMenu({ onSelect }: GoLiveMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <ClickOutsideHandler onClickOutside={() => setOpen(false)}>
      <div className="relative w-max">
        <button
          className="flex items-center gap-2 bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-full text-white font-semibold transition"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
        >
          <Video size={16} />
          Go Live
          <ChevronDown size={16} />
        </button>

        {open && (
          <div className="absolute left-0 top-full mt-1 w-max bg-white text-black rounded-lg shadow-lg z-50">
            <button
              onClick={() => { setOpen(false); onSelect("camera"); }}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-pink-100"
            >
              <Camera size={16} /> Caméra
            </button>
            <button
              onClick={() => { setOpen(false); onSelect("stream"); }}
              className="w-full flex items-center gap-2 px-4 py-2 hover:bg-pink-100"
            >
              <Monitor size={16} /> Streaming
            </button>
          </div>
        )}
      </div>
    </ClickOutsideHandler>
  );
}
