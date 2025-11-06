"use client";

import { useEffect, useRef } from "react";

type ClickOutsideHandlerProps = {
  onClickOutside: () => void;
  children: React.ReactNode;
};

export default function ClickOutsideHandler({
  onClickOutside,
  children,
}: ClickOutsideHandlerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClickOutside();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClickOutside]);

  return <div ref={wrapperRef}>{children}</div>;
}
