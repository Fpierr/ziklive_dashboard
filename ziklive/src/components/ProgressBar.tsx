"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({ showSpinner: false, speed: 500 });

export default function ProgressBar() {
  const router = useRouter();
  const pathname = usePathname();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const activeRef = useRef(false);

  // Inject custom styles once
  useEffect(() => {
    if (!document.getElementById("nprogress-custom-style")) {
      const styleEl = document.createElement("style");
      styleEl.id = "nprogress-custom-style";
      styleEl.innerHTML = `
        #nprogress .bar {
          background: #7e22ce !important;
          height: 4px !important;
        }
      `;
      document.head.appendChild(styleEl);
    }
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href]");
      if (
        a instanceof HTMLAnchorElement &&
        a.href.startsWith(location.origin) &&
        !a.getAttribute("target") &&
        !a.href.includes("#") &&
        !e.metaKey && !e.ctrlKey && !e.shiftKey
      ) {
        const clickedPath = new URL(a.href).pathname;

        if (!activeRef.current) {
          NProgress.start();
          activeRef.current = true;
        }

        // If the same link
        if (clickedPath === pathname) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          timeoutRef.current = setTimeout(() => {
            NProgress.done();
            activeRef.current = false;
          }, 500);
        }
      }
    };

    window.addEventListener("click", handleClick, true);
    return () => {
      window.removeEventListener("click", handleClick, true);
    };
  }, [pathname]);

  useEffect(() => {
    // Stop progress if the  pathname change
    if (activeRef.current) {
      NProgress.done();
      activeRef.current = false;
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, [pathname]);

  return null;
}
