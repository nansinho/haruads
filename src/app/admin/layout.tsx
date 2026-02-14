"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { signOut, useSession } from "next-auth/react";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  FolderKanban,
  Tag,
  MapPin,
  Globe,
  Search,
  MessageSquare,
  Ticket,
  Mail,
  Users,
  Megaphone,
  DollarSign,
  Settings,
  Shield,
  ScrollText,
  Sparkles,
  Wrench,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Home,
  ChevronRight,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navigation: NavGroup[] = [
  {
    title: "Dashboard",
    items: [
      {
        label: "Vue d'ensemble",
        href: "/admin",
        icon: <LayoutDashboard size={18} />,
      },
      {
        label: "Statistiques",
        href: "/admin/statistiques",
        icon: <BarChart3 size={18} />,
      },
    ],
  },
  {
    title: "IA",
    items: [
      {
        label: "Blog IA",
        href: "/admin/ia/blog",
        icon: <Sparkles size={18} />,
      },
      {
        label: "Outils IA",
        href: "/admin/ia/outils",
        icon: <Wrench size={18} />,
      },
    ],
  },
  {
    title: "Contenu",
    items: [
      {
        label: "Blog",
        href: "/admin/blog",
        icon: <FileText size={18} />,
      },
      {
        label: "Projets",
        href: "/admin/projets",
        icon: <FolderKanban size={18} />,
      },
      {
        label: "Offres",
        href: "/admin/offres",
        icon: <Tag size={18} />,
      },
      {
        label: "Villes",
        href: "/admin/villes",
        icon: <MapPin size={18} />,
      },
      {
        label: "Services Localisés",
        href: "/admin/services-localises",
        icon: <Globe size={18} />,
      },
      { label: "SEO", href: "/admin/seo", icon: <Search size={18} /> },
    ],
  },
  {
    title: "Clients",
    items: [
      {
        label: "Demandes de devis",
        href: "/admin/devis",
        icon: <MessageSquare size={18} />,
      },
      {
        label: "Tickets",
        href: "/admin/tickets",
        icon: <Ticket size={18} />,
      },
      {
        label: "Messages Contact",
        href: "/admin/messages",
        icon: <Mail size={18} />,
      },
      {
        label: "Utilisateurs",
        href: "/admin/utilisateurs",
        icon: <Users size={18} />,
      },
    ],
  },
  {
    title: "Marketing",
    items: [
      {
        label: "Newsletter",
        href: "/admin/newsletter",
        icon: <Megaphone size={18} />,
      },
      {
        label: "Prix Dynamiques",
        href: "/admin/prix",
        icon: <DollarSign size={18} />,
      },
    ],
  },
  {
    title: "Configuration",
    items: [
      {
        label: "Paramètres",
        href: "/admin/parametres",
        icon: <Settings size={18} />,
      },
      {
        label: "Sécurité",
        href: "/admin/securite",
        icon: <Shield size={18} />,
      },
      {
        label: "Logs Sécurité",
        href: "/admin/logs",
        icon: <ScrollText size={18} />,
      },
    ],
  },
];

function AdminLayoutInner({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) =>
      prev.includes(title)
        ? prev.filter((g) => g !== title)
        : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
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
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center font-bold text-sm">
              H
            </div>
            <span className="font-bold text-lg">
              <span className="text-white">HDS</span>
              <span className="text-violet-400"> Admin</span>
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
        <nav className="flex-1 overflow-y-auto py-4 px-3 h-[calc(100vh-8rem)]">
          {navigation.map((group) => (
            <div key={group.title} className="mb-2">
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider hover:text-gray-300 transition-colors"
              >
                {group.title}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    collapsedGroups.includes(group.title) ? "-rotate-90" : ""
                  }`}
                />
              </button>
              {!collapsedGroups.includes(group.title) && (
                <div className="space-y-0.5">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                        isActive(item.href)
                          ? "bg-violet-600/15 text-violet-300 border border-violet-500/20"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <span
                        className={
                          isActive(item.href)
                            ? "text-violet-400"
                            : "text-gray-500"
                        }
                      >
                        {item.icon}
                      </span>
                      {item.label}
                      {item.badge && item.badge > 0 && (
                        <span className="ml-auto bg-violet-600 text-white text-xs px-2 py-0.5 rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/5 bg-[#0d0d14]">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center text-sm font-bold">
              {session?.user?.name?.charAt(0) || "A"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {session?.user?.name || "Admin"}
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

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/admin"
              className="text-gray-500 hover:text-white transition-colors"
            >
              <Home size={16} />
            </Link>
            {pathname !== "/admin" && (
              <>
                <ChevronRight size={14} className="text-gray-600" />
                <span className="text-gray-300 capitalize">
                  {pathname.split("/").pop()?.replace(/-/g, " ")}
                </span>
              </>
            )}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <Globe size={14} />
              Voir le site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
