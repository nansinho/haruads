"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import {
  User,
  Lock,
  Save,
  Mail,
  Phone,
  Building2,
  MapPin,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

export default function ClientProfilPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    address: "",
    city: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [saveError, setSaveError] = useState("");

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [changingPwd, setChangingPwd] = useState(false);
  const [pwdChanged, setPwdChanged] = useState(false);
  const [pwdError, setPwdError] = useState("");

  const inputClass =
    "w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all text-sm";
  const disabledInputClass =
    "w-full px-4 py-3 bg-white/[0.02] border border-white/[0.06] rounded-xl text-text-muted cursor-not-allowed text-sm";
  const labelClass = "block text-sm font-medium text-text-secondary mb-2";

  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/client/profile");
      if (res.ok) {
        const data = await res.json();
        setFormData({
          name: data.name || "",
          phone: data.phone || "",
          company: data.company || "",
          address: data.address || "",
          city: data.city || "",
        });
      }
    } catch {
      // Form will show empty values
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleSave = async () => {
    setSaveError("");
    setSaving(true);
    try {
      const res = await fetch("/api/client/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setSaveError(data.error || "Erreur lors de la sauvegarde");
        setSaving(false);
        return;
      }
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setSaveError("Erreur de connexion au serveur");
      setSaving(false);
    }
  };

  return (
    <PageTransition className="space-y-6 max-w-2xl">
      {/* Header */}
      <AnimatedSection>
        <div>
          <h1 className="font-serif text-2xl text-text-primary">Mon Profil</h1>
          <p className="text-text-secondary mt-1">G&eacute;rez vos informations personnelles</p>
        </div>
      </AnimatedSection>

      {/* Profile avatar section */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500 flex items-center justify-center text-2xl font-bold text-dark">
              {(formData.name || session?.user?.name || "C").charAt(0)}
            </div>
            <div>
              <h2 className="font-serif text-lg text-text-primary">
                {formData.name || session?.user?.name || "Client"}
              </h2>
              <p className="text-sm text-text-muted">{session?.user?.email || ""}</p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Profile info */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <h2 className="font-serif text-lg text-text-primary mb-6 flex items-center gap-2">
            <User size={20} className="text-cyan-400" />
            Informations personnelles
          </h2>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
            </div>
          ) : (
            <div className="space-y-5">
              {/* Name */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-1.5">
                    <User size={13} className="text-text-muted" />
                    Nom complet
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Votre nom complet"
                  className={inputClass}
                />
              </div>

              {/* Email (readonly) */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} className="text-text-muted" />
                    Email
                  </span>
                </label>
                <input
                  type="email"
                  value={session?.user?.email || ""}
                  disabled
                  className={disabledInputClass}
                />
                <p className="text-xs text-text-muted mt-1.5">L&apos;email ne peut pas &ecirc;tre modifi&eacute;</p>
              </div>

              {/* Phone & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} className="text-text-muted" />
                      T&eacute;l&eacute;phone
                    </span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="06 12 34 56 78"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>
                    <span className="flex items-center gap-1.5">
                      <Building2 size={13} className="text-text-muted" />
                      Entreprise
                    </span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nom de l'entreprise"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Address */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-text-muted" />
                    Adresse
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="123 rue Example"
                  className={inputClass}
                />
              </div>

              {/* City */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-1.5">
                    <MapPin size={13} className="text-text-muted" />
                    Ville
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Gardanne"
                  className={inputClass}
                />
              </div>

              {saveError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                  {saveError}
                </div>
              )}

              {saved && (
                <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Profil mis &agrave; jour avec succ&egrave;s
                </div>
              )}

              {/* Save button */}
              <div className="pt-2">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-dark font-semibold rounded-full hover:bg-cyan-400 transition-all text-sm shadow-lg shadow-cyan-500/20 disabled:opacity-50"
                >
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {saving ? "Sauvegarde..." : "Sauvegarder les modifications"}
                </button>
              </div>
            </div>
          )}
        </div>
      </AnimatedSection>

      {/* Change password */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <h2 className="font-serif text-lg text-text-primary mb-6 flex items-center gap-2">
            <Lock size={20} className="text-cyan-400" />
            Changer le mot de passe
          </h2>
          <div className="space-y-5">
            {/* Current password */}
            <div>
              <label className={labelClass}>Ancien mot de passe</label>
              <div className="relative">
                <input
                  type={showCurrentPwd ? "text" : "password"}
                  value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                  placeholder="Entrez votre mot de passe actuel"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPwd(!showCurrentPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showCurrentPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New password */}
            <div>
              <label className={labelClass}>Nouveau mot de passe</label>
              <div className="relative">
                <input
                  type={showNewPwd ? "text" : "password"}
                  value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                  placeholder="Entrez un nouveau mot de passe"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPwd(!showNewPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showNewPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className={labelClass}>Confirmer le mot de passe</label>
              <div className="relative">
                <input
                  type={showConfirmPwd ? "text" : "password"}
                  value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                  placeholder="Confirmez le nouveau mot de passe"
                  className={inputClass}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPwd(!showConfirmPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                >
                  {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {pwdError && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm">
                {pwdError}
              </div>
            )}

            {pwdChanged && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-4 py-3 rounded-xl text-sm">
                Mot de passe modifi&eacute; avec succ&egrave;s
              </div>
            )}

            {/* Change password button */}
            <div className="pt-2">
              <button
                onClick={async () => {
                  setPwdError("");
                  if (!passwords.current || !passwords.new || !passwords.confirm) {
                    setPwdError("Tous les champs sont requis");
                    return;
                  }
                  if (passwords.new !== passwords.confirm) {
                    setPwdError("Les mots de passe ne correspondent pas");
                    return;
                  }
                  if (passwords.new.length < 8) {
                    setPwdError("Le mot de passe doit contenir au moins 8 caractères");
                    return;
                  }
                  setChangingPwd(true);
                  try {
                    const res = await fetch("/api/auth/change-password", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        currentPassword: passwords.current,
                        newPassword: passwords.new,
                      }),
                    });
                    const data = await res.json();
                    if (!res.ok) {
                      setPwdError(data.error || "Erreur lors de la modification");
                      setChangingPwd(false);
                      return;
                    }
                    setChangingPwd(false);
                    setPwdChanged(true);
                    setPasswords({ current: "", new: "", confirm: "" });
                    setTimeout(() => setPwdChanged(false), 3000);
                  } catch {
                    setPwdError("Erreur de connexion au serveur");
                    setChangingPwd(false);
                  }
                }}
                disabled={changingPwd}
                className="flex items-center gap-2 px-6 py-3 bg-dark border border-white/[0.06] text-text-primary rounded-full hover:bg-white/[0.04] transition-all font-medium text-sm disabled:opacity-50"
              >
                <Lock size={16} />
                {changingPwd ? "Modification..." : "Modifier le mot de passe"}
              </button>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
