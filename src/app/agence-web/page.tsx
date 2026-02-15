import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { citiesData, citySlugs } from "@/data/cities";
import PacaMap from "@/components/city/PacaMap";

export const metadata: Metadata = {
  title: "Agence Web PACA | Zones d'intervention | Agence HDS",
  description:
    "Agence HDS intervient dans toute la région PACA et au-delà : Marseille, Aix-en-Provence, Toulon, Avignon, Nice, Lyon. Création de sites internet et solutions digitales.",
  alternates: {
    canonical: "https://agencehds.fr/agence-web",
  },
  openGraph: {
    title: "Agence Web PACA | Zones d'intervention | Agence HDS",
    description:
      "Découvrez nos zones d'intervention. Agence web basée à Gardanne, nous accompagnons les entreprises de toute la région PACA.",
    url: "https://agencehds.fr/agence-web",
  },
};

export default function AgenceWebHub() {
  const allCities = citySlugs.map((slug) => citiesData[slug]);

  const mapCities = allCities.map((c) => ({
    name: c.name,
    slug: c.slug,
    latitude: c.latitude,
    longitude: c.longitude,
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
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
            <nav aria-label="Fil d'Ariane" className="mb-6">
              <ol className="flex items-center flex-wrap gap-1 text-[0.78rem]">
                <li className="flex items-center gap-1">
                  <a
                    href="/"
                    className="text-white/40 hover:text-accent transition-colors"
                  >
                    Accueil
                  </a>
                </li>
                <li className="flex items-center gap-1">
                  <span className="text-white/20 mx-1">/</span>
                  <span className="text-white/70">Agence Web</span>
                </li>
              </ol>
            </nav>

            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent/60 font-mono">
              Zones d&apos;intervention
            </span>

            <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em] mt-3">
              <span className="font-light">Agence Web en </span>
              <span className="font-serif italic">PACA & au-delà</span>
            </h1>

            <p className="text-[0.95rem] text-white/40 max-w-[600px] leading-[1.8] font-light mt-4">
              Basée à Gardanne, entre Aix-en-Provence et Marseille, Agence HDS
              accompagne les entreprises de toute la région Provence-Alpes-Côte
              d&apos;Azur et au-delà dans leur transformation digitale.
            </p>
          </div>
        </section>

        {/* Map */}
        <section className="bg-dark text-white pb-16">
          <div className="max-w-[1200px] mx-auto px-5 lg:px-12">
            <PacaMap cities={mapCities} />
          </div>
        </section>

        {/* Cities Grid */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="text-center max-w-[600px] mx-auto mb-14">
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                {allCities.length} villes
              </span>
              <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Nos zones </span>
                <span className="font-serif italic">d&apos;intervention.</span>
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {allCities
                .sort((a, b) => a.distanceFromAgency - b.distanceFromAgency)
                .map((city) => (
                  <Link
                    key={city.slug}
                    href={`/agence-web/${city.slug}`}
                    className="flex items-center gap-4 p-5 bg-light rounded-xl border border-gray-100 group hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-dark transition-all duration-300">
                      <MapPin size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[1rem] font-semibold text-text-dark group-hover:text-accent transition-colors">
                        Agence Web {city.name}
                      </h3>
                      <p className="text-[0.78rem] text-text-body mt-0.5">
                        {city.department} ({city.departmentCode}) —{" "}
                        {city.distanceFromAgency === 0
                          ? "Notre ville"
                          : `À ${city.distanceFromAgency} km`}
                      </p>
                    </div>
                    <ArrowRight
                      size={16}
                      className="text-accent/40 group-hover:text-accent group-hover:translate-x-1 transition-all shrink-0"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="text-center max-w-[600px] mx-auto">
              <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                <span className="font-light">Votre ville n&apos;est pas </span>
                <span className="font-serif italic text-accent">
                  listée ?
                </span>
              </h2>
              <p className="text-[0.9rem] text-white/40 mt-4 leading-[1.7]">
                Nous intervenons partout en France. Contactez-nous pour discuter
                de votre projet, quelle que soit votre localisation.
              </p>
              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-medium text-[0.9rem] hover:opacity-90 transition-opacity"
                >
                  Nous contacter
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
