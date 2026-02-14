"use client";

import { useState } from "react";
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
} from "lucide-react";

export default function ClientProfilPage() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    phone: "",
    company: "",
    address: "",
    city: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });
  const [showCurrentPwd, setShowCurrentPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all text-sm";
  const disabledInputClass =
    "w-full px-4 py-3 bg-white/[0.02] border border-white/5 rounded-xl text-gray-500 cursor-not-allowed text-sm";
  const labelClass = "block text-sm font-medium text-gray-300 mb-2";

  return (
    <div className="space-y-6 max-w-2xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Mon Profil</h1>
        <p className="text-gray-400 mt-1">Gerez vos informations personnelles</p>
      </div>

      {/* Profile avatar section */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-2xl font-bold text-white">
            {session?.user?.name?.charAt(0) || "C"}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">
              {session?.user?.name || "Client"}
            </h2>
            <p className="text-sm text-gray-500">{session?.user?.email || ""}</p>
          </div>
        </div>
      </div>

      {/* Profile info */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <User size={20} className="text-blue-400" />
          Informations personnelles
        </h2>
        <div className="space-y-5">
          {/* Name */}
          <div>
            <label className={labelClass}>
              <span className="flex items-center gap-1.5">
                <User size={13} className="text-gray-500" />
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
                <Mail size={13} className="text-gray-500" />
                Email
              </span>
            </label>
            <input
              type="email"
              value={session?.user?.email || ""}
              disabled
              className={disabledInputClass}
            />
            <p className="text-xs text-gray-600 mt-1.5">L&apos;email ne peut pas etre modifie</p>
          </div>

          {/* Phone & Company */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className={labelClass}>
                <span className="flex items-center gap-1.5">
                  <Phone size={13} className="text-gray-500" />
                  Telephone
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
                  <Building2 size={13} className="text-gray-500" />
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
                <MapPin size={13} className="text-gray-500" />
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
                <MapPin size={13} className="text-gray-500" />
                Ville
              </span>
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              placeholder="Casablanca"
              className={inputClass}
            />
          </div>

          {/* Save button */}
          <div className="pt-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl hover:from-blue-500 hover:to-cyan-400 transition-all font-medium text-sm shadow-lg shadow-blue-600/20">
              <Save size={16} />
              Sauvegarder les modifications
            </button>
          </div>
        </div>
      </div>

      {/* Change password */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
          <Lock size={20} className="text-blue-400" />
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
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
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showConfirmPwd ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Change password button */}
          <div className="pt-2">
            <button className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/10 rounded-xl hover:bg-white/15 transition-all font-medium text-sm">
              <Lock size={16} />
              Modifier le mot de passe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
