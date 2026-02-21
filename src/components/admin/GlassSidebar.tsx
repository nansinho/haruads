"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      { label: "Vue d'ensemble", href: "/admin", icon: <LayoutDashboard size={18} /> },
      { label: "Statistiques", href: "/admin/statistiques", icon: <BarChart3 size={18} /> },
    ],
  },
  {
    title: "Intelligence Artificielle",
    items: [
      { label: "Blog IA", href: "/admin/ia/blog", icon: <Sparkles size={18} /> },
      { label: "Outils IA", href: "/admin/ia/outils", icon: <Wrench size={18} /> },
    ],
  },
  {
    title: "Contenu",
    items: [
      { label: "Blog", href: "/admin/blog", icon: <FileText size={18} /> },
      { label: "Projets", href: "/admin/projets", icon: <FolderKanban size={18} /> },
      { label: "Offres", href: "/admin/offres", icon: <Tag size={18} /> },
      { label: "Villes", href: "/admin/villes", icon: <MapPin size={18} /> },
      { label: "Services Localisés", href: "/admin/services-localises", icon: <Globe size={18} /> },
      { label: "SEO", href: "/admin/seo", icon: <Search size={18} /> },
    ],
  },
  {
    title: "Clients",
    items: [
      { label: "Demandes de devis", href: "/admin/devis", icon: <MessageSquare size={18} /> },
      { label: "Tickets", href: "/admin/tickets", icon: <Ticket size={18} /> },
      { label: "Messages Contact", href: "/admin/messages", icon: <Mail size={18} /> },
      { label: "Utilisateurs", href: "/admin/utilisateurs", icon: <Users size={18} /> },
    ],
  },
  {
    title: "Marketing",
    items: [
      { label: "Newsletter", href: "/admin/newsletter", icon: <Megaphone size={18} /> },
      { label: "Prix Dynamiques", href: "/admin/prix", icon: <DollarSign size={18} /> },
    ],
  },
  {
    title: "Configuration",
    items: [
      { label: "Paramètres", href: "/admin/parametres", icon: <Settings size={18} /> },
      { label: "Sécurité", href: "/admin/securite", icon: <Shield size={18} /> },
      { label: "Logs Sécurité", href: "/admin/logs", icon: <ScrollText size={18} /> },
    ],
  },
];

export { navigation };

export default function GlassSidebar({
  sidebarOpen,
  setSidebarOpen,
}: {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}) {
  const [collapsedGroups, setCollapsedGroups] = useState<string[]>([]);
  const pathname = usePathname();
  const { data: session } = useSession();

  const toggleGroup = (title: string) => {
    setCollapsedGroups((prev) =>
      prev.includes(title) ? prev.filter((g) => g !== title) : [...prev, title]
    );
  };

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-[270px] bg-dark border-r border-border-dark transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-5 border-b border-border-dark">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-bold text-sm text-dark">
              H
            </div>
            <div>
              <span className="font-bold text-base text-text-primary tracking-tight">
                HDS
              </span>
              <span className="text-accent font-medium ml-1.5 text-sm">
                Admin
              </span>
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
        <nav className="flex-1 overflow-y-auto py-4 px-3 h-[calc(100vh-8rem)] scrollbar-thin">
          {navigation.map((group) => (
            <div key={group.title} className="mb-1">
              <button
                onClick={() => toggleGroup(group.title)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-[0.65rem] font-semibold text-text-muted uppercase tracking-widest hover:text-text-secondary transition-colors"
              >
                {group.title}
                <ChevronDown
                  size={12}
                  className={`transition-transform duration-200 ${
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
                      className={`relative flex items-center gap-3 px-3 py-2 rounded-lg text-[0.82rem] transition-all duration-200 group ${
                        isActive(item.href)
                          ? "bg-accent-dim text-accent"
                          : "text-text-secondary hover:text-text-primary hover:bg-dark-3"
                      }`}
                    >
                      {/* Left accent bar */}
                      {isActive(item.href) && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-accent rounded-r-full" />
                      )}
                      <span
                        className={
                          isActive(item.href)
                            ? "text-accent"
                            : "text-text-muted group-hover:text-text-secondary"
                        }
                      >
                        {item.icon}
                      </span>
                      {item.label}
                      {item.badge && item.badge > 0 && (
                        <span className="ml-auto bg-accent text-dark text-[0.65rem] font-bold px-2 py-0.5 rounded-full">
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
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border-dark bg-dark">
          <div className="flex items-center gap-3 px-2 py-1.5">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-accent flex items-center justify-center text-sm font-bold text-dark">
                {session?.user?.name?.charAt(0) || "A"}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-dark" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-text-primary truncate">
                {session?.user?.name || "Admin"}
              </p>
              <p className="text-[0.7rem] text-text-muted truncate">
                {session?.user?.email || "admin@agencehds.fr"}
              </p>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/auth/login" })}
              className="text-text-muted hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-dark-3"
              title="Déconnexion"
            >
              <LogOut size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
