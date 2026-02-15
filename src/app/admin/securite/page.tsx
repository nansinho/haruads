"use client";

import { useState } from "react";
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Loader2,
  Save,
  Info,
} from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import PageTransition, { AnimatedSection } from "@/components/admin/PageTransition";

export default function SecuritePage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [passwordError2, setPasswordError2] = useState("");

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) return;
    if (!oldPassword || !newPassword) return;
    setPasswordError2("");

    if (newPassword.length < 8) {
      setPasswordError2("Le mot de passe doit contenir au moins 8 caracteres");
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: oldPassword,
          newPassword,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPasswordError2(data.error || "Erreur lors de la modification");
        setChangingPassword(false);
        return;
      }
      setChangingPassword(false);
      setPasswordChanged(true);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setPasswordChanged(false), 3000);
    } catch {
      setPasswordError2("Erreur de connexion au serveur");
      setChangingPassword(false);
    }
  };

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const passwordError =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <PageTransition className="space-y-6">
      <AnimatedSection>
        <PageHeader
          title="Securite"
          subtitle="Parametres de securite et acces"
          icon={<Shield size={24} />}
        />
      </AnimatedSection>

      <AnimatedSection>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Change Password */}
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-accent/10 rounded-xl">
                <Lock size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-text-primary">
                  Changer le mot de passe
                </h2>
                <p className="text-sm text-text-muted">
                  Mettez a jour votre mot de passe
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Old Password */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Ancien mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showOldPassword ? "text" : "password"}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Votre mot de passe actuel"
                    className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Nouveau mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Votre nouveau mot de passe"
                    className="w-full px-4 py-3 bg-dark border border-white/[0.06] rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent/50 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">
                  Confirmer le mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmez votre nouveau mot de passe"
                    className={`w-full px-4 py-3 bg-dark border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 pr-12 ${
                      passwordError
                        ? "border-red-500/50 focus:ring-red-500/50"
                        : "border-white/[0.06] focus:ring-accent/50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-secondary transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-xs text-red-400 mt-1.5 flex items-center gap-1">
                    <AlertTriangle size={12} />
                    Les mots de passe ne correspondent pas
                  </p>
                )}
              </div>

              {passwordError2 && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                  <AlertTriangle size={14} />
                  {passwordError2}
                </div>
              )}

              <button
                onClick={handlePasswordChange}
                disabled={!passwordsMatch || !oldPassword || changingPassword}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-accent text-dark font-semibold rounded-full hover:bg-accent-hover transition-all shadow-lg shadow-accent/20 disabled:opacity-50 mt-2"
              >
                {changingPassword ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : passwordChanged ? (
                  <CheckCircle size={18} />
                ) : (
                  <Save size={18} />
                )}
                {changingPassword
                  ? "Modification..."
                  : passwordChanged
                  ? "Mot de passe modifie !"
                  : "Modifier le mot de passe"}
              </button>
            </div>
          </div>

          {/* 2FA */}
          <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                <Smartphone size={20} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-text-primary">
                  Authentification 2FA
                </h2>
                <p className="text-sm text-text-muted">
                  Double facteur d&apos;authentification
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-dark rounded-xl border border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <Key size={20} className="text-text-muted" />
                  <div>
                    <p className="text-sm font-medium text-text-primary">
                      Application d&apos;authentification
                    </p>
                    <p className="text-xs text-text-muted">
                      Google Authenticator, Authy, etc.
                    </p>
                  </div>
                </div>
                <div
                  className="relative inline-flex h-7 w-12 items-center rounded-full bg-white/10 cursor-not-allowed opacity-60"
                >
                  <span
                    className="inline-block h-5 w-5 transform rounded-full bg-white shadow-md translate-x-1"
                  />
                </div>
              </div>

              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <Info size={16} className="text-blue-400" />
                  <p className="text-sm font-medium text-blue-400">
                    Bientot disponible
                  </p>
                </div>
                <p className="text-xs text-text-muted">
                  L&apos;authentification a deux facteurs sera disponible dans une prochaine mise a jour.
                  Cette fonctionnalite ajoutera une couche de securite supplementaire a votre compte.
                </p>
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium text-text-secondary mb-3">
                  Codes de secours
                </h3>
                <p className="text-xs text-text-muted mb-3">
                  Generez des codes de secours pour acceder a votre compte si vous
                  perdez votre appareil.
                </p>
                <button
                  disabled
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-dark-2 border border-white/[0.06] text-text-muted rounded-full text-sm opacity-50 cursor-not-allowed"
                >
                  <Key size={14} />
                  Generer des codes de secours
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Active Sessions */}
      <AnimatedSection>
        <div className="bg-dark-2 border border-white/[0.06] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-accent/10 rounded-xl">
                <Monitor size={20} className="text-accent" />
              </div>
              <div>
                <h2 className="font-serif text-lg text-text-primary">
                  Sessions actives
                </h2>
                <p className="text-sm text-text-muted">
                  Appareils connectes a votre compte
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-dark rounded-xl border border-white/[0.06] text-center">
            <Info size={32} className="mx-auto text-text-muted mb-3" />
            <p className="text-sm text-text-secondary font-medium mb-1">
              Gestion des sessions
            </p>
            <p className="text-xs text-text-muted max-w-md mx-auto">
              La gestion des sessions sera disponible dans une prochaine mise a jour.
            </p>
          </div>
        </div>
      </AnimatedSection>
    </PageTransition>
  );
}
