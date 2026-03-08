"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider, useSession } from "next-auth/react";
import GlassSidebar from "@/components/admin/GlassSidebar";
import { ToastProvider } from "@/components/admin/Toast";
import { Menu, Home, ChevronRight, Globe, Loader2 } from "lucide-react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-admin-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-accent animate-spin" />
      </div>
    );
  }

  // RBAC: only admins can access /admin
  if (status === "authenticated" && session?.user?.role !== "admin") {
    window.location.href = "/espace-client";
    return null;
  }

  return (
    <div className="min-h-screen bg-dark text-admin-text">
      <GlassSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="lg:pl-[270px] min-h-screen bg-admin-bg">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-white/80 backdrop-blur-2xl border-b border-admin-card-border flex items-center px-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-admin-text-secondary hover:text-admin-text mr-4 transition-colors"
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/admin"
              className="text-admin-text-muted hover:text-admin-text transition-colors"
            >
              <Home size={15} />
            </Link>
            {pathname !== "/admin" && (
              <>
                <ChevronRight size={13} className="text-admin-text-muted" />
                <span className="text-admin-text-secondary capitalize text-[0.82rem]">
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
              className="text-xs text-admin-text-muted hover:text-admin-text transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-admin-card-border hover:border-admin-input-border"
            >
              <Globe size={13} />
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

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ToastProvider>
        <AdminLayoutInner>{children}</AdminLayoutInner>
      </ToastProvider>
    </SessionProvider>
  );
}
