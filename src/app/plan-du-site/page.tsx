import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { servicesData } from "@/data/services";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Plan du Site",
  description:
    "Plan du site agencehds.fr — Retrouvez toutes les pages, services, projets et articles de l'Agence HDS, agence web créative à Aix-en-Provence.",
  openGraph: {
    title: "Plan du Site — Agence HDS",
    description:
      "Plan du site agencehds.fr — Toutes les pages de l'Agence HDS.",
    url: "https://agencehds.fr/plan-du-site",
  },
  twitter: {
    title: "Plan du Site — Agence HDS",
    description:
      "Plan du site agencehds.fr — Toutes les pages de l'Agence HDS.",
  },
  alternates: {
    canonical: "https://agencehds.fr/plan-du-site",
  },
  keywords: [
    "plan du site",
    "sitemap agence hds",
    "pages agence web",
  ],
};

const staticPages = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Projets", href: "/projets" },
  { label: "Tarifs", href: "/tarifs" },
  { label: "À Propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
  { label: "Carrières", href: "/carrieres" },
  { label: "Mentions Légales", href: "/mentions-legales" },
  { label: "Politique de Confidentialité & Cookies", href: "/politique-confidentialite" },
];

export const revalidate = 3600;

export default async function PlanDuSitePage() {
  const services = Object.entries(servicesData).map(([slug, data]) => ({
    label: data.title,
    href: `/services/${slug}`,
  }));

  // Fetch published projects from Supabase
  let projects: { label: string; href: string }[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("projects")
      .select("title, slug")
      .eq("status", "published")
      .order("sort_order", { ascending: true });
    if (data) {
      projects = data.map((p) => ({ label: p.title, href: `/projets/${p.slug}` }));
    }
  }

  // Fetch published blog articles from Supabase
  let articles: { label: string; href: string }[] = [];
  if (supabase) {
    const { data } = await supabase
      .from("blog_posts")
      .select("title, slug")
      .eq("status", "published")
      .order("published_at", { ascending: false });
    if (data) {
      articles = data.map((a) => ({ label: a.title, href: `/blog/${a.slug}` }));
    }
  }

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section className="bg-dark text-white relative overflow-hidden pt-32 pb-20">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-[1400px] mx-auto px-5 lg:px-12 relative z-2">
            <Breadcrumb items={[
              { label: "Accueil", href: "/" },
              { label: "Plan du Site" },
            ]} />
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Navigation
            </span>
            <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Plan du </span>
              <span className="font-serif italic text-accent">site.</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[800px] mx-auto px-5 py-[80px] lg:px-12">
            <div className="space-y-10">
              {/* Pages principales */}
              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  Pages principales
                </h2>
                <ul className="space-y-2">
                  {staticPages.map((page) => (
                    <li key={page.href}>
                      <Link
                        href={page.href}
                        className="text-[0.88rem] text-accent hover:underline"
                      >
                        {page.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  Services
                </h2>
                <ul className="space-y-2">
                  {services.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.88rem] text-accent hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projets */}
              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  Projets
                </h2>
                <ul className="space-y-2">
                  {projects.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.88rem] text-accent hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Blog */}
              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  Articles de Blog
                </h2>
                <ul className="space-y-2">
                  {articles.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-[0.88rem] text-accent hover:underline"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
