import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Politique de Confidentialité & Cookies",
  description:
    "Politique de confidentialité, gestion des cookies et protection des données personnelles du site agencehds.fr — Agence HDS, conforme RGPD.",
  openGraph: {
    title: "Politique de Confidentialité & Cookies — Agence HDS",
    description:
      "Politique de confidentialité et gestion des cookies du site agencehds.fr.",
    url: "https://agencehds.fr/politique-confidentialite",
  },
  twitter: {
    title: "Politique de Confidentialité & Cookies — Agence HDS",
    description:
      "Politique de confidentialité et gestion des cookies du site agencehds.fr.",
  },
  alternates: {
    canonical: "https://agencehds.fr/politique-confidentialite",
  },
  keywords: [
    "politique de confidentialité",
    "cookies",
    "RGPD",
    "données personnelles",
    "agence hds",
  ],
};

const sections = [
  {
    number: "01",
    title: "Responsable du traitement",
    content: (
      <div className="space-y-3">
        <p>
          Le responsable du traitement des donn&eacute;es personnelles collect&eacute;es
          sur le site agencehds.fr est :
        </p>
        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
            <p>
              <span className="text-white/40 text-xs uppercase tracking-wider">
                Raison sociale
              </span>
              <br />
              <strong className="text-white">Agence HDS</strong> (Harua Digital Studio)
            </p>
            <p>
              <span className="text-white/40 text-xs uppercase tracking-wider">
                Repr&eacute;sentant
              </span>
              <br />
              <strong className="text-white">Nans</strong>, G&eacute;rant
            </p>
            <p>
              <span className="text-white/40 text-xs uppercase tracking-wider">SIRET</span>
              <br />
              810 696 096 00041
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
              <span className="text-white/40 text-xs uppercase tracking-wider">
                T&eacute;l&eacute;phone
              </span>
              <br />
              <a href="tel:+33624633054" className="text-accent hover:underline">
                06 24 63 30 54
              </a>
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Données personnelles collectées",
    content: (
      <div className="space-y-4">
        <p>
          Nous collectons uniquement les donn&eacute;es strictement n&eacute;cessaires au
          fonctionnement de nos services. Voici le d&eacute;tail des donn&eacute;es
          collect&eacute;es selon les contextes :
        </p>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-2">
          <h4 className="text-white font-medium text-sm">Formulaire de contact</h4>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>Nom et pr&eacute;nom</li>
            <li>Adresse email</li>
            <li>Num&eacute;ro de t&eacute;l&eacute;phone (facultatif)</li>
            <li>Message / description du projet</li>
          </ul>
          <p className="text-white/40 text-xs">
            Base l&eacute;gale : consentement (article 6.1.a du RGPD)
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-2">
          <h4 className="text-white font-medium text-sm">Espace client</h4>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>Nom complet</li>
            <li>Adresse email</li>
            <li>Mot de passe (stock&eacute; sous forme chiffr&eacute;e avec bcrypt)</li>
            <li>T&eacute;l&eacute;phone, adresse, ville, entreprise</li>
          </ul>
          <p className="text-white/40 text-xs">
            Base l&eacute;gale : ex&eacute;cution contractuelle (article 6.1.b du RGPD)
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-2">
          <h4 className="text-white font-medium text-sm">Newsletter</h4>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>Adresse email</li>
          </ul>
          <p className="text-white/40 text-xs">
            Base l&eacute;gale : consentement (article 6.1.a du RGPD)
          </p>
        </div>

        <div className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-5 space-y-2">
          <h4 className="text-white font-medium text-sm">Donn&eacute;es de navigation</h4>
          <ul className="list-disc list-inside space-y-1 text-white/60">
            <li>Adresse IP (anonymis&eacute;e)</li>
            <li>Type de navigateur et syst&egrave;me d&apos;exploitation</li>
            <li>Pages visit&eacute;es et dur&eacute;e de visite</li>
          </ul>
          <p className="text-white/40 text-xs">
            Base l&eacute;gale : int&eacute;r&ecirc;t l&eacute;gitime (article 6.1.f du RGPD)
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "Finalités du traitement",
    content: (
      <div className="space-y-3">
        <p>Vos donn&eacute;es personnelles sont trait&eacute;es pour les finalit&eacute;s suivantes :</p>
        <ul className="space-y-2">
          {[
            ["Gestion des demandes", "Traitement et suivi de vos demandes de contact, devis et projets."],
            ["Espace client", "Création et gestion de votre compte, suivi de projets, facturation et support."],
            ["Communication", "Envoi de newsletters et d'informations sur nos services (uniquement avec votre consentement)."],
            ["Amélioration du site", "Analyse anonymisée de la fréquentation pour améliorer l'expérience utilisateur."],
            ["Obligations légales", "Conservation de certaines données pour répondre aux obligations comptables et fiscales."],
          ].map(([title, desc]) => (
            <li key={title} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 shrink-0" />
              <p>
                <strong className="text-white">{title}</strong>
                <br />
                <span className="text-white/60">{desc}</span>
              </p>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "04",
    title: "Durée de conservation",
    content: (
      <div className="space-y-3">
        <p>
          Vos donn&eacute;es sont conserv&eacute;es pendant la dur&eacute;e
          strictement n&eacute;cessaire &agrave; la finalit&eacute; pour laquelle
          elles ont &eacute;t&eacute; collect&eacute;es :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium text-xs uppercase tracking-wider">
                  Donn&eacute;es
                </th>
                <th className="text-left py-3 text-white/50 font-medium text-xs uppercase tracking-wider">
                  Dur&eacute;e de conservation
                </th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4">Formulaire de contact</td>
                <td className="py-3">3 ans apr&egrave;s le dernier contact</td>
              </tr>
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4">Compte client</td>
                <td className="py-3">Dur&eacute;e de la relation contractuelle + 5 ans</td>
              </tr>
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4">Newsletter</td>
                <td className="py-3">Jusqu&apos;&agrave; d&eacute;sinscription</td>
              </tr>
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4">Donn&eacute;es de facturation</td>
                <td className="py-3">10 ans (obligation comptable)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Cookies</td>
                <td className="py-3">13 mois maximum</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    number: "05",
    title: "Destinataires des données",
    content: (
      <div className="space-y-3">
        <p>
          Vos donn&eacute;es personnelles ne sont <strong className="text-white">jamais
          vendues ni c&eacute;d&eacute;es &agrave; des tiers</strong> &agrave; des fins
          commerciales. Elles peuvent &ecirc;tre transmises aux sous-traitants suivants,
          dans le cadre strict de leurs missions :
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium text-xs uppercase tracking-wider">
                  Sous-traitant
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium text-xs uppercase tracking-wider">
                  Mission
                </th>
                <th className="text-left py-3 text-white/50 font-medium text-xs uppercase tracking-wider">
                  Localisation
                </th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4">Hostinger</td>
                <td className="py-3 pr-4">H&eacute;bergement du site</td>
                <td className="py-3">UE (Chypre / Lituanie)</td>
              </tr>
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4">Supabase</td>
                <td className="py-3 pr-4">Base de donn&eacute;es</td>
                <td className="py-3">UE (Francfort)</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">Nodemailer (SMTP)</td>
                <td className="py-3 pr-4">Envoi d&apos;emails</td>
                <td className="py-3">UE</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          Tous nos sous-traitants s&apos;engagent contractuellement &agrave; respecter
          le RGPD et &agrave; mettre en &oelig;uvre les mesures de
          s&eacute;curit&eacute; ad&eacute;quates.
        </p>
      </div>
    ),
  },
  {
    number: "06",
    title: "Vos droits",
    content: (
      <div className="space-y-3">
        <p>
          Conform&eacute;ment au RGPD, vous disposez des droits suivants sur vos
          donn&eacute;es personnelles :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ["Droit d'accès", "Obtenir la confirmation que vos données sont traitées et en recevoir une copie."],
            ["Droit de rectification", "Demander la correction de données inexactes ou incomplètes."],
            ["Droit de suppression", "Demander l'effacement de vos données personnelles."],
            ["Droit d'opposition", "Vous opposer au traitement de vos données pour des motifs légitimes."],
            ["Droit à la portabilité", "Recevoir vos données dans un format structuré et lisible par machine."],
            ["Droit de limitation", "Demander la limitation du traitement dans certains cas."],
          ].map(([title, desc]) => (
            <div
              key={title}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
            >
              <h4 className="text-white font-medium text-sm mb-1">{title}</h4>
              <p className="text-white/50 text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
        <div className="bg-accent/5 border border-accent/10 rounded-xl p-5 space-y-2">
          <h4 className="text-white font-medium text-sm">Comment exercer vos droits ?</h4>
          <p>
            Envoyez votre demande par email &agrave;{" "}
            <a href="mailto:contact@agencehds.fr" className="text-accent hover:underline">
              contact@agencehds.fr
            </a>{" "}
            en pr&eacute;cisant votre nom, email et la nature de votre demande. Nous
            nous engageons &agrave; r&eacute;pondre dans un d&eacute;lai de 30 jours.
          </p>
          <p className="text-white/50 text-xs">
            Vous pouvez &eacute;galement adresser une r&eacute;clamation &agrave; la
            CNIL (Commission Nationale de l&apos;Informatique et des Libert&eacute;s) —
            cnil.fr.
          </p>
        </div>
      </div>
    ),
  },
  {
    number: "07",
    title: "Politique de cookies",
    content: (
      <div className="space-y-4">
        <p>
          Un cookie est un petit fichier texte d&eacute;pos&eacute; sur votre appareil
          lors de la visite d&apos;un site web. Il permet de stocker des informations
          relatives &agrave; votre navigation.
        </p>

        <h4 className="text-white font-medium text-sm">Types de cookies utilis&eacute;s</h4>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="text-left py-3 pr-4 text-white/50 font-medium text-xs uppercase tracking-wider">
                  Type
                </th>
                <th className="text-left py-3 pr-4 text-white/50 font-medium text-xs uppercase tracking-wider">
                  Finalit&eacute;
                </th>
                <th className="text-left py-3 text-white/50 font-medium text-xs uppercase tracking-wider">
                  Dur&eacute;e
                </th>
              </tr>
            </thead>
            <tbody className="text-white/60">
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4">
                  <strong className="text-white/80">Essentiels</strong>
                </td>
                <td className="py-3 pr-4">
                  Authentification, session utilisateur, s&eacute;curit&eacute;. Ces
                  cookies sont indispensables au fonctionnement du site.
                </td>
                <td className="py-3">Session / 30 jours</td>
              </tr>
              <tr className="border-b border-white/[0.04]">
                <td className="py-3 pr-4">
                  <strong className="text-white/80">Fonctionnels</strong>
                </td>
                <td className="py-3 pr-4">
                  Pr&eacute;f&eacute;rences d&apos;accessibilit&eacute; (taille de
                  police, contraste, mode daltonien), th&egrave;me du site.
                </td>
                <td className="py-3">1 an</td>
              </tr>
              <tr>
                <td className="py-3 pr-4">
                  <strong className="text-white/80">Consentement</strong>
                </td>
                <td className="py-3 pr-4">
                  M&eacute;morisation de votre choix concernant les cookies.
                </td>
                <td className="py-3">13 mois</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p>
          <strong className="text-white">Note :</strong> ce site n&apos;utilise
          actuellement pas de cookies publicitaires ni de traceurs tiers &agrave; des
          fins de ciblage.
        </p>
      </div>
    ),
  },
  {
    number: "08",
    title: "Gérer vos cookies",
    content: (
      <div className="space-y-3">
        <p>
          Vous pouvez &agrave; tout moment g&eacute;rer vos pr&eacute;f&eacute;rences
          en mati&egrave;re de cookies. Voici comment proc&eacute;der selon votre
          navigateur :
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            ["Google Chrome", "Paramètres → Confidentialité et sécurité → Cookies et autres données de sites"],
            ["Firefox", "Paramètres → Vie privée et sécurité → Cookies et données de sites"],
            ["Safari", "Préférences → Confidentialité → Gérer les données de sites web"],
            ["Edge", "Paramètres → Cookies et autorisations de sites → Gérer et supprimer les cookies"],
          ].map(([browser, instructions]) => (
            <div
              key={browser}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
            >
              <h4 className="text-white font-medium text-sm mb-1">{browser}</h4>
              <p className="text-white/50 text-xs leading-relaxed">{instructions}</p>
            </div>
          ))}
        </div>
        <p>
          <strong className="text-white">Attention :</strong> la d&eacute;sactivation
          de certains cookies essentiels peut affecter le fonctionnement du site,
          notamment l&apos;acc&egrave;s &agrave; votre espace client.
        </p>
      </div>
    ),
  },
  {
    number: "09",
    title: "Sécurité des données",
    content: (
      <div className="space-y-3">
        <p>
          L&apos;Agence HDS met en &oelig;uvre les mesures techniques et
          organisationnelles appropri&eacute;es pour prot&eacute;ger vos
          donn&eacute;es personnelles contre tout acc&egrave;s non autoris&eacute;,
          modification, divulgation ou destruction :
        </p>
        <ul className="space-y-2">
          {[
            "Chiffrement des mots de passe (bcrypt avec salt)",
            "Connexions sécurisées HTTPS (certificat SSL/TLS)",
            "Accès restreint aux données (authentification et contrôle des rôles)",
            "Hébergement sur des serveurs sécurisés en Union Européenne",
            "Mises à jour régulières des dépendances et correctifs de sécurité",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 mt-2 shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    number: "10",
    title: "Modifications de cette politique",
    content: (
      <div className="space-y-3">
        <p>
          L&apos;Agence HDS se r&eacute;serve le droit de modifier la pr&eacute;sente
          politique de confidentialit&eacute; &agrave; tout moment afin de
          l&apos;adapter aux &eacute;volutions l&eacute;gislatives et
          r&eacute;glementaires ou &agrave; l&apos;&eacute;volution de ses services.
        </p>
        <p>
          Toute modification substantielle sera signal&eacute;e sur cette page. Nous
          vous invitons &agrave; consulter r&eacute;guli&egrave;rement cette page pour
          rester inform&eacute; de nos pratiques en mati&egrave;re de protection des
          donn&eacute;es.
        </p>
        <p>
          Pour toute question relative &agrave; cette politique, contactez-nous &agrave;
          :{" "}
          <a href="mailto:contact@agencehds.fr" className="text-accent hover:underline">
            contact@agencehds.fr
          </a>
        </p>
      </div>
    ),
  },
];

export default function PolitiqueConfidentialitePage() {
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
                { label: "Politique de Confidentialité" },
              ]}
            />
            <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
              RGPD &amp; Cookies
            </span>
            <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
              <span className="font-light">Politique de </span>
              <span className="font-serif italic text-accent">confidentialit&eacute;.</span>
            </h1>
            <p className="text-white/50 text-[0.88rem] mt-4 max-w-[550px] leading-[1.7]">
              D&eacute;couvrez comment nous prot&eacute;geons vos donn&eacute;es
              personnelles et g&eacute;rons les cookies sur notre site, en toute
              transparence et conform&eacute;ment au RGPD.
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

            {/* Cross links */}
            <div className="mt-12 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-white/30 text-[0.75rem]">
                Derni&egrave;re mise &agrave; jour : F&eacute;vrier 2026
              </p>
              <Link
                href="/mentions-legales"
                className="text-accent text-[0.8rem] hover:underline"
              >
                Voir les mentions l&eacute;gales &rarr;
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
