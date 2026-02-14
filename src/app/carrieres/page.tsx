import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Carrières",
  description:
    "Informations sur les opportunités de carrière et stages chez Agence HDS, agence web à Aix-en-Provence.",
  alternates: {
    canonical: "https://agencehds.fr/carrieres",
  },
};

export default function CarrieresPage() {
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
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Carrières
            </span>
            <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Rejoindre </span>
              <span className="font-serif italic text-accent">l&apos;équipe.</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[800px] mx-auto px-5 py-[80px] lg:px-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-[1.4rem] lg:text-[1.8rem] leading-[1.1] tracking-[-0.02em] mb-6">
                  <span className="font-light">Pas d&apos;offres </span>
                  <span className="font-serif italic">pour le moment.</span>
                </h2>
                <div className="text-[0.88rem] text-text-body leading-[1.8] space-y-4">
                  <p>
                    L&apos;Agence HDS est une structure à taille humaine. Nous ne proposons
                    actuellement pas de postes ouverts ni de stages.
                  </p>
                  <p>
                    Nous ne sommes pas en mesure d&apos;accueillir de stagiaires pour le moment.
                    Nous vous remercions de votre compréhension.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-xl bg-accent/5 border border-accent/10">
                <h3 className="text-[0.95rem] font-semibold text-text-dark mb-3">
                  Candidature spontanée
                </h3>
                <p className="text-[0.85rem] text-text-body leading-[1.7]">
                  Si vous êtes passionné par le web et souhaitez collaborer avec nous sur
                  un projet freelance, n&apos;hésitez pas à nous contacter à{" "}
                  <a
                    href="mailto:contact@agencehds.fr"
                    className="text-accent hover:underline font-semibold"
                  >
                    contact@agencehds.fr
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
