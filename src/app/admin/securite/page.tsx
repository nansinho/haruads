"use client";

import { useState } from "react";
import {
  Shield,
  Lock,
  Key,
  Smartphone,
  Monitor,
  Globe,
  Clock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  Loader2,
  LogOut,
  Save,
} from "lucide-react";

interface Session {
  id: string;
  device: string;
  browser: string;
  ip: string;
  location: string;
  lastActive: string;
  current: boolean;
}

const mockSessions: Session[] = [
  {
    id: "1",
    device: "MacBook Pro",
    browser: "Chrome 121",
    ip: "192.168.1.1",
    location: "Paris, France",
    lastActive: "Actif maintenant",
    current: true,
  },
  {
    id: "2",
    device: "iPhone 15",
    browser: "Safari Mobile",
    ip: "10.0.0.42",
    location: "Paris, France",
    lastActive: "Il y a 2 heures",
    current: false,
  },
  {
    id: "3",
    device: "Windows PC",
    browser: "Firefox 122",
    ip: "172.16.0.5",
    location: "Lyon, France",
    lastActive: "Il y a 3 jours",
    current: false,
  },
];

export default function SecuritePage() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [sessions] = useState<Session[]>(mockSessions);

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) return;
    if (!oldPassword || !newPassword) return;

    setChangingPassword(true);
    // TODO: API call to change password
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setChangingPassword(false);
    setPasswordChanged(true);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordChanged(false), 3000);
  };

  const passwordsMatch = newPassword === confirmPassword && newPassword.length > 0;
  const passwordError =
    confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white flex items-center gap-3">
          <Shield className="text-violet-400" size={28} />
          Securite
        </h1>
        <p className="text-gray-400 mt-1">
          Parametres de securite et acces
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Change Password */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-violet-500/10 rounded-xl">
              <Lock size={20} className="text-violet-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Changer le mot de passe
              </h2>
              <p className="text-sm text-gray-500">
                Mettez a jour votre mot de passe
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* Old Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ancien mot de passe
              </label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  placeholder="Votre mot de passe actuel"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowOldPassword(!showOldPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Votre nouveau mot de passe"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirmez votre nouveau mot de passe"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 pr-12 ${
                    passwordError
                      ? "border-red-500/50 focus:ring-red-500/50"
                      : "border-white/10 focus:ring-violet-500/50"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
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

            <button
              onClick={handlePasswordChange}
              disabled={!passwordsMatch || !oldPassword || changingPassword}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-violet-600 to-blue-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 mt-2"
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
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl">
              <Smartphone size={20} className="text-emerald-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Authentification 2FA
              </h2>
              <p className="text-sm text-gray-500">
                Double facteur d&apos;authentification
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3">
                <Key size={20} className={twoFAEnabled ? "text-emerald-400" : "text-gray-500"} />
                <div>
                  <p className="text-sm font-medium text-white">
                    Application d&apos;authentification
                  </p>
                  <p className="text-xs text-gray-500">
                    Google Authenticator, Authy, etc.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                  twoFAEnabled ? "bg-violet-600" : "bg-white/10"
                }`}
              >
                <span
                  className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
                    twoFAEnabled ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
            </div>

            {twoFAEnabled ? (
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle size={16} className="text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    2FA Active
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  Votre compte est protege par une double authentification. Un code
                  sera demande a chaque connexion.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} className="text-yellow-400" />
                  <p className="text-sm font-medium text-yellow-400">
                    2FA Desactivee
                  </p>
                </div>
                <p className="text-xs text-gray-400">
                  Nous recommandons fortement d&apos;activer la double authentification
                  pour securiser votre compte.
                </p>
              </div>
            )}

            <div className="pt-2">
              <h3 className="text-sm font-medium text-gray-300 mb-3">
                Codes de secours
              </h3>
              <p className="text-xs text-gray-500 mb-3">
                Generez des codes de secours pour acceder a votre compte si vous
                perdez votre appareil.
              </p>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/5 border border-white/10 text-gray-300 rounded-xl text-sm hover:bg-white/10 transition-colors">
                <Key size={14} />
                Generer des codes de secours
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-500/10 rounded-xl">
              <Monitor size={20} className="text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">
                Sessions actives
              </h2>
              <p className="text-sm text-gray-500">
                Appareils connectes a votre compte
              </p>
            </div>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm hover:bg-red-500/20 transition-colors">
            <LogOut size={14} />
            Deconnecter tout
          </button>
        </div>

        <div className="space-y-3">
          {sessions.map((session) => (
            <div
              key={session.id}
              className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${
                session.current
                  ? "bg-violet-500/5 border-violet-500/20"
                  : "bg-white/5 border-white/10 hover:bg-white/[0.07]"
              }`}
            >
              <div className="flex items-center gap-4">
                <div
                  className={`p-2 rounded-lg ${
                    session.current ? "bg-violet-500/10" : "bg-white/5"
                  }`}
                >
                  {session.device.includes("iPhone") ? (
                    <Smartphone
                      size={18}
                      className={
                        session.current ? "text-violet-400" : "text-gray-400"
                      }
                    />
                  ) : (
                    <Monitor
                      size={18}
                      className={
                        session.current ? "text-violet-400" : "text-gray-400"
                      }
                    />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-white">
                      {session.device}
                    </p>
                    {session.current && (
                      <span className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs rounded-full">
                        Session actuelle
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Globe size={10} />
                      {session.browser}
                    </span>
                    <span className="text-xs text-gray-500">{session.ip}</span>
                    <span className="text-xs text-gray-500">
                      {session.location}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <Clock size={10} />
                  {session.lastActive}
                </span>
                {!session.current && (
                  <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-gray-500 hover:text-red-400 transition-colors" title="Deconnecter">
                    <LogOut size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
