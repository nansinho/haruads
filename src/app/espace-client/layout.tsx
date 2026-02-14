"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
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
} from "lucide-react";

const navigation = [
  {
    label: "Tableau de bord",
    href: "/espace-client",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Mes Projets",
    href: "/espace-client/projets",
    icon: <FolderKanban size={18} />,
  },
  {
    label: "Documents",
    href: "/espace-client/documents",
    icon: <FileText size={18} />,
  },
  {
    label: "Factures",
    href: "/espace-client/factures",
    icon: <Receipt size={18} />,
  },
  {
    label: "Tickets",
    href: "/espace-client/tickets",
    icon: <Ticket size={18} />,
  },
  {
    label: "Messages",
    href: "/espace-client/messages",
    icon: <MessageSquare size={18} />,
  },
  {
    label: "Mon Profil",
    href: "/espace-client/profil",
    icon: <Settings size={18} />,
  },
];

export default function EspaceClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (href: string) => {
    if (href === "/espace-client") return pathname === "/espace-client";
    return pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0d0d14] border-r border-white/5 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/5">
          <Link href="/espace-client" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-bold text-sm">
              H
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">Mon</span>
              <span className="text-blue-400"> Espace</span>
            </span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 h-[calc(100vh-8rem)]">
          <div className="space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-blue-600/15 text-blue-300 border border-blue-500/20"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span
                  className={
                    isActive(item.href) ? "text-blue-400" : "text-gray-500"
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
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/5 bg-[#0d0d14]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-sm font-bold">
              {session?.user?.name?.charAt(0) || "C"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name || "Client"}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {session?.user?.email}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="text-gray-500 hover:text-red-400 transition-colors"
              title="Déconnexion"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-16 bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/5 flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-400 hover:text-white mr-4"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/espace-client"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Home size={16} />
            </Link>
            {pathname !== "/espace-client" && (
              <>
                <ChevronRight size={14} className="text-gray-600" />
                <span className="text-gray-300 capitalize">
                  {pathname.split("/").pop()?.replace(/-/g, " ")}
                </span>
              </>
            )}
          </div>

          <div className="ml-auto flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              Voir le site
            </Link>
          </div>
        </header>

        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
