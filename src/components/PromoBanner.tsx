"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface BannerData {
  enabled: boolean;
  text: string;
  link: string;
  linkText: string;
}

const STORAGE_KEY = "promo_banner_dismissed";

export default function PromoBanner({
  onVisibilityChange,
}: {
  onVisibilityChange: (visible: boolean) => void;
}) {
  const [banner, setBanner] = useState<BannerData | null>(null);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) {
      setDismissed(true);
      onVisibilityChange(false);
      return;
    }

    fetch("/api/settings/banner")
      .then((res) => res.json())
      .then((data: BannerData) => {
        setBanner(data);
        if (data.enabled && data.text) {
          onVisibilityChange(true);
        }
      })
      .catch(() => {});
  }, [onVisibilityChange]);

  const handleDismiss = () => {
    setDismissed(true);
    sessionStorage.setItem(STORAGE_KEY, "1");
    onVisibilityChange(false);
  };

  const visible = banner?.enabled && banner?.text && !dismissed;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed top-0 left-0 right-0 z-[160] overflow-hidden"
        >
          <div className="bg-accent text-dark px-4 py-2 text-center text-[0.8rem] font-medium flex items-center justify-center gap-3">
            <span>{banner.text}</span>
            {banner.link && banner.linkText && (
              <Link
                href={banner.link}
                className="underline underline-offset-2 font-semibold hover:opacity-80 transition-opacity"
              >
                {banner.linkText}
              </Link>
            )}
            <button
              onClick={handleDismiss}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:opacity-70 transition-opacity"
              aria-label="Fermer le bandeau"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-current fill-none stroke-2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
