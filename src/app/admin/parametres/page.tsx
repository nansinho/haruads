"use client";

import { useState, useEffect } from "react";
import {
  Settings,
  Globe,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Linkedin,
  Twitter,
  Monitor,
  Save,
  CheckCircle,
  Loader2,
  Palette,
  RotateCcw,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import { applyTheme } from "@/components/ThemeProvider";
import { DEFAULT_THEME } from "@/lib/theme";
import { deriveDarkPalette, deriveAccentPalette } from "@/lib/colors";

interface SettingsData {
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  maintenanceMode: boolean;
  googleAnalyticsId: string;
  themeDark: string;
  themeAccent: string;
}

const defaultSettings: SettingsData = {
  siteName: "HaruAds",
  siteDescription: "Agence de communication digitale specialisee en creation de sites web et marketing digital",
  contactEmail: "contact@haruads.com",
  contactPhone: "+33 1 23 45 67 89",
  contactAddress: "123 Rue de la Paix, 75001 Paris, France",
  instagram: "https://instagram.com/haruads",
  linkedin: "https://linkedin.com/company/haruads",
  twitter: "https://x.com/haruads",
  maintenanceMode: false,
  googleAnalyticsId: "G-XXXXXXXXXX",
  themeDark: DEFAULT_THEME.dark,
  themeAccent: DEFAULT_THEME.accent,
};

function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 ${
        checked ? "bg-accent" : "bg-white/10"
      }`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

export default function ParametresPage() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  // Load theme from API on mount
  useEffect(() => {
    fetch("/api/settings/theme")
      .then((res) => res.json())
      .then((data) => {
        if (data.colors) {
          setSettings((prev) => ({
            ...prev,
            themeDark: data.colors.dark,
            themeAccent: data.colors.accent,
          }));
        }
      })
      .catch(() => {});
  }, []);

  // Live preview: apply theme whenever colors change
  useEffect(() => {
    applyTheme({ dark: settings.themeDark, accent: settings.themeAccent });
  }, [settings.themeDark, settings.themeAccent]);

  const updateSetting = <K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
    setSaveError("");
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError("");
    try {
      const res = await fetch("/api/settings/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dark: settings.themeDark,
          accent: settings.themeAccent,
        }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erreur lors de la sauvegarde");
      }
      // Update localStorage cache so ThemeProvider picks it up
      try {
        localStorage.setItem(
          "site-theme",
          JSON.stringify({ dark: settings.themeDark, accent: settings.themeAccent })
        );
      } catch {
        // Ignore
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setSaving(false);
    }
  };

  const darkPalette = deriveDarkPalette(settings.themeDark);
  const accentPalette = deriveAccentPalette(settings.themeAccent);

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Paramètres"
          subtitle="Configuration generale du site"
          icon={<Settings size={24} />}
          actions={
            <button
              onClick={handleSave}
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover transition-all text-sm shadow-lg shadow-accent/20 disabled:opacity-50"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : saved ? (
                <CheckCircle size={16} />
              ) : (
                <Save size={16} />
              )}
              {saving ? "Enregistrement..." : saved ? "Enregistre !" : "Enregistrer"}
            </button>
          }
        />
      </AnimatedSection>

      {/* Apparence */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-accent/10 rounded-xl">
              <Palette size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-text-primary">Apparence</h2>
              <p className="text-sm text-text-muted">Couleurs du site (preview en temps reel)</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Background color */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Fond (arriere-plan)
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="color"
                  value={settings.themeDark}
                  onChange={(e) => updateSetting("themeDark", e.target.value)}
                  className="w-12 h-10 rounded-lg border border-white/[0.06] cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
                />
                <input
                  type="text"
                  value={settings.themeDark}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) updateSetting("themeDark", v);
                  }}
                  className="w-28 px-3 py-2.5 bg-dark border border-white/[0.06] rounded-xl text-text-primary font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="#0a0a0a"
                />
                <div className="flex items-center gap-1.5 ml-2">
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10"
                    style={{ background: darkPalette.dark }}
                    title="dark"
                  />
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10"
                    style={{ background: darkPalette.dark2 }}
                    title="dark-2"
                  />
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10"
                    style={{ background: darkPalette.dark3 }}
                    title="dark-3"
                  />
                </div>
              </div>
              <p className="text-xs text-text-muted mt-2">
                Les variantes (dark-2, dark-3) sont calculees automatiquement
              </p>
            </div>

            {/* Accent color */}
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-3">
                Accent (couleur principale)
              </label>
              <div className="flex items-center gap-3 flex-wrap">
                <input
                  type="color"
                  value={settings.themeAccent}
                  onChange={(e) => updateSetting("themeAccent", e.target.value)}
                  className="w-12 h-10 rounded-lg border border-white/[0.06] cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
                />
                <input
                  type="text"
                  value={settings.themeAccent}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (/^#[0-9a-fA-F]{0,6}$/.test(v)) updateSetting("themeAccent", v);
                  }}
                  className="w-28 px-3 py-2.5 bg-dark border border-white/[0.06] rounded-xl text-text-primary font-mono text-sm focus:outline-none focus:ring-2 focus:ring-accent/50"
                  placeholder="#f97316"
                />
                <div className="flex items-center gap-1.5 ml-2">
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10"
                    style={{ background: accentPalette.accent }}
                    title="accent"
                  />
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10"
                    style={{ background: accentPalette.accentHover }}
                    title="accent-hover"
                  />
                  <div
                    className="w-8 h-8 rounded-lg border border-white/10"
                    style={{ background: accentPalette.cyan }}
                    title="cyan"
                  />
                </div>
              </div>
              <p className="text-xs text-text-muted mt-2">
                Les variantes (hover, dim, cyan) sont calculees automatiquement
              </p>
            </div>

            {/* Reset */}
            <button
              type="button"
              onClick={() => {
                updateSetting("themeDark", DEFAULT_THEME.dark);
                updateSetting("themeAccent", DEFAULT_THEME.accent);
              }}
              className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-text-secondary transition-colors"
            >
              <RotateCcw size={14} />
              Reinitialiser les couleurs par defaut
            </button>
          </div>

          {saveError && (
            <div className="mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {saveError}
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* General */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-accent/10 rounded-xl">
              <Globe size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-text-primary">General</h2>
              <p className="text-sm text-text-muted">Informations generales du site</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Nom du site
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => updateSetting("siteName", e.target.value)}
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Description
              </label>
              <input
                type="text"
                value={settings.siteDescription}
                onChange={(e) => updateSetting("siteDescription", e.target.value)}
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Contact */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-accent/10 rounded-xl">
              <Phone size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-text-primary">Contact</h2>
              <p className="text-sm text-text-muted">Coordonnees de contact</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <span className="flex items-center gap-2">
                  <Mail size={14} className="text-text-muted" />
                  Email
                </span>
              </label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => updateSetting("contactEmail", e.target.value)}
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <span className="flex items-center gap-2">
                  <Phone size={14} className="text-text-muted" />
                  Telephone
                </span>
              </label>
              <input
                type="tel"
                value={settings.contactPhone}
                onChange={(e) => updateSetting("contactPhone", e.target.value)}
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <span className="flex items-center gap-2">
                  <MapPin size={14} className="text-text-muted" />
                  Adresse
                </span>
              </label>
              <input
                type="text"
                value={settings.contactAddress}
                onChange={(e) => updateSetting("contactAddress", e.target.value)}
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Social Media */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-accent/10 rounded-xl">
              <Instagram size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-text-primary">Reseaux Sociaux</h2>
              <p className="text-sm text-text-muted">Liens vers vos reseaux sociaux</p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <span className="flex items-center gap-2">
                  <Instagram size={14} className="text-pink-400" />
                  Instagram
                </span>
              </label>
              <input
                type="url"
                value={settings.instagram}
                onChange={(e) => updateSetting("instagram", e.target.value)}
                placeholder="https://instagram.com/..."
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <span className="flex items-center gap-2">
                  <Linkedin size={14} className="text-blue-400" />
                  LinkedIn
                </span>
              </label>
              <input
                type="url"
                value={settings.linkedin}
                onChange={(e) => updateSetting("linkedin", e.target.value)}
                placeholder="https://linkedin.com/company/..."
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                <span className="flex items-center gap-2">
                  <Twitter size={14} className="text-text-secondary" />
                  Twitter / X
                </span>
              </label>
              <input
                type="url"
                value={settings.twitter}
                onChange={(e) => updateSetting("twitter", e.target.value)}
                placeholder="https://x.com/..."
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* System */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-accent/10 rounded-xl">
              <Monitor size={20} className="text-accent" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-text-primary">Systeme</h2>
              <p className="text-sm text-text-muted">Configuration technique</p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <label className="block text-sm font-medium text-text-secondary">
                  Mode maintenance
                </label>
                <p className="text-xs text-text-muted mt-1">
                  Activer le mode maintenance rend le site inaccessible aux visiteurs
                </p>
              </div>
              <Toggle
                checked={settings.maintenanceMode}
                onChange={(val) => updateSetting("maintenanceMode", val)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                Google Analytics ID
              </label>
              <input
                type="text"
                value={settings.googleAnalyticsId}
                onChange={(e) => updateSetting("googleAnalyticsId", e.target.value)}
                placeholder="G-XXXXXXXXXX"
                className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
              />
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Bottom save button */}
      <AnimatedSection>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50"
          >
            {saving ? (
              <Loader2 size={16} className="animate-spin" />
            ) : saved ? (
              <CheckCircle size={16} />
            ) : (
              <Save size={16} />
            )}
            {saving ? "Enregistrement..." : saved ? "Enregistre !" : "Enregistrer les modifications"}
          </button>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
