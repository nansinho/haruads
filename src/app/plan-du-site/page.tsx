import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { articlesData } from "@/data/articles";

export const metadata: Metadata = {
  title: "Plan du Site",
  description:
    "Plan du site agencehds.fr — Retrouvez toutes les pages de l'Agence HDS, agence web créative à Aix-en-Provence.",
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
};

const staticPages = [
  { label: "Accueil", href: "/", desc: "Page d\u2019accueil" },
  { label: "Services", href: "/services", desc: "Nos expertises" },
  { label: "Projets", href: "/projets", desc: "Nos r\u00e9alisations" },
  { label: "Tarifs", href: "/tarifs", desc: "Nos formules" },
  { label: "\u00c0 Propos", href: "/a-propos", desc: "Notre histoire" },
  { label: "Contact", href: "/contact", desc: "Nous \u00e9crire" },
  { label: "Blog", href: "/blog", desc: "Actualit\u00e9s & ressources" },
  { label: "Carri\u00e8res", href: "/carrieres", desc: "Rejoignez-nous" },
  { label: "Mentions L\u00e9gales", href: "/mentions-legales", desc: "Informations l\u00e9gales" },
];

const sectionIcons: Record<string, React.ReactNode> = {
  pages: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  services: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  projets: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  blog: (
    <svg viewBox="0 0 24 24" className="w-5 h-5 stroke-accent fill-none stroke-[1.5]">
      <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      <line x1="8" y1="7" x2="16" y2="7" />
      <line x1="8" y1="11" x2="14" y2="11" />
    </svg>
  ),
};

export default function PlanDuSitePage() {
  const services = Object.entries(servicesData).map(([slug, data]) => ({
    label: data.title,
    href: `/services/${slug}`,
  }));

  const projects = Object.entries(projectsData).map(([slug, data]) => ({
    label: data.title,
    href: `/projets/${slug}`,
  }));

  const articles = Object.entries(articlesData).map(([slug, data]) => ({
    label: data.title,
    href: `/blog/${slug}`,
  }));

  const sections = [
    { key: "pages", title: "Pages principales", icon: sectionIcons.pages, items: staticPages.map((p) => ({ label: p.label, href: p.href, desc: p.desc })) },
    { key: "services", title: "Services", icon: sectionIcons.services, items: services.map((s) => ({ ...s, desc: "" })) },
    { key: "projets", title: "Projets", icon: sectionIcons.projets, items: projects.map((p) => ({ ...p, desc: "" })) },
    { key: "blog", title: "Articles de Blog", icon: sectionIcons.blog, items: articles.map((a) => ({ ...a, desc: "" })) },
  ];

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
          <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
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
            <p className="text-[0.95rem] text-white/40 mt-5 max-w-[500px] leading-[1.8] font-light">
              Retrouvez l&apos;ensemble des pages de l&apos;Agence HDS pour naviguer facilement sur notre site.
            </p>
          </div>
        </section>

        {/* Content — Card grid */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sections.map((section) => (
                <div
                  key={section.key}
                  className="rounded-2xl border border-gray-100 bg-light p-6 lg:p-8 hover:shadow-lg hover:shadow-accent/5 transition-shadow duration-300"
                >
                  {/* Section header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      {section.icon}
                    </div>
                    <div>
                      <h2 className="text-[1.1rem] font-semibold text-text-dark">
                        {section.title}
                      </h2>
                      <span className="text-[0.7rem] text-text-body">
                        {section.items.length} page{section.items.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Links */}
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className="group flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg hover:bg-accent/5 transition-colors duration-200"
                        >
                          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-accent/40 fill-none stroke-2 shrink-0 group-hover:stroke-accent transition-colors">
                            <polyline points="9 18 15 12 9 6" />
                          </svg>
                          <span className="text-[0.85rem] text-text-dark group-hover:text-accent transition-colors">
                            {item.label}
                          </span>
                          {"desc" in item && item.desc && (
                            <span className="text-[0.7rem] text-text-body ml-auto hidden sm:block">
                              {item.desc}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
