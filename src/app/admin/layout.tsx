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
      <div className="min-h-screen bg-dark flex items-center justify-center">
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
    <div className="min-h-screen bg-dark text-text-primary">
      {/* Subtle ambient warmth */}
      <div className="fixed top-0 right-0 w-[500px] h-[300px] bg-accent/[0.02] rounded-full blur-[150px] pointer-events-none" />

      <GlassSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Main content */}
      <div className="lg:pl-[270px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-14 bg-dark/90 backdrop-blur-md border-b border-border-dark flex items-center px-5 lg:px-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-text-secondary hover:text-text-primary mr-4 transition-colors"
          >
            <Menu size={22} />
          </button>

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm">
            <Link
              href="/admin"
              className="text-text-muted hover:text-text-primary transition-colors"
            >
              <Home size={15} />
            </Link>
            {pathname !== "/admin" && (
              <>
                <ChevronRight size={13} className="text-text-muted" />
                <span className="text-text-secondary capitalize text-sm">
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
              className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border-dark hover:border-white/15"
            >
              <Globe size={13} />
              Voir le site
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="p-5 lg:p-10">{children}</main>
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
