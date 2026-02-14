"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import GlassSidebar from "@/components/admin/GlassSidebar";
import { Menu, Home, ChevronRight, Globe } from "lucide-react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-dark text-text-primary">
      {/* Ambient glow */}
      <div className="fixed top-0 right-0 w-[600px] h-[400px] bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none" />

      <GlassSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

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
                <span className="text-text-secondary capitalize text-[0.82rem]">
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
              className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/[0.06] hover:border-white/[0.12]"
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
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </SessionProvider>
  );
}
