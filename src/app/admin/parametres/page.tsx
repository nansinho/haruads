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
  Key,
  Eye,
  EyeOff,
  Trash2,
  ShieldCheck,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";
import { useToast } from "@/components/admin/Toast";
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
  siteName: "",
  siteDescription: "",
  contactEmail: "",
  contactPhone: "",
  contactAddress: "",
  instagram: "",
  linkedin: "",
  twitter: "",
  maintenanceMode: false,
  googleAnalyticsId: "",
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

interface ApiKeyState {
  configured: boolean;
  masked: string;
  inputValue: string;
  saving: boolean;
  visible: boolean;
}

const API_KEYS_CONFIG = [
  {
    key: "anthropic_api_key",
    label: "Anthropic (Claude)",
    placeholder: "sk-ant-api03-...",
    description: "Utilisee pour le generateur de blog IA",
  },
  {
    key: "openai_api_key",
    label: "OpenAI",
    placeholder: "sk-...",
    description: "Utilisee pour les outils IA complementaires",
  },
  {
    key: "google_site_verification",
    label: "Google Search Console",
    placeholder: "Code de verification Google",
    description: "Meta tag de verification pour Google Search Console",
  },
];

export default function ParametresPage() {
  const [settings, setSettings] = useState<SettingsData>(defaultSettings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loadingSettings, setLoadingSettings] = useState(true);
  const [saveError, setSaveError] = useState("");
  const [apiKeys, setApiKeys] = useState<Record<string, ApiKeyState>>({});
  const { toast } = useToast();

  // Fetch settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("Erreur");
        const json = await res.json();

        // The API returns an array of {key, value} objects. Convert to flat object
        const data = Array.isArray(json) ? json : json.data || [];
        const flat: Record<string, string> = {};
        data.forEach((item: { key: string; value: string | null }) => {
          flat[item.key] = item.value || "";
        });

        setSettings({
          siteName: flat.siteName || flat.site_name || "",
          siteDescription: flat.siteDescription || flat.site_description || "",
          contactEmail: flat.contactEmail || flat.contact_email || "",
          contactPhone: flat.contactPhone || flat.contact_phone || "",
          contactAddress: flat.contactAddress || flat.contact_address || "",
          instagram: flat.instagram || "",
          linkedin: flat.linkedin || "",
          twitter: flat.twitter || "",
          maintenanceMode: flat.maintenanceMode === "true" || flat.maintenance_mode === "true",
          googleAnalyticsId: flat.googleAnalyticsId || flat.google_analytics_id || "",
          themeDark: flat.themeDark || flat.theme_dark || DEFAULT_THEME.dark,
          themeAccent: flat.themeAccent || flat.theme_accent || DEFAULT_THEME.accent,
        });
      } catch {
        // If fetch fails, keep defaults
      } finally {
        setLoadingSettings(false);
      }
    };

    // Also load theme from dedicated endpoint
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

    fetchSettings();

    // Fetch API keys status
    fetch("/api/admin/api-keys")
      .then((res) => res.json())
      .then((data) => {
        if (data.keys) {
          const initial: Record<string, ApiKeyState> = {};
          for (const cfg of API_KEYS_CONFIG) {
            const k = data.keys[cfg.key];
            initial[cfg.key] = {
              configured: k?.configured || false,
              masked: k?.masked || "",
              inputValue: "",
              saving: false,
              visible: false,
            };
          }
          setApiKeys(initial);
        }
      })
      .catch(() => {
        // Initialize empty state
        const initial: Record<string, ApiKeyState> = {};
        for (const cfg of API_KEYS_CONFIG) {
          initial[cfg.key] = { configured: false, masked: "", inputValue: "", saving: false, visible: false };
        }
        setApiKeys(initial);
      });
  }, []);

  // Live preview: apply theme whenever colors change
  useEffect(() => {
    if (!loadingSettings) {
      applyTheme({ dark: settings.themeDark, accent: settings.themeAccent });
    }
  }, [settings.themeDark, settings.themeAccent, loadingSettings]);

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
      // Save general settings to admin API
      const settingsArray = Object.entries(settings).map(([key, value]) => ({
        key,
        value: String(value),
      }));

      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settingsArray),
      });

      if (!res.ok) throw new Error("Erreur");

      // Also save theme to dedicated theme endpoint
      const themeRes = await fetch("/api/settings/theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dark: settings.themeDark,
          accent: settings.themeAccent,
        }),
      });

      if (!themeRes.ok) {
        const data = await themeRes.json();
        throw new Error(data.error || "Erreur lors de la sauvegarde du theme");
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

      toast({ type: "success", message: "Parametres enregistres" });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur lors de l'enregistrement";
      setSaveError(msg);
      toast({ type: "error", message: msg });
    } finally {
      setSaving(false);
    }
  };

  const saveApiKey = async (keyName: string) => {
    const state = apiKeys[keyName];
    if (!state?.inputValue.trim()) {
      toast({ type: "error", message: "Veuillez saisir une valeur" });
      return;
    }

    setApiKeys((prev) => ({
      ...prev,
      [keyName]: { ...prev[keyName], saving: true },
    }));

    try {
      const res = await fetch("/api/admin/api-keys", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: keyName, value: state.inputValue.trim() }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Erreur");
      }

      const data = await res.json();
      setApiKeys((prev) => ({
        ...prev,
        [keyName]: {
          configured: true,
          masked: data.masked,
          inputValue: "",
          saving: false,
          visible: false,
        },
      }));
      toast({ type: "success", message: "Cle API enregistree de maniere securisee" });
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Erreur";
      toast({ type: "error", message: msg });
      setApiKeys((prev) => ({
        ...prev,
        [keyName]: { ...prev[keyName], saving: false },
      }));
    }
  };

  const deleteApiKey = async (keyName: string) => {
    setApiKeys((prev) => ({
      ...prev,
      [keyName]: { ...prev[keyName], saving: true },
    }));

    try {
      const res = await fetch("/api/admin/api-keys", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: keyName }),
      });

      if (!res.ok) throw new Error("Erreur");

      setApiKeys((prev) => ({
        ...prev,
        [keyName]: { configured: false, masked: "", inputValue: "", saving: false, visible: false },
      }));
      toast({ type: "success", message: "Cle API supprimee" });
    } catch {
      toast({ type: "error", message: "Erreur lors de la suppression" });
      setApiKeys((prev) => ({
        ...prev,
        [keyName]: { ...prev[keyName], saving: false },
      }));
    }
  };

  const darkPalette = deriveDarkPalette(settings.themeDark);
  const accentPalette = deriveAccentPalette(settings.themeAccent);

  if (loadingSettings) {
    return (
      <PageTransition className="space-y-6">
        <div className="flex justify-center py-32">
          <Loader2 size={32} className="text-accent animate-spin" />
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Parametres"
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

      {/* API Keys */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <Key size={20} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="font-serif text-lg text-text-primary">Cles API</h2>
              <p className="text-sm text-text-muted">Connexions aux services externes</p>
            </div>
          </div>
          <div className="flex items-center gap-2 mb-6 ml-[52px]">
            <ShieldCheck size={14} className="text-emerald-400" />
            <p className="text-xs text-emerald-400/70">
              Les cles sont chiffrees (AES-256-GCM) avant stockage en base de donnees
            </p>
          </div>

          <div className="space-y-6">
            {API_KEYS_CONFIG.map((cfg) => {
              const state = apiKeys[cfg.key];
              if (!state) return null;

              return (
                <div key={cfg.key} className="border-b border-white/[0.04] pb-5 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-text-secondary">
                      {cfg.label}
                    </label>
                    {state.configured && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 text-emerald-400 text-xs font-medium rounded-full">
                        <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                        Configuree
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-text-muted mb-3">{cfg.description}</p>

                  {state.configured && !state.inputValue && (
                    <div className="flex items-center gap-3 mb-3">
                      <code className="flex-1 px-4 py-2.5 bg-dark border border-white/[0.06] rounded-xl text-text-muted font-mono text-sm">
                        {state.masked}
                      </code>
                      <button
                        onClick={() =>
                          setApiKeys((prev) => ({
                            ...prev,
                            [cfg.key]: { ...prev[cfg.key], inputValue: " " },
                          }))
                        }
                        className="px-3 py-2.5 bg-dark border border-white/[0.06] rounded-xl text-text-secondary hover:text-accent hover:border-accent/30 transition-colors text-sm"
                        title="Modifier"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => deleteApiKey(cfg.key)}
                        disabled={state.saving}
                        className="p-2.5 bg-dark border border-white/[0.06] rounded-xl text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-colors"
                        title="Supprimer"
                      >
                        {state.saving ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                      </button>
                    </div>
                  )}

                  {(!state.configured || state.inputValue) && (
                    <div className="flex items-center gap-3">
                      <div className="relative flex-1">
                        <input
                          type={state.visible ? "text" : "password"}
                          value={state.inputValue.trim()}
                          onChange={(e) =>
                            setApiKeys((prev) => ({
                              ...prev,
                              [cfg.key]: { ...prev[cfg.key], inputValue: e.target.value },
                            }))
                          }
                          placeholder={cfg.placeholder}
                          className="w-full px-4 py-3 pr-12 bg-dark border border-white/[0.06] rounded-xl text-text-primary font-mono text-sm placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50"
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setApiKeys((prev) => ({
                              ...prev,
                              [cfg.key]: { ...prev[cfg.key], visible: !prev[cfg.key].visible },
                            }))
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                        >
                          {state.visible ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                      <button
                        onClick={() => saveApiKey(cfg.key)}
                        disabled={state.saving || !state.inputValue.trim()}
                        className="px-4 py-3 bg-accent text-dark font-semibold rounded-xl hover:bg-accent-hover transition-colors text-sm disabled:opacity-50"
                      >
                        {state.saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                      </button>
                      {state.configured && (
                        <button
                          onClick={() =>
                            setApiKeys((prev) => ({
                              ...prev,
                              [cfg.key]: { ...prev[cfg.key], inputValue: "", visible: false },
                            }))
                          }
                          className="px-3 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-muted hover:text-text-secondary transition-colors text-sm"
                        >
                          Annuler
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
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
