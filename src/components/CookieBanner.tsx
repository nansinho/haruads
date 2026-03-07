"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X } from "lucide-react";

const CONSENT_KEY = "hds-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };

  const handleRefuse = () => {
    localStorage.setItem(CONSENT_KEY, "refused");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] p-4 sm:p-6 pointer-events-none">
      <div className="max-w-[520px] mx-auto sm:mx-0 sm:ml-6 pointer-events-auto">
        <div className="bg-dark-2/95 backdrop-blur-2xl border border-white/[0.08] rounded-2xl p-5 shadow-2xl shadow-black/40">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <Cookie size={18} className="text-accent shrink-0" />
              <h3 className="text-white font-medium text-sm">Cookies</h3>
            </div>
            <button
              onClick={handleRefuse}
              className="text-white/30 hover:text-white/60 transition-colors shrink-0"
              aria-label="Fermer"
            >
              <X size={16} />
            </button>
          </div>

          <p className="text-white/50 text-[0.78rem] leading-[1.7] mb-4">
            Ce site utilise des cookies essentiels pour son fonctionnement et des
            cookies fonctionnels pour am&eacute;liorer votre exp&eacute;rience.{" "}
            <Link
              href="/politique-confidentialite"
              className="text-accent hover:underline"
            >
              En savoir plus
            </Link>
          </p>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2.5 bg-accent text-white rounded-full text-[0.78rem] font-medium hover:bg-accent-hover transition-colors"
            >
              Accepter
            </button>
            <button
              onClick={handleRefuse}
              className="flex-1 px-4 py-2.5 bg-white/[0.04] border border-white/[0.08] text-white/70 rounded-full text-[0.78rem] font-medium hover:bg-white/[0.08] transition-colors"
            >
              Refuser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
