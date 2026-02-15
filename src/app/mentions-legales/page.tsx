import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales du site agencehds.fr — Agence HDS (Harua Digital Studio), auto-entrepreneur basé à Gardanne, Aix-en-Provence.",
  openGraph: {
    title: "Mentions Légales — Agence HDS",
    description:
      "Mentions légales du site agencehds.fr — Agence HDS, auto-entrepreneur à Gardanne.",
    url: "https://agencehds.fr/mentions-legales",
  },
  twitter: {
    title: "Mentions Légales — Agence HDS",
    description:
      "Mentions légales du site agencehds.fr — Agence HDS, auto-entrepreneur à Gardanne.",
  },
  alternates: {
    canonical: "https://agencehds.fr/mentions-legales",
  },
};

export default function MentionsLegalesPage() {
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
              { label: "Mentions Légales" },
            ]} />
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              Légal
            </span>
            <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Mentions </span>
              <span className="font-serif italic text-accent">légales.</span>
            </h1>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[800px] mx-auto px-5 py-[80px] lg:px-12">
            <div className="space-y-10">
              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  1. Éditeur du site
                </h2>
                <div className="text-[0.88rem] text-text-body leading-[1.8] space-y-2">
                  <p><strong>Raison sociale :</strong> Agence HDS (Harua Digital Studio)</p>
                  <p><strong>Statut juridique :</strong> Auto-entrepreneur</p>
                  <p><strong>Responsable de publication :</strong> Nans</p>
                  <p><strong>Adresse :</strong> Gardanne (13120), France</p>
                  <p><strong>Email :</strong> <a href="mailto:contact@agencehds.fr" className="text-accent hover:underline">contact@agencehds.fr</a></p>
                  <p><strong>Téléphone :</strong> <a href="tel:+33624633054" className="text-accent hover:underline">06 24 63 30 54</a></p>
                </div>
              </div>

              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  2. Hébergement
                </h2>
                <div className="text-[0.88rem] text-text-body leading-[1.8] space-y-2">
                  <p><strong>Hébergeur :</strong> Hostinger International Ltd.</p>
                  <p><strong>Adresse :</strong> 61 Lordou Vironos Street, 6023 Larnaca, Chypre</p>
                  <p><strong>Site web :</strong> hostinger.fr</p>
                </div>
              </div>

              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  3. Propriété intellectuelle
                </h2>
                <p className="text-[0.88rem] text-text-body leading-[1.8]">
                  L&apos;ensemble du contenu de ce site (textes, images, vidéos, logos, icônes,
                  sons, logiciels, etc.) est la propriété exclusive de l&apos;Agence HDS ou de ses
                  partenaires. Toute reproduction, représentation, modification, publication,
                  adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le
                  procédé utilisé, est interdite, sauf autorisation écrite préalable de l&apos;Agence HDS.
                </p>
              </div>

              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  4. Protection des données personnelles
                </h2>
                <div className="text-[0.88rem] text-text-body leading-[1.8] space-y-3">
                  <p>
                    Conformément au Règlement Général sur la Protection des Données (RGPD) et à la
                    loi Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de
                    rectification, de suppression et d&apos;opposition aux données personnelles vous
                    concernant.
                  </p>
                  <p>
                    Les données personnelles collectées via le formulaire de contact sont uniquement
                    utilisées pour répondre à vos demandes. Elles ne sont ni vendues, ni transmises
                    à des tiers.
                  </p>
                  <p>
                    Pour exercer vos droits, contactez-nous à : <a href="mailto:contact@agencehds.fr" className="text-accent hover:underline">contact@agencehds.fr</a>
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  5. Cookies
                </h2>
                <p className="text-[0.88rem] text-text-body leading-[1.8]">
                  Ce site peut utiliser des cookies à des fins de mesure d&apos;audience et
                  d&apos;amélioration de l&apos;expérience utilisateur. Vous pouvez configurer votre
                  navigateur pour refuser les cookies.
                </p>
              </div>

              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  6. Limitation de responsabilité
                </h2>
                <p className="text-[0.88rem] text-text-body leading-[1.8]">
                  L&apos;Agence HDS s&apos;efforce de fournir des informations aussi précises que
                  possible sur ce site. Toutefois, elle ne pourra être tenue responsable des
                  omissions, inexactitudes et carences dans la mise à jour, qu&apos;elles soient de
                  son fait ou du fait des tiers partenaires qui lui fournissent ces informations.
                </p>
              </div>

              <div>
                <h2 className="text-[1.3rem] font-semibold text-text-dark mb-4">
                  7. Droit applicable
                </h2>
                <p className="text-[0.88rem] text-text-body leading-[1.8]">
                  Le présent site et ses mentions légales sont régis par le droit français.
                  En cas de litige, les tribunaux français seront seuls compétents.
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
