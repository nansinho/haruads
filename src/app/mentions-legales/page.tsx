import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Mentions Légales",
  description:
    "Mentions légales du site agencehds.fr — Agence HDS (Harua Digital Studio), auto-entrepreneur basé à Gardanne, Aix-en-Provence. Informations légales, RGPD et conditions.",
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
  keywords: [
    "mentions légales",
    "agence hds",
    "conditions générales",
    "agence web gardanne",
    "RGPD",
  ],
};

const sections = [
  {
    number: "01",
    title: "Éditeur du site",
    content: (
      <div className="space-y-3">
        <p>
          Le site <strong className="text-white">agencehds.fr</strong> est
          &eacute;dit&eacute; par :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">Raison sociale</span>
            <br />
            <strong className="text-white">Agence HDS</strong> (Harua Digital Studio)
          </p>
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">Statut juridique</span>
            <br />
            Auto-entrepreneur (Micro-entreprise)
          </p>
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">SIRET</span>
            <br />
            <strong className="text-white">810 696 096 00041</strong>
          </p>
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">
              Responsable de publication
            </span>
            <br />
            <strong className="text-white">Nans</strong>, en qualit&eacute; de g&eacute;rant
          </p>
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">Adresse</span>
            <br />
            Gardanne (13120), France
          </p>
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">Email</span>
            <br />
            <a href="mailto:contact@agencehds.fr" className="text-accent hover:underline">
              contact@agencehds.fr
            </a>
          </p>
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">T&eacute;l&eacute;phone</span>
            <br />
            <a href="tel:+33624633054" className="text-accent hover:underline">
              06 24 63 30 54
            </a>
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Hébergement",
    content: (
      <div className="space-y-2">
        <p>Le site agencehds.fr est h&eacute;berg&eacute; par :</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">H&eacute;bergeur</span>
            <br />
            <strong className="text-white">Hostinger International Ltd.</strong>
          </p>
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">Adresse</span>
            <br />
            61 Lordou Vironos Street, 6023 Larnaca, Chypre
          </p>
          <p>
            <span className="text-white/40 text-xs uppercase tracking-wider">Site web</span>
            <br />
            hostinger.fr
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Propriété intellectuelle",
    content: (
      <div className="space-y-3">
        <p>
          L&apos;ensemble du contenu pr&eacute;sent sur le site agencehds.fr — incluant, de
          mani&egrave;re non limitative, les textes, images, photographies, vid&eacute;os,
          graphismes, logos, ic&ocirc;nes, sons, logiciels, mises en page et base de
          donn&eacute;es — est la propri&eacute;t&eacute; exclusive de l&apos;Agence HDS
          ou de ses partenaires et est prot&eacute;g&eacute; par les lois
          fran&ccedil;aises et internationales relatives &agrave; la propri&eacute;t&eacute;
          intellectuelle.
        </p>
        <p>
          Toute reproduction, repr&eacute;sentation, modification, publication, distribution,
          retransmission, ou exploitation commerciale de tout ou partie des
          &eacute;l&eacute;ments du site, par quelque proc&eacute;d&eacute; que ce
          soit, sans l&apos;autorisation &eacute;crite pr&eacute;alable de l&apos;Agence
          HDS, est strictement interdite et constitue une contrefa&ccedil;on
          sanctionn&eacute;e par les articles L.335-2 et suivants du Code de la
          Propri&eacute;t&eacute; Intellectuelle.
        </p>
      </div>
    ),
  },
  {
    number: "04",
    title: "Protection des données personnelles (RGPD)",
    content: (
      <div className="space-y-3">
        <p>
          Conform&eacute;ment au R&egrave;glement G&eacute;n&eacute;ral sur la Protection
          des Donn&eacute;es (RGPD — R&egrave;glement UE 2016/679) et &agrave; la loi
          n&deg;78-17 du 6 janvier 1978 dite &laquo; Informatique et Libert&eacute;s
          &raquo; modifi&eacute;e, l&apos;Agence HDS s&apos;engage &agrave;
          prot&eacute;ger la vie priv&eacute;e des utilisateurs de son site.
        </p>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-3">
          <h4 className="text-white font-medium text-sm">Donn&eacute;es collect&eacute;es</h4>
          <p>
            Les donn&eacute;es personnelles collect&eacute;es sur ce site sont
            limit&eacute;es au strict n&eacute;cessaire et incluent :
          </p>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>
              <strong className="text-white/80">Formulaire de contact :</strong> nom, email,
              t&eacute;l&eacute;phone, message
            </li>
            <li>
              <strong className="text-white/80">Espace client :</strong> nom, email, mot de passe
              (chiffr&eacute;), t&eacute;l&eacute;phone, adresse, entreprise
            </li>
            <li>
              <strong className="text-white/80">Newsletter :</strong> adresse email
            </li>
            <li>
              <strong className="text-white/80">Cookies :</strong> donn&eacute;es de navigation
              (voir section d&eacute;di&eacute;e)
            </li>
          </ul>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-3">
          <h4 className="text-white font-medium text-sm">Finalit&eacute;s du traitement</h4>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>R&eacute;pondre aux demandes de contact et devis</li>
            <li>G&eacute;rer l&apos;acc&egrave;s &agrave; l&apos;espace client</li>
            <li>Envoyer des communications commerciales (avec consentement)</li>
            <li>Am&eacute;liorer l&apos;exp&eacute;rience utilisateur du site</li>
          </ul>
        </div>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-3">
          <h4 className="text-white font-medium text-sm">Vos droits</h4>
          <p>Vous disposez des droits suivants concernant vos donn&eacute;es personnelles :</p>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>
              <strong className="text-white/80">Droit d&apos;acc&egrave;s :</strong> obtenir la
              confirmation que vos donn&eacute;es sont trait&eacute;es et en recevoir une copie
            </li>
            <li>
              <strong className="text-white/80">Droit de rectification :</strong> demander la
              correction de donn&eacute;es inexactes
            </li>
            <li>
              <strong className="text-white/80">Droit de suppression :</strong> demander
              l&apos;effacement de vos donn&eacute;es
            </li>
            <li>
              <strong className="text-white/80">Droit d&apos;opposition :</strong> vous opposer au
              traitement de vos donn&eacute;es
            </li>
            <li>
              <strong className="text-white/80">Droit &agrave; la portabilit&eacute; :</strong>{" "}
              recevoir vos donn&eacute;es dans un format structur&eacute;
            </li>
            <li>
              <strong className="text-white/80">Droit de limitation :</strong> demander la limitation
              du traitement
            </li>
          </ul>
          <p>
            Pour exercer vos droits, contactez-nous &agrave; :{" "}
            <a href="mailto:contact@agencehds.fr" className="text-accent hover:underline">
              contact@agencehds.fr
            </a>
          </p>
        </div>
        <p>
          Les donn&eacute;es personnelles ne sont ni vendues, ni c&eacute;d&eacute;es
          &agrave; des tiers &agrave; des fins commerciales. Elles sont
          conserv&eacute;es pour la dur&eacute;e n&eacute;cessaire au traitement de
          votre demande ou conform&eacute;ment aux obligations l&eacute;gales en
          vigueur.
        </p>
        <p>
          En cas de litige, vous pouvez &eacute;galement adresser une
          r&eacute;clamation &agrave; la{" "}
          <strong className="text-white">
            Commission Nationale de l&apos;Informatique et des Libert&eacute;s (CNIL)
          </strong>{" "}
          — cnil.fr.
        </p>
      </div>
    ),
  },
  {
    number: "05",
    title: "Cookies",
    content: (
      <div className="space-y-3">
        <p>
          Ce site utilise des cookies pour assurer son bon fonctionnement et
          am&eacute;liorer votre exp&eacute;rience de navigation. Les cookies sont de
          petits fichiers texte stock&eacute;s sur votre appareil lors de votre visite.
        </p>
        <p>
          Pour en savoir plus sur les cookies utilis&eacute;s, leurs finalit&eacute;s et
          la mani&egrave;re de les g&eacute;rer, consultez notre{" "}
          <Link
            href="/politique-confidentialite"
            className="text-accent hover:underline font-medium"
          >
            Politique de Confidentialit&eacute; &amp; Cookies
          </Link>
          .
        </p>
        <p>
          Vous pouvez &agrave; tout moment modifier vos pr&eacute;f&eacute;rences en
          mati&egrave;re de cookies via les param&egrave;tres de votre navigateur.
        </p>
      </div>
    ),
  },
  {
    number: "06",
    title: "Limitation de responsabilité",
    content: (
      <div className="space-y-3">
        <p>
          L&apos;Agence HDS s&apos;efforce de fournir des informations aussi
          pr&eacute;cises et &agrave; jour que possible sur ce site. Toutefois, elle ne
          saurait garantir l&apos;exactitude, la compl&eacute;tude ou
          l&apos;actualit&eacute; des informations diffus&eacute;es.
        </p>
        <p>
          En cons&eacute;quence, l&apos;Agence HDS d&eacute;cline toute
          responsabilit&eacute; pour les &eacute;ventuelles impr&eacute;cisions,
          inexactitudes ou omissions portant sur des informations disponibles sur le
          site, ainsi que pour tout dommage r&eacute;sultant d&apos;une intrusion
          frauduleuse d&apos;un tiers ayant entra&icirc;n&eacute; une modification des
          informations.
        </p>
        <p>
          Les liens hypertextes pr&eacute;sents sur ce site peuvent renvoyer vers
          d&apos;autres sites internet. L&apos;Agence HDS ne saurait &ecirc;tre tenue
          responsable du contenu de ces sites externes.
        </p>
      </div>
    ),
  },
  {
    number: "07",
    title: "Droit applicable et juridiction",
    content: (
      <div className="space-y-3">
        <p>
          Les pr&eacute;sentes mentions l&eacute;gales sont r&eacute;gies par le droit
          fran&ccedil;ais. En cas de litige et &agrave; d&eacute;faut de
          r&eacute;solution amiable, les tribunaux fran&ccedil;ais seront seuls
          comp&eacute;tents pour en conna&icirc;tre.
        </p>
        <p>
          Conform&eacute;ment aux dispositions du Code de la consommation concernant le
          r&egrave;glement amiable des litiges, l&apos;utilisateur peut recourir au
          service de m&eacute;diation de son choix. Tout litige relatif au
          pr&eacute;sent site rel&egrave;ve de la comp&eacute;tence exclusive des
          juridictions du ressort de la Cour d&apos;appel d&apos;Aix-en-Provence.
        </p>
      </div>
    ),
  },
  {
    number: "08",
    title: "Crédits",
    content: (
      <div className="space-y-2">
        <p>
          <span className="text-white/40 text-xs uppercase tracking-wider">
            Conception &amp; D&eacute;veloppement
          </span>
          <br />
          <strong className="text-white">Agence HDS</strong> — agencehds.fr
        </p>
        <p>
          <span className="text-white/40 text-xs uppercase tracking-wider">
            Technologies
          </span>
          <br />
          Next.js, React, Tailwind CSS, Supabase
        </p>
      </div>
    ),
  },
];

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
            <Breadcrumb
              items={[
                { label: "Accueil", href: "/" },
                { label: "Mentions Légales" },
              ]}
            />
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              L&eacute;gal
            </span>
            <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Mentions </span>
              <span className="font-serif italic text-accent">l&eacute;gales.</span>
            </h1>
            <p className="text-white/50 text-[0.88rem] mt-4 max-w-[500px] leading-[1.7]">
              Informations l&eacute;gales, protection des donn&eacute;es et conditions
              d&apos;utilisation du site agencehds.fr.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="bg-dark text-white/70 border-t border-white/[0.04]">
          <div className="max-w-[900px] mx-auto px-5 py-[80px] lg:px-12">
            <div className="space-y-0">
              {sections.map((section, index) => (
                <div
                  key={section.number}
                  className={`py-10 ${index !== sections.length - 1 ? "border-b border-white/[0.06]" : ""}`}
                >
                  <div className="flex items-start gap-5">
                    <span className="text-accent/30 font-mono text-[0.75rem] font-bold mt-1.5 shrink-0">
                      {section.number}
                    </span>
                    <div className="flex-1">
                      <h2 className="text-[1.2rem] font-semibold text-white mb-5">
                        {section.title}
                      </h2>
                      <div className="text-[0.88rem] leading-[1.8] space-y-3">
                        {section.content}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Last update */}
            <div className="mt-12 pt-8 border-t border-white/[0.06] text-center">
              <p className="text-white/30 text-[0.75rem]">
                Derni&egrave;re mise &agrave; jour : F&eacute;vrier 2026
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
