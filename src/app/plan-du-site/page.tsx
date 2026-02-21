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
];

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
