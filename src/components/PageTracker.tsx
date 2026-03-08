"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getSessionId(): string {
  const key = "tracker_sid";
  let sid = sessionStorage.getItem(key);
  if (!sid) {
    sid = crypto.randomUUID();
    sessionStorage.setItem(key, sid);
  }
  return sid;
}

export default function PageTracker() {
  const pathname = usePathname();
  const lastTracked = useRef("");

  useEffect(() => {
    if (!pathname || pathname === lastTracked.current) return;
    if (pathname.startsWith("/admin") || pathname.startsWith("/api") || pathname.startsWith("/auth")) return;

    lastTracked.current = pathname;

    const sessionId = getSessionId();

    try {
      const body = JSON.stringify({
        path: pathname,
        referrer: document.referrer || "",
        sessionId,
      });

      if (navigator.sendBeacon) {
        const blob = new Blob([body], { type: "application/json" });
        navigator.sendBeacon("/api/track", blob);
      } else {
        fetch("/api/track", {
          method: "POST",
          body,
          keepalive: true,
        }).catch(() => {});
      }
    } catch {
      // Silent fail
    }
  }, [pathname]);

  return null;
}
