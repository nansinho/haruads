export interface ProjectData {
  title: string;
  category: string;
  year: string;
  client: string;
  description: string;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  tags: string[];
  image: string;
  gallery: string[];
}

export const projectsData: Record<string, ProjectData> = {
  "aiako-ecommerce": {
    title: "AIAKO E-Commerce",
    category: "E-Commerce",
    year: "2024",
    client: "AIAKO",
    description: "Migration complète d\u2019une boutique WooCommerce vers une stack moderne Next.js + Supabase. Refonte de l\u2019expérience d\u2019achat avec intégration du paiement Monetico.",
    challenge: "Le site existant souffrait de lenteurs importantes, d\u2019une interface datée et d\u2019un taux d\u2019abandon de panier élevé. Le client souhaitait une expérience fluide et moderne sans perdre son catalogue de 500+ produits.",
    solution: "Nous avons migré l\u2019intégralité du catalogue vers Supabase, reconstruit le front-end en Next.js avec SSG pour des temps de chargement ultra-rapides, et intégré Monetico pour les paiements sécurisés.",
    results: [
      { label: "Temps de chargement", value: "-70%" },
      { label: "Conversions", value: "+45%" },
      { label: "Panier moyen", value: "+22%" },
      { label: "Score Lighthouse", value: "98/100" },
    ],
    tags: ["Next.js", "Supabase", "Monetico", "Tailwind CSS"],
    image: "/images/projects/project-dashboard.jpg",
    gallery: ["/images/projects/project-dashboard.jpg", "/images/projects/project-landing.jpg"],
  },
  "dashboard-cco": {
    title: "Dashboard C&CO",
    category: "Application Web",
    year: "2024",
    client: "C&CO Formation",
    description: "Plateforme SaaS de formation en ligne multi-tenant avec dashboard admin, suivi de progression des apprenants et gestion des contenus pédagogiques.",
    challenge: "C&CO avait besoin d\u2019une plateforme centralisant la gestion de plusieurs organismes de formation, avec des espaces cloisonnés par organisme et un suivi détaillé de la progression.",
    solution: "Architecture multi-tenant avec isolation des données par organisme, dashboard temps réel pour les formateurs, et système de gamification pour motiver les apprenants.",
    results: [
      { label: "Utilisateurs actifs", value: "2 500+" },
      { label: "Organismes", value: "12" },
      { label: "Satisfaction", value: "96%" },
      { label: "Temps de dev", value: "10 sem." },
    ],
    tags: ["React", "Node.js", "PostgreSQL", "Socket.io"],
    image: "/images/projects/neuralia-project.webp",
    gallery: ["/images/projects/neuralia-project.webp"],
  },
  "landing-fintech": {
    title: "Landing Fintech",
    category: "Design UI/UX",
    year: "2023",
    client: "FinPay",
    description: "Refonte complète de l\u2019identité visuelle et du site vitrine d\u2019une startup fintech. Création d\u2019un design system complet et d\u2019animations immersives.",
    challenge: "La startup avait une identité visuelle incohérente et un site qui ne convertissait pas. Il fallait crédibiliser la marque et améliorer le taux de conversion des leads.",
    solution: "Nouvelle identité visuelle épurée, design system Figma de 200+ composants, site vitrine avec animations GSAP et optimisation du tunnel de conversion.",
    results: [
      { label: "Taux de conversion", value: "+65%" },
      { label: "Temps sur site", value: "+40%" },
      { label: "Leads qualifiés", value: "x3" },
      { label: "Composants design", value: "200+" },
    ],
    tags: ["Figma", "GSAP", "Next.js", "Framer Motion"],
    image: "/images/projects/project-landing.jpg",
    gallery: ["/images/projects/project-landing.jpg"],
  },
  "systeme-reservation": {
    title: "Système de Réservation",
    category: "Application Web",
    year: "2024",
    client: "BookEasy",
    description: "Application de réservation en ligne avec calendrier interactif, paiement intégré via Stripe et notifications en temps réel par email et SMS.",
    challenge: "Le client gérait ses réservations manuellement par téléphone et email, ce qui entraînait des doubles réservations et une perte de temps considérable.",
    solution: "Calendrier interactif avec disponibilités en temps réel, intégration Stripe pour le paiement à la réservation, et système de notifications automatiques (confirmation, rappel, annulation).",
    results: [
      { label: "Réservations en ligne", value: "85%" },
      { label: "No-shows", value: "-60%" },
      { label: "Temps admin", value: "-4h/jour" },
      { label: "Satisfaction client", value: "98%" },
    ],
    tags: ["Next.js", "Stripe", "Supabase", "Twilio"],
    image: "/images/projects/reservation-system.webp",
    gallery: ["/images/projects/reservation-system.webp"],
  },
};

export const projectsSlugs = Object.keys(projectsData);
