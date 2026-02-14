"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  FolderKanban,
  FileText,
  Receipt,
  Ticket,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  Home,
  ChevronRight,
  Bell,
  Globe,
} from "lucide-react";

const navigation = [
  { label: "Tableau de bord", href: "/espace-client", icon: <LayoutDashboard size={18} /> },
  { label: "Mes Projets", href: "/espace-client/projets", icon: <FolderKanban size={18} /> },
  { label: "Documents", href: "/espace-client/documents", icon: <FileText size={18} /> },
  { label: "Factures", href: "/espace-client/factures", icon: <Receipt size={18} /> },
  { label: "Tickets", href: "/espace-client/tickets", icon: <Ticket size={18} /> },
  { label: "Messages", href: "/espace-client/messages", icon: <MessageSquare size={18} /> },
  { label: "Mon Profil", href: "/espace-client/profil", icon: <Settings size={18} /> },
];

function EspaceClientLayoutInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === "/espace-client") return pathname === "/espace-client";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-dark text-text-primary">
      {/* Ambient glow - cyan */}
      <div className="fixed top-0 right-0 w-[600px] h-[400px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[270px] bg-dark/80 backdrop-blur-2xl border-r border-white/[0.04] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/[0.06]">
          <Link href="/espace-client" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-sm text-white shadow-lg shadow-cyan-500/20">
              H
            </div>
            <div>
              <span className="font-bold text-base text-text-primary tracking-tight">Mon</span>
              <span className="text-cyan-400 font-serif italic ml-1.5 text-sm">Espace</span>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-text-secondary hover:text-text-primary transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 h-[calc(100vh-8rem)]">
          <div className="space-y-0.5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-[0.82rem] transition-all duration-200 group ${
                  isActive(item.href)
                    ? "bg-cyan-500/[0.06] text-cyan-400"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/[0.03]"
                }`}
              >
                {isActive(item.href) && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-cyan-400 rounded-r-full" />
                )}
                <span
                  className={
                    isActive(item.href)
                      ? "text-cyan-400"
                      : "text-text-muted group-hover:text-text-secondary"
                  }
                >
                  {item.icon}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/[0.06] bg-dark/80 backdrop-blur-2xl">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">
                {session?.user?.name?.charAt(0) || "C"}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {session?.user?.name || "Client"}
              </p>
              <p className="text-[0.7rem] text-text-muted truncate">
                {session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="text-text-muted hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-white/[0.04]"
              title="Déconnexion"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-[270px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-dark/80 backdrop-blur-2xl border-b border-white/[0.04] flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-text-secondary hover:text-text-primary mr-4 transition-colors"
          >
            <Menu size={22} />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/espace-client"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <Home size={15} />
            </Link>
            {pathname !== "/espace-client" && (
              <>
                <ChevronRight size={13} className="text-text-muted" />
                <span className="text-text-secondary capitalize text-[0.82rem]">
                  {pathname.split("/").pop()?.replace(/-/g, " ")}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-3">
            <button className="relative p-2 text-text-muted hover:text-text-primary transition-colors rounded-full hover:bg-white/[0.04]">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-500 rounded-full" />
            </button>
            <Link
              href="/"
              target="_blank"
              className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06] hover:border-white/[0.12]"
            >
              <Globe size={13} />
              Voir le site
            </Link>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function EspaceClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <EspaceClientLayoutInner>{children}</EspaceClientLayoutInner>
    </SessionProvider>
  );
}
