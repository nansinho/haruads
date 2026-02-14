"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const servicesData: Record<
  string,
  {
    num: string;
    title: string;
    subtitle: string;
    description: string;
    features: { title: string; desc: string }[];
    technologies: string[];
    process: { step: string; title: string; desc: string }[];
  }
> = {
  "developpement-web": {
    num: "01",
    title: "Développement Web",
    subtitle: "Sites et applications web performantes avec les technologies modernes.",
    description:
      "Nous concevons des solutions web sur mesure, du site vitrine à la plateforme SaaS complexe. Notre stack technique (React, Next.js, Supabase) garantit des performances optimales, une maintenance facilitée et une scalabilité sans limites.",
    features: [
      {
        title: "Sites vitrines responsive",
        desc: "Des sites élégants, rapides et parfaitement adaptés à tous les écrans.",
      },
      {
        title: "Applications web sur mesure",
        desc: "Des apps métier, dashboards et outils internes taillés pour vos processus.",
      },
      {
        title: "Plateformes SaaS",
        desc: "Architecture multi-tenant, gestion d\u2019abonnements et facturation intégrée.",
      },
      {
        title: "API & Intégrations",
        desc: "Connexion à vos outils existants via API REST, GraphQL ou webhooks.",
      },
    ],
    technologies: ["React", "Next.js", "TypeScript", "Supabase", "Tailwind CSS", "Vercel"],
    process: [
      { step: "01", title: "Analyse", desc: "Audit de vos besoins et définition du cahier des charges." },
      { step: "02", title: "Architecture", desc: "Choix techniques et structuration du projet." },
      { step: "03", title: "Développement", desc: "Sprints itératifs avec demos régulières." },
      { step: "04", title: "Déploiement", desc: "Mise en production, tests et formation." },
    ],
  },
  "solutions-saas": {
    num: "02",
    title: "Solutions SaaS",
    subtitle: "Des plateformes cloud scalables et s\u00e9curis\u00e9es pour votre business.",
    description:
      "Nous concevons des plateformes SaaS compl\u00e8tes, de l\u2019architecture multi-tenant \u00e0 la gestion des abonnements. Notre expertise Supabase et Next.js garantit des solutions performantes, s\u00e9curis\u00e9es et \u00e9volutives.",
    features: [
      {
        title: "Architecture multi-tenant",
        desc: "Isolation des donn\u00e9es par client avec une base de code unique et maintenable.",
      },
      {
        title: "Dashboards admin",
        desc: "Interfaces d\u2019administration riches pour g\u00e9rer utilisateurs, donn\u00e9es et analytics.",
      },
      {
        title: "Gestion d\u2019abonnements",
        desc: "Int\u00e9gration Stripe pour facturation r\u00e9currente, essais gratuits et upgrades.",
      },
      {
        title: "Authentification & r\u00f4les",
        desc: "Syst\u00e8me de permissions granulaire avec SSO, 2FA et gestion des \u00e9quipes.",
      },
    ],
    technologies: ["Next.js", "Supabase", "Stripe", "PostgreSQL", "TypeScript", "Vercel"],
    process: [
      { step: "01", title: "Discovery", desc: "Analyse du mod\u00e8le business et des besoins utilisateurs." },
      { step: "02", title: "Architecture", desc: "Conception technique, mod\u00e8le de donn\u00e9es et s\u00e9curit\u00e9." },
      { step: "03", title: "D\u00e9veloppement", desc: "Sprints it\u00e9ratifs avec d\u00e9mos et feedback continu." },
      { step: "04", title: "Lancement", desc: "D\u00e9ploiement, monitoring et onboarding des premiers clients." },
    ],
  },
  "intelligence-artificielle": {
    num: "03",
    title: "Intelligence Artificielle",
    subtitle: "L\u2019IA au service de votre entreprise, concr\u00e8tement.",
    description:
      "Nous int\u00e9grons l\u2019intelligence artificielle dans vos processus m\u00e9tier : chatbots, automatisation, analyse de donn\u00e9es et g\u00e9n\u00e9ration de contenu. Pas de buzzwords, des solutions concr\u00e8tes qui cr\u00e9ent de la valeur.",
    features: [
      {
        title: "Chatbots IA",
        desc: "Assistants conversationnels intelligents pour le support client et la vente.",
      },
      {
        title: "Automatisation",
        desc: "Automatisation des t\u00e2ches r\u00e9p\u00e9titives avec des workflows IA sur mesure.",
      },
      {
        title: "Int\u00e9gration API IA",
        desc: "Connexion \u00e0 OpenAI, Claude, Mistral et autres mod\u00e8les pour vos apps.",
      },
      {
        title: "Analyse intelligente",
        desc: "Extraction d\u2019insights et pr\u00e9dictions \u00e0 partir de vos donn\u00e9es existantes.",
      },
    ],
    technologies: ["OpenAI API", "Claude API", "LangChain", "Python", "Next.js", "Supabase"],
    process: [
      { step: "01", title: "Audit", desc: "Identification des cas d\u2019usage IA \u00e0 fort impact dans votre activit\u00e9." },
      { step: "02", title: "Prototypage", desc: "POC rapide pour valider la faisabilit\u00e9 et la valeur ajout\u00e9e." },
      { step: "03", title: "D\u00e9veloppement", desc: "Int\u00e9gration production avec monitoring et fine-tuning." },
      { step: "04", title: "Optimisation", desc: "Am\u00e9lioration continue des performances et des co\u00fbts." },
    ],
  },
  "design-uiux": {
    num: "04",
    title: "Design UI/UX",
    subtitle: "Des interfaces qui marquent les esprits et convertissent les visiteurs.",
    description:
      "Le design n\u2019est pas qu\u2019une question d\u2019esthétique : c\u2019est un levier de conversion. Nous créons des interfaces intuitives, accessibles et mémorables qui transforment vos utilisateurs en ambassadeurs.",
    features: [
      {
        title: "Recherche utilisateur",
        desc: "Personas, parcours utilisateur et tests pour comprendre vos cibles.",
      },
      {
        title: "Wireframes & Prototypes",
        desc: "Validation rapide des concepts avant tout investissement visuel.",
      },
      {
        title: "Design System",
        desc: "Composants réutilisables pour une cohérence visuelle à long terme.",
      },
      {
        title: "Maquettes Figma",
        desc: "Designs pixel-perfect livrés dans un format collaboratif et évolutif.",
      },
    ],
    technologies: ["Figma", "Framer", "Adobe Suite", "Maze", "Hotjar", "Storybook"],
    process: [
      { step: "01", title: "Découverte", desc: "Immersion dans votre univers, vos utilisateurs et concurrents." },
      { step: "02", title: "Idéation", desc: "Exploration créative et wireframes basse fidélité." },
      { step: "03", title: "Design", desc: "Maquettes haute fidélité et prototypes interactifs." },
      { step: "04", title: "Validation", desc: "Tests utilisateurs et itérations finales." },
    ],
  },
  "e-commerce": {
    num: "05",
    title: "E-Commerce",
    subtitle: "Des boutiques en ligne qui vendent, pas juste qui existent.",
    description:
      "Nous créons des expériences e-commerce complètes : de la fiche produit au tunnel de paiement, chaque détail est pensé pour maximiser vos conversions et fidéliser vos clients.",
    features: [
      {
        title: "Boutique sur mesure",
        desc: "Interface adaptée à votre marque, pas un template générique.",
      },
      {
        title: "Paiement sécurisé",
        desc: "Intégration Stripe, Monetico et solutions bancaires françaises.",
      },
      {
        title: "Gestion produits",
        desc: "Back-office intuitif pour gérer catalogue, stocks et promotions.",
      },
      {
        title: "Analytics avancés",
        desc: "Suivi des conversions, paniers abandonnés et comportements d\u2019achat.",
      },
    ],
    technologies: ["Next.js", "Stripe", "WooCommerce", "Monetico", "Supabase", "Vercel"],
    process: [
      { step: "01", title: "Stratégie", desc: "Analyse du marché, positionnement et objectifs de vente." },
      { step: "02", title: "Catalogue", desc: "Architecture produits, catégories et filtres." },
      { step: "03", title: "Développement", desc: "Front-end, back-office et intégration paiement." },
      { step: "04", title: "Lancement", desc: "Tests, optimisation et suivi des performances." },
    ],
  },
  "branding-seo": {
    num: "06",
    title: "Branding & SEO",
    subtitle: "Une identité forte et une visibilité maximale sur le web.",
    description:
      "Votre marque mérite d\u2019être vue et reconnue. Nous construisons des identités visuelles cohérentes et des stratégies SEO durables pour vous positionner en première page.",
    features: [
      {
        title: "Identité visuelle",
        desc: "Logo, palette de couleurs, typographies et guidelines de marque.",
      },
      {
        title: "Charte graphique",
        desc: "Document complet pour assurer la cohérence sur tous vos supports.",
      },
      {
        title: "SEO technique",
        desc: "Audit, optimisation on-page, vitesse, balisage et indexation.",
      },
      {
        title: "Stratégie de contenu",
        desc: "Mots-clés, calendrier éditorial et optimisation des pages.",
      },
    ],
    technologies: ["Figma", "Google Search Console", "SEMrush", "Ahrefs", "Google Analytics", "Lighthouse"],
    process: [
      { step: "01", title: "Audit", desc: "Analyse de l\u2019existant, concurrence et opportunités." },
      { step: "02", title: "Stratégie", desc: "Positionnement, mots-clés et plan d\u2019action." },
      { step: "03", title: "Création", desc: "Design de l\u2019identité et optimisations SEO." },
      { step: "04", title: "Suivi", desc: "Reporting mensuel et ajustements continus." },
    ],
  },
};

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];

  if (!service) {
    return (
      <>
        <Navbar />
        <main className="bg-dark text-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[2rem] font-serif italic text-accent">Service introuvable</h1>
            <p className="text-white/40 mt-4">
              <a href="/services" className="text-accent hover:underline">
                Retour aux services
              </a>
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
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
          <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <a
                href="/services"
                className="inline-flex items-center gap-2 text-[0.78rem] text-white/40 hover:text-accent transition-colors mb-8"
              >
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 stroke-current fill-none stroke-2">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Tous les services
              </a>
              <div className="flex items-center gap-5 mb-6">
                <span className="text-[3.5rem] lg:text-[5rem] font-serif text-accent/30 leading-none">
                  {service.num}
                </span>
                <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-serif italic">{service.title}</span>
                </h1>
              </div>
              <p className="text-[1rem] text-white/40 max-w-[550px] leading-[1.8] font-light">
                {service.subtitle}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Description */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="grid lg:grid-cols-[1fr_1fr] gap-12 lg:gap-20">
              <ScrollReveal>
                <div>
                  <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                    Présentation
                  </span>
                  <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.1] tracking-[-0.02em] mt-4">
                    <span className="font-light">Ce que nous </span>
                    <span className="font-serif italic">proposons.</span>
                  </h2>
                  <p className="text-[0.9rem] text-text-body mt-5 leading-[1.8]">
                    {service.description}
                  </p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {service.features.map((f, i) => (
                    <div
                      key={i}
                      className="bg-light rounded-xl p-6 border border-gray-100"
                    >
                      <h3 className="text-[0.95rem] font-semibold text-text-dark mb-2">
                        {f.title}
                      </h3>
                      <p className="text-[0.8rem] text-text-body leading-[1.7]">
                        {f.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-12">
                <h3 className="text-[1.3rem] lg:text-[1.8rem] leading-[1.1] tracking-[-0.02em]">
                  <span className="font-light">Technologies </span>
                  <span className="font-serif italic">utilisées.</span>
                </h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-[0.82rem] font-medium text-text-dark"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Process */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto mb-14">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Notre </span>
                  <span className="font-serif italic">approche.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.process.map((p, i) => (
                <ScrollReveal key={p.step} delay={i * 100}>
                  <div className="text-center">
                    <span className="text-[3rem] font-serif text-white/20 leading-none block">
                      {p.step}
                    </span>
                    <h4 className="text-[1rem] font-semibold text-white mt-3">
                      {p.title}
                    </h4>
                    <p className="text-[0.8rem] text-white/60 leading-[1.7] mt-2">
                      {p.desc}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-dark text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Intéressé par ce </span>
                  <span className="font-serif italic text-accent">service ?</span>
                </h2>
                <p className="text-[0.9rem] text-white/40 mt-4 leading-[1.7]">
                  Parlons de votre projet. Premier rendez-vous gratuit.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Demander un devis
                    <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-dark fill-none stroke-2">
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </motion.a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
