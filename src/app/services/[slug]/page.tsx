"use client";

import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Breadcrumb from "@/components/Breadcrumb";
import {
  CheckCircle,
  ArrowRight,
  MessageSquare,
  ChevronDown,
  Sparkles,
  Target,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Layers,
  Code,
  Palette,
  ShoppingCart,
  Search,
  Brain,
} from "lucide-react";
import { useState } from "react";

const serviceIcons: Record<string, React.ReactNode> = {
  "developpement-web": <Code size={28} />,
  "solutions-saas": <Layers size={28} />,
  "intelligence-artificielle": <Brain size={28} />,
  "design-uiux": <Palette size={28} />,
  "e-commerce": <ShoppingCart size={28} />,
  "branding-seo": <Search size={28} />,
};

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
    advantages: { icon: React.ReactNode; title: string; desc: string }[];
    metrics: { value: string; label: string }[];
    faq: { q: string; a: string }[];
    relatedSlugs: string[];
  }
> = {
  "developpement-web": {
    num: "01",
    title: "Développement Web",
    subtitle:
      "Sites et applications web performantes avec les technologies modernes.",
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
    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Supabase",
      "Tailwind CSS",
      "Vercel",
    ],
    process: [
      {
        step: "01",
        title: "Analyse",
        desc: "Audit de vos besoins et définition du cahier des charges.",
      },
      {
        step: "02",
        title: "Architecture",
        desc: "Choix techniques et structuration du projet.",
      },
      {
        step: "03",
        title: "Développement",
        desc: "Sprints itératifs avec demos régulières.",
      },
      {
        step: "04",
        title: "Déploiement",
        desc: "Mise en production, tests et formation.",
      },
    ],
    advantages: [
      {
        icon: <TrendingUp size={22} />,
        title: "Performance maximale",
        desc: "Score Lighthouse 95+ garanti. Temps de chargement < 2s pour une expérience utilisateur fluide.",
      },
      {
        icon: <Shield size={22} />,
        title: "Sécurité intégrée",
        desc: "HTTPS, protection CSRF, validation des données et bonnes pratiques OWASP dès le premier jour.",
      },
      {
        icon: <Clock size={22} />,
        title: "Livraison rapide",
        desc: "Méthodologie agile avec sprints de 2 semaines. Votre MVP en 4 à 6 semaines.",
      },
      {
        icon: <Users size={22} />,
        title: "Support continu",
        desc: "Maintenance, mises à jour et support technique inclus après la livraison.",
      },
    ],
    metrics: [
      { value: "95+", label: "Score Lighthouse moyen" },
      { value: "<2s", label: "Temps de chargement" },
      { value: "100%", label: "Sites responsive" },
      { value: "24h", label: "Temps de réponse support" },
    ],
    faq: [
      {
        q: "Combien coûte un site web ?",
        a: "Le prix dépend de la complexité du projet. Un site vitrine démarre à partir de 1 500€, une application web sur mesure à partir de 5 000€. Nous établissons toujours un devis précis après l\u2019analyse de vos besoins.",
      },
      {
        q: "Quel est le délai de réalisation ?",
        a: "Un site vitrine est livré en 3 à 4 semaines. Une application web complexe prend 6 à 12 semaines selon les fonctionnalités. Nous travaillons en sprints avec des démos régulières.",
      },
      {
        q: "Est-ce que je pourrai modifier mon site moi-même ?",
        a: "Oui, nous intégrons un back-office intuitif pour que vous puissiez gérer votre contenu en toute autonomie. Nous vous formons à son utilisation.",
      },
      {
        q: "Proposez-vous l\u2019hébergement ?",
        a: "Oui, nous déployons sur des infrastructures performantes (Vercel, Coolify) et nous gérons l\u2019hébergement, le SSL et les mises à jour pour vous.",
      },
    ],
    relatedSlugs: ["solutions-saas", "design-uiux", "e-commerce"],
  },
  "solutions-saas": {
    num: "02",
    title: "Solutions SaaS",
    subtitle:
      "Des plateformes cloud scalables et sécurisées pour votre business.",
    description:
      "Nous concevons des plateformes SaaS complètes, de l\u2019architecture multi-tenant à la gestion des abonnements. Notre expertise Supabase et Next.js garantit des solutions performantes, sécurisées et évolutives.",
    features: [
      {
        title: "Architecture multi-tenant",
        desc: "Isolation des données par client avec une base de code unique et maintenable.",
      },
      {
        title: "Dashboards admin",
        desc: "Interfaces d\u2019administration riches pour gérer utilisateurs, données et analytics.",
      },
      {
        title: "Gestion d\u2019abonnements",
        desc: "Intégration Stripe pour facturation récurrente, essais gratuits et upgrades.",
      },
      {
        title: "Authentification & rôles",
        desc: "Système de permissions granulaire avec SSO, 2FA et gestion des équipes.",
      },
    ],
    technologies: [
      "Next.js",
      "Supabase",
      "Stripe",
      "PostgreSQL",
      "TypeScript",
      "Vercel",
    ],
    process: [
      {
        step: "01",
        title: "Discovery",
        desc: "Analyse du modèle business et des besoins utilisateurs.",
      },
      {
        step: "02",
        title: "Architecture",
        desc: "Conception technique, modèle de données et sécurité.",
      },
      {
        step: "03",
        title: "Développement",
        desc: "Sprints itératifs avec démos et feedback continu.",
      },
      {
        step: "04",
        title: "Lancement",
        desc: "Déploiement, monitoring et onboarding des premiers clients.",
      },
    ],
    advantages: [
      {
        icon: <TrendingUp size={22} />,
        title: "Scalabilité infinie",
        desc: "Architecture pensée pour supporter de 10 à 100 000 utilisateurs sans refonte.",
      },
      {
        icon: <Shield size={22} />,
        title: "Sécurité enterprise",
        desc: "Chiffrement, RLS Supabase, audit logs et conformité RGPD intégrés.",
      },
      {
        icon: <Target size={22} />,
        title: "Monétisation optimisée",
        desc: "Gestion des plans, essais gratuits, coupons et analytics de revenus avec Stripe.",
      },
      {
        icon: <Sparkles size={22} />,
        title: "UX premium",
        desc: "Interfaces modernes et intuitives qui fidélisent vos utilisateurs.",
      },
    ],
    metrics: [
      { value: "99.9%", label: "Uptime garanti" },
      { value: "50ms", label: "Temps de réponse API" },
      { value: "100K+", label: "Utilisateurs supportés" },
      { value: "RGPD", label: "Conformité assurée" },
    ],
    faq: [
      {
        q: "Quelle est la différence entre un site web et un SaaS ?",
        a: "Un SaaS est une application accessible en ligne avec gestion des utilisateurs, abonnements et données. C\u2019est un produit complet, pas juste un site vitrine.",
      },
      {
        q: "Comment gérez-vous la facturation ?",
        a: "Nous intégrons Stripe pour la gestion complète : abonnements récurrents, factures, essais gratuits, upgrades/downgrades et relances automatiques.",
      },
      {
        q: "Mon SaaS pourra-t-il évoluer ?",
        a: "Absolument. L\u2019architecture est pensée dès le départ pour être modulaire et scalable. Ajouter des fonctionnalités ou augmenter la capacité ne nécessite pas de refonte.",
      },
      {
        q: "Combien de temps pour lancer un MVP SaaS ?",
        a: "Un MVP fonctionnel est généralement prêt en 8 à 12 semaines, incluant authentification, dashboard, facturation et les fonctionnalités core de votre produit.",
      },
    ],
    relatedSlugs: ["developpement-web", "intelligence-artificielle", "design-uiux"],
  },
  "intelligence-artificielle": {
    num: "03",
    title: "Intelligence Artificielle",
    subtitle: "L\u2019IA au service de votre entreprise, concrètement.",
    description:
      "Nous intégrons l\u2019intelligence artificielle dans vos processus métier : chatbots, automatisation, analyse de données et génération de contenu. Pas de buzzwords, des solutions concrètes qui créent de la valeur.",
    features: [
      {
        title: "Chatbots IA",
        desc: "Assistants conversationnels intelligents pour le support client et la vente.",
      },
      {
        title: "Automatisation",
        desc: "Automatisation des tâches répétitives avec des workflows IA sur mesure.",
      },
      {
        title: "Intégration API IA",
        desc: "Connexion à OpenAI, Claude, Mistral et autres modèles pour vos apps.",
      },
      {
        title: "Analyse intelligente",
        desc: "Extraction d\u2019insights et prédictions à partir de vos données existantes.",
      },
    ],
    technologies: [
      "OpenAI API",
      "Claude API",
      "LangChain",
      "Python",
      "Next.js",
      "Supabase",
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        desc: "Identification des cas d\u2019usage IA à fort impact dans votre activité.",
      },
      {
        step: "02",
        title: "Prototypage",
        desc: "POC rapide pour valider la faisabilité et la valeur ajoutée.",
      },
      {
        step: "03",
        title: "Développement",
        desc: "Intégration production avec monitoring et fine-tuning.",
      },
      {
        step: "04",
        title: "Optimisation",
        desc: "Amélioration continue des performances et des coûts.",
      },
    ],
    advantages: [
      {
        icon: <Clock size={22} />,
        title: "Gain de temps x10",
        desc: "Automatisez les tâches répétitives et libérez vos équipes pour les missions à forte valeur ajoutée.",
      },
      {
        icon: <Target size={22} />,
        title: "Précision accrue",
        desc: "L\u2019IA analyse vos données avec une fiabilité supérieure pour des décisions éclairées.",
      },
      {
        icon: <Users size={22} />,
        title: "Support 24/7",
        desc: "Vos chatbots IA répondent à vos clients à toute heure, sans interruption.",
      },
      {
        icon: <TrendingUp size={22} />,
        title: "ROI mesurable",
        desc: "Chaque intégration IA est évaluée sur des KPIs concrets : temps gagné, conversions, satisfaction.",
      },
    ],
    metrics: [
      { value: "80%", label: "Requêtes automatisées" },
      { value: "x3", label: "Productivité moyenne" },
      { value: "24/7", label: "Disponibilité chatbot" },
      { value: "-60%", label: "Coûts de support" },
    ],
    faq: [
      {
        q: "L\u2019IA est-elle adaptée à mon entreprise ?",
        a: "Probablement oui. Nous commençons toujours par un audit gratuit pour identifier les cas d\u2019usage pertinents et estimer le ROI avant tout investissement.",
      },
      {
        q: "Mes données sont-elles sécurisées ?",
        a: "Absolument. Nous utilisons des API sécurisées, le chiffrement des données et nous pouvons déployer des modèles en local si nécessaire pour la confidentialité.",
      },
      {
        q: "Quel budget prévoir pour un chatbot IA ?",
        a: "Un chatbot IA personnalisé avec base de connaissances démarre à partir de 3 000€. Les coûts d\u2019utilisation des API (OpenAI, Claude) sont généralement de quelques euros par mois.",
      },
      {
        q: "Faut-il avoir des données existantes ?",
        a: "Pas nécessairement. Pour un chatbot, votre site web et documentation suffisent. Pour de l\u2019analyse prédictive, des données historiques sont nécessaires.",
      },
    ],
    relatedSlugs: ["developpement-web", "solutions-saas", "e-commerce"],
  },
  "design-uiux": {
    num: "04",
    title: "Design UI/UX",
    subtitle:
      "Des interfaces qui marquent les esprits et convertissent les visiteurs.",
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
    technologies: [
      "Figma",
      "Framer",
      "Adobe Suite",
      "Maze",
      "Hotjar",
      "Storybook",
    ],
    process: [
      {
        step: "01",
        title: "Découverte",
        desc: "Immersion dans votre univers, vos utilisateurs et concurrents.",
      },
      {
        step: "02",
        title: "Idéation",
        desc: "Exploration créative et wireframes basse fidélité.",
      },
      {
        step: "03",
        title: "Design",
        desc: "Maquettes haute fidélité et prototypes interactifs.",
      },
      {
        step: "04",
        title: "Validation",
        desc: "Tests utilisateurs et itérations finales.",
      },
    ],
    advantages: [
      {
        icon: <TrendingUp size={22} />,
        title: "+40% de conversions",
        desc: "Un design centré utilisateur augmente significativement vos taux de conversion et d\u2019engagement.",
      },
      {
        icon: <Sparkles size={22} />,
        title: "Identité mémorable",
        desc: "Un design unique qui reflète votre marque et vous distingue de la concurrence.",
      },
      {
        icon: <Users size={22} />,
        title: "Accessibilité",
        desc: "Interfaces conformes WCAG pour une expérience inclusive et un SEO renforcé.",
      },
      {
        icon: <Target size={22} />,
        title: "Design System pérenne",
        desc: "Des composants réutilisables qui accélèrent le développement et garantissent la cohérence.",
      },
    ],
    metrics: [
      { value: "+40%", label: "Taux de conversion" },
      { value: "WCAG", label: "Conformité accessibilité" },
      { value: "100+", label: "Composants livrés" },
      { value: "3", label: "Itérations incluses" },
    ],
    faq: [
      {
        q: "Quelle est la différence entre UI et UX ?",
        a: "L\u2019UX (User Experience) concerne la logique et le parcours utilisateur. L\u2019UI (User Interface) concerne l\u2019aspect visuel. Les deux sont essentiels et complémentaires.",
      },
      {
        q: "Livrez-vous les fichiers sources ?",
        a: "Oui, tous les fichiers Figma sont livrés avec les composants organisés, les styles documentés et un guide d\u2019utilisation du design system.",
      },
      {
        q: "Combien de révisions sont incluses ?",
        a: "3 itérations sont incluses dans chaque projet. Chaque version intègre vos retours pour converger vers le design idéal.",
      },
      {
        q: "Pouvez-vous aussi intégrer le design ?",
        a: "Oui, c\u2019est notre force ! Nous pouvons transformer les maquettes en code fonctionnel avec React et Tailwind CSS pour un résultat pixel-perfect.",
      },
    ],
    relatedSlugs: ["developpement-web", "branding-seo", "e-commerce"],
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
    technologies: [
      "Next.js",
      "Stripe",
      "WooCommerce",
      "Monetico",
      "Supabase",
      "Vercel",
    ],
    process: [
      {
        step: "01",
        title: "Stratégie",
        desc: "Analyse du marché, positionnement et objectifs de vente.",
      },
      {
        step: "02",
        title: "Catalogue",
        desc: "Architecture produits, catégories et filtres.",
      },
      {
        step: "03",
        title: "Développement",
        desc: "Front-end, back-office et intégration paiement.",
      },
      {
        step: "04",
        title: "Lancement",
        desc: "Tests, optimisation et suivi des performances.",
      },
    ],
    advantages: [
      {
        icon: <TrendingUp size={22} />,
        title: "Conversions optimisées",
        desc: "Tunnel de vente optimisé, relance panier abandonné et one-click checkout pour maximiser vos ventes.",
      },
      {
        icon: <Shield size={22} />,
        title: "Paiement sécurisé",
        desc: "PCI DSS compliant avec Stripe. Vos clients achètent en toute confiance.",
      },
      {
        icon: <Sparkles size={22} />,
        title: "Expérience mobile",
        desc: "60% des achats se font sur mobile. Nos boutiques sont pensées mobile-first.",
      },
      {
        icon: <Target size={22} />,
        title: "SEO e-commerce",
        desc: "Fiches produits optimisées, données structurées et sitemap pour un référencement naturel maximal.",
      },
    ],
    metrics: [
      { value: "+35%", label: "Taux de conversion moyen" },
      { value: "60%", label: "Achats mobile" },
      { value: "<1s", label: "Temps ajout panier" },
      { value: "PCI", label: "Conformité paiement" },
    ],
    faq: [
      {
        q: "Shopify ou sur mesure ?",
        a: "Nous recommandons du sur mesure (Next.js + Stripe) pour un contrôle total et zéro commission. Shopify est une option pour les projets simples avec budget limité.",
      },
      {
        q: "Comment gérer les stocks et commandes ?",
        a: "Nous développons un back-office sur mesure pour gérer catalogue, stocks, commandes et expéditions. Tout est centralisé et intuitif.",
      },
      {
        q: "Quels moyens de paiement proposez-vous ?",
        a: "Carte bancaire (Stripe), virement, Monetico pour les banques françaises, et Apple Pay/Google Pay. Nous pouvons ajouter d\u2019autres options selon vos besoins.",
      },
      {
        q: "Quel est le coût d\u2019une boutique e-commerce ?",
        a: "Une boutique e-commerce sur mesure démarre à partir de 4 000€. Le prix varie selon le nombre de produits, les fonctionnalités et les intégrations nécessaires.",
      },
    ],
    relatedSlugs: ["developpement-web", "design-uiux", "branding-seo"],
  },
  "branding-seo": {
    num: "06",
    title: "Branding & SEO",
    subtitle:
      "Une identité forte et une visibilité maximale sur le web.",
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
    technologies: [
      "Figma",
      "Google Search Console",
      "SEMrush",
      "Ahrefs",
      "Google Analytics",
      "Lighthouse",
    ],
    process: [
      {
        step: "01",
        title: "Audit",
        desc: "Analyse de l\u2019existant, concurrence et opportunités.",
      },
      {
        step: "02",
        title: "Stratégie",
        desc: "Positionnement, mots-clés et plan d\u2019action.",
      },
      {
        step: "03",
        title: "Création",
        desc: "Design de l\u2019identité et optimisations SEO.",
      },
      {
        step: "04",
        title: "Suivi",
        desc: "Reporting mensuel et ajustements continus.",
      },
    ],
    advantages: [
      {
        icon: <TrendingUp size={22} />,
        title: "Visibilité 1ère page",
        desc: "Stratégie SEO white-hat pour un positionnement durable sur Google et moteurs de recherche.",
      },
      {
        icon: <Sparkles size={22} />,
        title: "Marque mémorable",
        desc: "Une identité visuelle cohérente qui marque les esprits et inspire confiance.",
      },
      {
        icon: <Target size={22} />,
        title: "Trafic qualifié",
        desc: "Attirez des visiteurs qui cherchent exactement ce que vous proposez.",
      },
      {
        icon: <Clock size={22} />,
        title: "Résultats durables",
        desc: "Contrairement aux ads, le SEO génère du trafic gratuit et croissant dans le temps.",
      },
    ],
    metrics: [
      { value: "1ère", label: "Page Google visée" },
      { value: "+200%", label: "Trafic organique moyen" },
      { value: "100%", label: "White-hat SEO" },
      { value: "12", label: "Mois de suivi inclus" },
    ],
    faq: [
      {
        q: "Combien de temps pour voir des résultats SEO ?",
        a: "Les premiers résultats apparaissent en 3 à 6 mois. Le SEO est un investissement à long terme : les résultats sont durables et croissants.",
      },
      {
        q: "Faites-vous aussi le logo ?",
        a: "Oui, la création du logo fait partie de notre offre branding. Nous livrons le logo en plusieurs formats (SVG, PNG, PDF) avec les guidelines d\u2019utilisation.",
      },
      {
        q: "SEO local ou national ?",
        a: "Les deux ! Nous adaptons la stratégie selon votre cible. Le SEO local est particulièrement efficace pour les entreprises avec une zone de chalandise définie.",
      },
      {
        q: "Fournissez-vous des rapports ?",
        a: "Oui, un reporting mensuel détaillé avec positions, trafic, conversions et recommandations. Nous utilisons Google Search Console, Analytics et SEMrush.",
      },
    ],
    relatedSlugs: ["design-uiux", "developpement-web", "e-commerce"],
  },
};

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-[0.95rem] font-medium text-text-dark pr-8 group-hover:text-accent transition-colors">
          {q}
        </span>
        <ChevronDown
          size={18}
          className={`shrink-0 text-accent transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-[0.85rem] text-text-body leading-[1.8] pb-5">
          {a}
        </p>
      </motion.div>
    </div>
  );
}

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
            <h1 className="text-[2rem] font-serif italic text-accent">
              Service introuvable
            </h1>
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

  const relatedServices = service.relatedSlugs
    .map((s) => (servicesData[s] ? { slug: s, ...servicesData[s] } : null))
    .filter(Boolean) as (typeof servicesData[string] & { slug: string })[];

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
          {/* Ambient glow */}
          <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-[1200px] mx-auto px-5 lg:px-12 relative z-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Breadcrumb items={[
                { label: "Accueil", href: "/" },
                { label: "Services", href: "/services" },
                { label: service.title },
              ]} />
              <div className="flex items-start gap-6 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 mt-1">
                  {serviceIcons[slug]}
                </div>
                <div>
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[0.72rem] uppercase tracking-[3px] text-accent/60 font-mono">
                      Service {service.num}
                    </span>
                  </div>
                  <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.5rem] leading-[1.08] tracking-[-0.02em]">
                    <span className="font-serif italic">{service.title}</span>
                  </h1>
                </div>
              </div>
              <p className="text-[1rem] text-white/40 max-w-[550px] leading-[1.8] font-light">
                {service.subtitle}
              </p>

              {/* Quick CTA in hero */}
              <div className="flex flex-wrap gap-4 mt-8">
                <motion.a
                  href="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-accent text-dark font-medium text-[0.88rem] cursor-pointer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Demander un devis
                  <ArrowRight size={16} />
                </motion.a>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-white/10 text-white/60 font-medium text-[0.88rem] hover:border-white/20 hover:text-white transition-all"
                >
                  <MessageSquare size={16} />
                  Questions fréquentes
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Description + Features */}
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
                      className="bg-light rounded-xl p-6 border border-gray-100 group hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-3">
                        <CheckCircle size={16} />
                      </div>
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

        {/* Metrics */}
        <section className="bg-dark text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  En chiffres
                </span>
                <h3 className="text-[1.3rem] lg:text-[1.8rem] leading-[1.1] tracking-[-0.02em] mt-3">
                  <span className="font-light">Des résultats </span>
                  <span className="font-serif italic text-accent">
                    concrets.
                  </span>
                </h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {service.metrics.map((m, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <span className="text-[2.2rem] lg:text-[2.8rem] font-serif text-accent leading-none block">
                      {m.value}
                    </span>
                    <span className="text-[0.78rem] text-white/40 mt-2 block">
                      {m.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Advantages - Pourquoi nous choisir */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto mb-14">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  Nos avantages
                </span>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                  <span className="font-light">Pourquoi nous </span>
                  <span className="font-serif italic">choisir.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {service.advantages.map((adv, i) => (
                <ScrollReveal key={i} delay={i * 80}>
                  <div className="flex gap-5 p-6 lg:p-8 rounded-2xl bg-light border border-gray-100 h-full group hover:border-accent/20 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 group-hover:bg-accent group-hover:text-dark transition-all duration-300">
                      {adv.icon}
                    </div>
                    <div>
                      <h3 className="text-[1.05rem] font-semibold text-text-dark mb-2">
                        {adv.title}
                      </h3>
                      <p className="text-[0.82rem] text-text-body leading-[1.7]">
                        {adv.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[80px] lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  Stack technique
                </span>
                <h3 className="text-[1.3rem] lg:text-[1.8rem] leading-[1.1] tracking-[-0.02em] mt-3">
                  <span className="font-light">Technologies </span>
                  <span className="font-serif italic">utilisées.</span>
                </h3>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {service.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-5 py-2.5 rounded-full bg-white border border-gray-200 text-[0.82rem] font-medium text-text-dark hover:border-accent/30 hover:shadow-md hover:shadow-accent/5 transition-all duration-300"
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
                  <div className="text-center relative">
                    {i < service.process.length - 1 && (
                      <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-white/20" />
                    )}
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

        {/* FAQ */}
        <section id="faq" className="bg-white text-text-dark">
          <div className="max-w-[800px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center mb-12">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  FAQ
                </span>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                  <span className="font-light">Questions </span>
                  <span className="font-serif italic">fréquentes.</span>
                </h2>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="bg-light rounded-2xl p-6 lg:p-8 border border-gray-100">
                {service.faq.map((item, i) => (
                  <FAQItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Related Services */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto mb-14">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  Découvrir aussi
                </span>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                  <span className="font-light">Services </span>
                  <span className="font-serif italic">complémentaires.</span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedServices.map((rs, i) => (
                <ScrollReveal key={rs.slug} delay={i * 100}>
                  <Link
                    href={`/services/${rs.slug}`}
                    className="block p-6 lg:p-8 bg-white rounded-2xl border border-gray-100 group hover:border-accent/20 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 h-full"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-dark transition-all duration-300">
                      {serviceIcons[rs.slug]}
                    </div>
                    <span className="text-[0.7rem] font-mono text-accent/60 uppercase tracking-wider">
                      {rs.num}
                    </span>
                    <h3 className="text-[1.1rem] font-semibold text-text-dark mt-1 mb-2 group-hover:text-accent transition-colors">
                      {rs.title}
                    </h3>
                    <p className="text-[0.8rem] text-text-body leading-[1.7]">
                      {rs.subtitle}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[0.78rem] text-accent font-medium mt-4 group-hover:gap-2.5 transition-all">
                      En savoir plus
                      <ArrowRight size={14} />
                    </span>
                  </Link>
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
                  <span className="font-serif italic text-accent">
                    service ?
                  </span>
                </h2>
                <p className="text-[0.9rem] text-white/40 mt-4 leading-[1.7]">
                  Parlons de votre projet. Premier rendez-vous gratuit et sans
                  engagement.
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-8">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-accent text-dark font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Demander un devis
                    <ArrowRight size={16} />
                  </motion.a>
                  <motion.a
                    href="/services"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/10 text-white/60 font-medium text-[0.9rem] hover:border-white/20 hover:text-white transition-all cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Voir tous les services
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
