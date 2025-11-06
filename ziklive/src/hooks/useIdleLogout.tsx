"use client";

import { useAuth } from "@/context/auth_context";
import { useEffect, useRef, useState } from "react";

export function useIdleLogout({
  idleTimeout = 5 * 60 * 1000,
  gracePeriod = 2 * 60 * 1000,
} = {}) {
  const { logout, user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [remaining, setRemaining] = useState(gracePeriod / 1000);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);
  const graceTimer = useRef<NodeJS.Timeout | null>(null);
  const countdownInterval = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (graceTimer.current) clearTimeout(graceTimer.current);
    if (countdownInterval.current) clearInterval(countdownInterval.current);
  };

  const resetIdleTimer = () => {
    clearTimers();
    if (!user) return;

    idleTimer.current = setTimeout(() => {
      setShowModal(true);
      setRemaining(gracePeriod / 1000);

      graceTimer.current = setTimeout(() => {
        logout();
        setShowModal(false);
      }, gracePeriod);

      countdownInterval.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(countdownInterval.current!);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, idleTimeout);
  };

  const handleUserActivity = () => {
    if (!user) return;
    resetIdleTimer();
    if (showModal) setShowModal(false);
  };

  useEffect(() => {
    if (!user) return;

    resetIdleTimer();
    const activityEvents = ["mousemove", "keydown", "mousedown", "touchstart", "scroll"];
    activityEvents.forEach((event) => window.addEventListener(event, handleUserActivity));

    const visibilityHandler = () => {
      if (!document.hidden) {
        handleUserActivity();
      }
    };
    document.addEventListener("visibilitychange", visibilityHandler);

    return () => {
      clearTimers();
      activityEvents.forEach((event) => window.removeEventListener(event, handleUserActivity));
      document.removeEventListener("visibilitychange", visibilityHandler);
    };
  }, [user]);

  const stayActive = () => {
    handleUserActivity();
  };

  const forceLogout = () => {
    clearTimers();
    setShowModal(false);
    logout();
  };

  return { showModal, remaining, stayActive, forceLogout };
}
