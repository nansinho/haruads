"use client";

import { useState } from "react";
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
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

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

  const updateSetting = <K extends keyof SettingsData>(
    key: K,
    value: SettingsData[K]
  ) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  };

  const handleSave = async () => {
    setSaving(true);
    // TODO: Save to Supabase
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

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
