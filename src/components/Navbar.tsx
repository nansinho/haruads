"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
} from "framer-motion";
import {
  Globe,
  Cloud,
  Brain,
  Palette,
  ShoppingCart,
  Search,
  ArrowRight,
  ChevronDown,
  Sparkles,
  BookOpen,
  FolderOpen,
  Tag,
  Clock,
  type LucideIcon,
} from "lucide-react";
import PromoBanner from "./PromoBanner";
import ThemeSwitcher from "./ThemeSwitcher";
import { servicesData } from "@/data/services";
import { plans } from "@/data/pricing";

/* ─── Types ─── */

interface NavChild {
  label: string;
  href: string;
  description?: string;
  icon?: LucideIcon;
  badge?: string;
  price?: string;
}

interface NavLink {
  label: string;
  href: string;
  children?: NavChild[];
  megaType?: "services" | "projets" | "tarifs" | "blog";
}

/* ─── Icon map for services ─── */

const serviceIcons: Record<string, LucideIcon> = {
  "developpement-web": Globe,
  "solutions-saas": Cloud,
  "intelligence-artificielle": Brain,
  "design-uiux": Palette,
  "e-commerce": ShoppingCart,
  "branding-seo": Search,
};

/* ─── Build navLinks from data ─── */

const servicesChildren: NavChild[] = Object.entries(servicesData).map(
  ([slug, service]) => ({
    label: service.title,
    href: `/services/${slug}`,
    description: service.subtitle,
    icon: serviceIcons[slug] || Globe,
  })
);

const tarifsChildren: NavChild[] = [
  ...plans.map((plan) => ({
    label: plan.name,
    href: "/tarifs",
    description: plan.desc,
    price: `${plan.price}€`,
    badge: plan.featured ? "Populaire" : undefined,
  })),
  {
    label: "Sur mesure",
    href: "/contact",
    description: "Un projet unique ? Demandez un devis personnalisé.",
    icon: Sparkles,
  },
];

const navLinks: NavLink[] = [
  { label: "Accueil", href: "/" },
  {
    label: "Services",
    href: "/services",
    megaType: "services",
    children: servicesChildren,
  },
  {
    label: "Projets",
    href: "/projets",
    megaType: "projets",
    children: [
      {
        label: "Tous les projets",
        href: "/projets",
        description: "Découvrez l'ensemble de nos réalisations.",
        icon: FolderOpen,
      },
    ],
  },
  {
    label: "Tarifs",
    href: "/tarifs",
    megaType: "tarifs",
    children: tarifsChildren,
  },
  { label: "A Propos", href: "/a-propos" },
  {
    label: "Blog",
    href: "/blog",
    megaType: "blog",
    children: [],
  },
];

/* ─── Framer Motion variants ─── */

const megaMenuVariants = {
  hidden: {
    opacity: 0,
    y: -8,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.03,
    },
  },
  exit: {
    opacity: 0,
    y: -4,
    scale: 0.98,
    transition: { duration: 0.15 },
  },
} as const;

const megaItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

/* ─── Mega Panel Content Components ─── */

function ServicesMegaContent({
  children,
  onClose,
}: {
  children: NavChild[];
  onClose: () => void;
}) {
  return (
    <div className="p-6 w-[680px]">
      <div className="grid grid-cols-2 gap-1">
        {children.map((child) => {
          const Icon = child.icon || Globe;
          return (
            <motion.div key={child.href} variants={megaItemVariants}>
              <Link
                href={child.href}
                onClick={onClose}
                className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-white/[0.05] transition-colors duration-200 group/item"
              >
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center group-hover/item:bg-accent/20 transition-colors duration-200">
                  <Icon className="w-4.5 h-4.5 text-accent" />
                </div>
                <div className="min-w-0">
                  <p className="text-[0.82rem] font-semibold text-white/90 group-hover/item:text-white transition-colors">
                    {child.label}
                  </p>
                  <p className="text-[0.72rem] text-text-muted/70 mt-0.5 leading-relaxed line-clamp-1">
                    {child.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
      <motion.div
        variants={megaItemVariants}
        className="mt-3 pt-3 border-t border-white/[0.06]"
      >
        <Link
          href="/services"
          onClick={onClose}
          className="flex items-center gap-2 text-[0.78rem] font-medium text-accent hover:text-white transition-colors duration-200 group/link px-3"
        >
          <span>Tous nos services</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </motion.div>
    </div>
  );
}

function TarifsMegaContent({
  children,
  onClose,
}: {
  children: NavChild[];
  onClose: () => void;
}) {
  const planItems = children.filter((c) => c.price);
  const customItem = children.find((c) => !c.price);

  return (
    <div className="p-6 w-[620px]">
      <div className="grid grid-cols-3 gap-3">
        {planItems.map((child) => (
          <motion.div key={child.label} variants={megaItemVariants}>
            <Link
              href={child.href}
              onClick={onClose}
              className={`relative block p-4 rounded-xl border transition-all duration-200 hover:bg-white/[0.05] ${
                child.badge
                  ? "border-accent/30 bg-accent/[0.04]"
                  : "border-white/[0.06]"
              }`}
            >
              {child.badge && (
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[0.65rem] font-bold bg-accent text-dark px-2.5 py-0.5 rounded-full">
                  {child.badge}
                </span>
              )}
              <p className="text-[0.78rem] font-semibold text-white/90">
                {child.label}
              </p>
              <p className="text-lg font-bold text-accent mt-1">
                {child.price}
                <span className="text-[0.7rem] font-normal text-text-muted/60">
                  /mois
                </span>
              </p>
              <p className="text-[0.7rem] text-text-muted/70 mt-1.5 leading-relaxed">
                {child.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </div>
      {customItem && (
        <motion.div
          variants={megaItemVariants}
          className="mt-3 pt-3 border-t border-white/[0.06]"
        >
          <Link
            href={customItem.href}
            onClick={onClose}
            className="flex items-center gap-2 text-[0.78rem] font-medium text-accent hover:text-white transition-colors duration-200 group/link px-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{customItem.label}</span>
            <span className="text-text-muted/50 font-normal">
              — {customItem.description}
            </span>
            <ArrowRight className="w-3.5 h-3.5 ml-auto group-hover/link:translate-x-1 transition-transform duration-200" />
          </Link>
        </motion.div>
      )}
    </div>
  );
}

function BlogMegaContent({
  onClose,
}: {
  children: NavChild[];
  onClose: () => void;
}) {
  const [blogArticles, setBlogArticles] = useState<{ title: string; slug: string; category: string | null; content: string }[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (loaded) return;
    fetch("/api/blog")
      .then((res) => res.json())
      .then((json) => {
        const articles = (json.data || []).slice(0, 4);
        setBlogArticles(articles);
        const cats = [...new Set(articles.map((a: { category: string | null }) => a.category).filter(Boolean))] as string[];
        setCategories(cats);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, [loaded]);

  return (
    <div className="p-6 w-[520px]">
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-4">
          {categories.map((cat) => (
            <Link
              key={cat}
              href="/blog"
              onClick={onClose}
              className="text-[0.68rem] font-medium px-2.5 py-1 rounded-full border border-white/[0.08] text-text-muted/70 hover:border-accent/40 hover:text-accent transition-all duration-200"
            >
              <Tag className="w-2.5 h-2.5 inline mr-1" />
              {cat}
            </Link>
          ))}
        </div>
      )}
      <div className="flex flex-col gap-0.5">
        {blogArticles.length > 0 ? (
          blogArticles.map((article) => {
            const words = article.content?.split(/\s+/).length || 0;
            const mins = Math.max(1, Math.ceil(words / 200));
            return (
              <motion.div key={article.slug} variants={megaItemVariants}>
                <Link
                  href={`/blog/${article.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/[0.05] transition-colors duration-200 group/item"
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <BookOpen className="w-3.5 h-3.5 text-accent" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[0.78rem] font-medium text-white/90 group-hover/item:text-white transition-colors line-clamp-1">
                      {article.title}
                    </p>
                    <p className="text-[0.68rem] text-text-muted/60 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-2.5 h-2.5" />
                      {article.category || "Blog"} · {mins} min
                    </p>
                  </div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <p className="text-[0.78rem] text-text-muted/60 py-4 text-center">
            {loaded ? "Aucun article publié" : "Chargement..."}
          </p>
        )}
      </div>
      <motion.div
        variants={megaItemVariants}
        className="mt-3 pt-3 border-t border-white/[0.06]"
      >
        <Link
          href="/blog"
          onClick={onClose}
          className="flex items-center gap-2 text-[0.78rem] font-medium text-accent hover:text-white transition-colors duration-200 group/link px-2.5"
        >
          <span>Tous les articles</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover/link:translate-x-1 transition-transform duration-200" />
        </Link>
      </motion.div>
    </div>
  );
}

function ProjetsMegaContent({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-6 w-[380px]">
      <motion.div variants={megaItemVariants}>
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
            <FolderOpen className="w-6 h-6 text-accent" />
          </div>
          <p className="text-[0.88rem] font-semibold text-white/90">
            Nos réalisations
          </p>
          <p className="text-[0.75rem] text-text-muted/70 mt-1.5 leading-relaxed max-w-[280px] mx-auto">
            E-commerce, applications web, SaaS… Découvrez les projets que nous
            avons conçus pour nos clients.
          </p>
          <Link
            href="/projets"
            onClick={onClose}
            className="inline-flex items-center gap-2 mt-4 bg-accent text-dark px-5 py-2.5 rounded-full text-[0.78rem] font-semibold hover:shadow-[0_0_24px_color-mix(in_srgb,var(--color-accent)_35%,transparent)] transition-shadow duration-300 group/btn"
          >
            <span>Découvrir nos projets</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── MegaPanel wrapper ─── */

function MegaPanel({
  link,
  onClose,
}: {
  link: NavLink;
  onClose: () => void;
}) {
  const content = (() => {
    switch (link.megaType) {
      case "services":
        return (
          <ServicesMegaContent
            children={link.children!}
            onClose={onClose}
          />
        );
      case "tarifs":
        return (
          <TarifsMegaContent
            children={link.children!}
            onClose={onClose}
          />
        );
      case "blog":
        return (
          <BlogMegaContent children={link.children!} onClose={onClose} />
        );
      case "projets":
        return <ProjetsMegaContent onClose={onClose} />;
      default:
        return null;
    }
  })();

  return (
    <motion.div
      variants={megaMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 z-[160]"
    >
      {/* Accent glow line at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="bg-dark/95 backdrop-blur-2xl border border-white/[0.06] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.5)] overflow-hidden">
        {content}
      </div>
    </motion.div>
  );
}

/* ─── Main Navbar ─── */

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);

  const navRef = useRef<HTMLElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );
  const pathname = usePathname();

  const handleBannerVisibility = useCallback((visible: boolean) => {
    setBannerVisible(visible);
  }, []);

  /* Close dropdown on route change */
  useEffect(() => {
    setActiveDropdown(null);
    setMenuOpen(false);
    setExpandedMobile(null);
  }, [pathname]);

  /* Fetch user session */
  useEffect(() => {
    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data?.user?.role) {
          setUserRole(data.user.role);
        }
      })
      .catch(() => {});
  }, []);

  const buttonLabel =
    userRole === "admin"
      ? "Administration"
      : userRole
        ? "Espace Client"
        : "Connexion";

  const buttonHref =
    userRole === "admin"
      ? "/admin"
      : userRole
        ? "/espace-client"
        : "/auth/login";

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  });

  /* Close dropdown on scroll */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      if (window.scrollY > 50) {
        setActiveDropdown(null);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close dropdown on click outside */
  useEffect(() => {
    if (!activeDropdown) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  /* Close on Escape */
  useEffect(() => {
    if (!activeDropdown) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveDropdown(null);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [activeDropdown]);

  const handleMouseEnter = useCallback((label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const bannerOffset = bannerVisible ? "top-[36px]" : "top-0";

  return (
    <>
      <PromoBanner onVisibilityChange={handleBannerVisibility} />

      {/* Scroll progress bar */}
      <motion.div
        className={`fixed ${bannerOffset} left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-cyan origin-left z-[200] hidden md:block transition-all duration-300`}
        style={{ scaleX }}
      />

      <motion.nav
        ref={navRef}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed ${bannerOffset} left-0 right-0 z-[150] flex items-center justify-between px-5 py-4 lg:px-12 transition-all duration-500 ${
          scrolled
            ? "bg-dark/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
            : "bg-transparent shadow-none"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group relative"
          title="Agence HDS - Accueil"
        >
          <Image
            src="/images/logos/logo-hds-2026-blanc.svg"
            alt="Agence HDS - Agence web créative à Aix-en-Provence"
            width={120}
            height={32}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* ─── Desktop navigation ─── */}
        <ul
          className="hidden lg:flex gap-1 list-none absolute left-1/2 -translate-x-1/2"
          onMouseLeave={() => setHoveredNav(null)}
        >
          {navLinks.map((link) => {
            const hasDropdown = !!link.children;
            const isDropdownOpen = activeDropdown === link.label;

            return (
              <li
                key={link.label}
                className="relative"
                onMouseEnter={() => {
                  setHoveredNav(link.label);
                  if (hasDropdown) handleMouseEnter(link.label);
                }}
                onMouseLeave={() => {
                  if (hasDropdown) handleMouseLeave();
                }}
              >
                {/* Sliding pill background */}
                {hoveredNav === link.label && (
                  <motion.div
                    layoutId="nav-highlight"
                    className="absolute inset-0 bg-white/[0.06] rounded-lg"
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                    }}
                  />
                )}

                <Link
                  href={link.href}
                  className={`relative z-10 flex items-center gap-1 px-3.5 py-2 text-[0.82rem] font-medium transition-colors duration-300 ${
                    isDropdownOpen
                      ? "text-accent"
                      : "text-text-muted hover:text-white"
                  }`}
                  aria-expanded={hasDropdown ? isDropdownOpen : undefined}
                  aria-haspopup={hasDropdown ? "true" : undefined}
                >
                  {link.label}
                  {hasDropdown && (
                    <motion.span
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </motion.span>
                  )}
                </Link>

                {/* Glow underline */}
                <motion.span
                  className="absolute bottom-0.5 left-1/2 h-[2px] rounded-full bg-gradient-to-r from-accent to-cyan"
                  initial={false}
                  animate={{
                    width:
                      hoveredNav === link.label || isDropdownOpen
                        ? "50%"
                        : "0%",
                    x: "-50%",
                    boxShadow:
                      hoveredNav === link.label || isDropdownOpen
                        ? "0 2px 12px color-mix(in srgb, var(--color-accent) 40%, transparent)"
                        : "0 0px 0px transparent",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />

                {/* Mega menu panel */}
                <AnimatePresence>
                  {hasDropdown && isDropdownOpen && (
                    <MegaPanel
                      link={link}
                      onClose={() => setActiveDropdown(null)}
                    />
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        {/* ─── Desktop CTA buttons ─── */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeSwitcher />
          <motion.a
            href={buttonHref}
            className="flex items-center gap-2 border border-white/[0.12] text-text-muted hover:text-white hover:border-white/[0.25] px-5 py-2.5 rounded-full font-medium text-[0.8rem] cursor-pointer transition-colors duration-300"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {userRole === "admin" ? (
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 stroke-current fill-none stroke-2"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-3.5 h-3.5 stroke-current fill-none stroke-2"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            )}
            <span>{buttonLabel}</span>
          </motion.a>
          <motion.a
            href="/contact"
            className="flex items-center gap-2 bg-accent text-dark px-5 py-2.5 rounded-full font-medium text-[0.8rem] cursor-pointer relative overflow-hidden"
            whileHover={{
              scale: 1.03,
              boxShadow:
                "0 0 30px color-mix(in srgb, var(--color-accent) 40%, transparent), 0 0 60px color-mix(in srgb, var(--color-accent) 10%, transparent)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            <span className="relative z-10">Contactez-nous</span>
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 stroke-dark fill-none stroke-2 relative z-10"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </motion.a>
        </div>

        {/* ─── Mobile menu button ─── */}
        <button
          className="lg:hidden bg-transparent border-none cursor-pointer w-8 h-8 relative flex items-center justify-center"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <motion.span
            className="absolute w-5 h-[1.5px] bg-white rounded-full"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 0 : -5 }}
            transition={{ duration: 0.3 }}
          />
          <motion.span
            className="absolute w-5 h-[1.5px] bg-white rounded-full"
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="absolute w-5 h-[1.5px] bg-white rounded-full"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? 0 : 5 }}
            transition={{ duration: 0.3 }}
          />
        </button>

        {/* ─── Mobile menu ─── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="absolute top-full left-0 right-0 bg-dark/95 backdrop-blur-2xl border-b border-white/[0.04] p-6 lg:hidden max-h-[80vh] overflow-y-auto"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-20 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
              <ul className="list-none flex flex-col gap-0.5 relative z-10">
                {navLinks.map((link, i) => {
                  const hasChildren = !!link.children;
                  const isExpanded = expandedMobile === link.label;

                  return (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      {hasChildren ? (
                        <>
                          {/* Expandable item */}
                          <div className="flex items-center">
                            <Link
                              href={link.href}
                              className="flex-1 py-3 text-[0.95rem] font-medium text-text-muted hover:text-accent transition-colors"
                              onClick={() => setMenuOpen(false)}
                            >
                              {link.label}
                            </Link>
                            <button
                              onClick={() =>
                                setExpandedMobile(
                                  isExpanded ? null : link.label
                                )
                              }
                              className="p-2 text-text-muted/60 hover:text-accent transition-colors"
                              aria-expanded={isExpanded}
                              aria-label={`Voir les sous-menus ${link.label}`}
                            >
                              <motion.span
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.25 }}
                                className="block"
                              >
                                <ChevronDown className="w-4 h-4" />
                              </motion.span>
                            </button>
                          </div>

                          {/* Accordion children */}
                          <AnimatePresence>
                            {isExpanded && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.3,
                                  ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 border-l-2 border-accent/20 ml-1 mb-2 flex flex-col gap-0.5">
                                  {link.children!.map((child) => {
                                    const Icon = child.icon;
                                    return (
                                      <Link
                                        key={child.href + child.label}
                                        href={child.href}
                                        className="flex items-center gap-2.5 py-2.5 text-[0.85rem] text-text-muted/80 hover:text-accent transition-colors"
                                        onClick={() => setMenuOpen(false)}
                                      >
                                        {Icon && (
                                          <Icon className="w-3.5 h-3.5 text-accent/50" />
                                        )}
                                        <span className="line-clamp-1">
                                          {child.label}
                                        </span>
                                        {child.badge && (
                                          <span className="text-[0.6rem] font-bold bg-accent text-dark px-1.5 py-0.5 rounded-full">
                                            {child.badge}
                                          </span>
                                        )}
                                        {child.price && (
                                          <span className="text-[0.72rem] text-accent/70 ml-auto">
                                            {child.price}/mois
                                          </span>
                                        )}
                                      </Link>
                                    );
                                  })}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={link.href}
                          className="block py-3 text-[0.95rem] font-medium text-text-muted hover:text-accent transition-colors"
                          onClick={() => setMenuOpen(false)}
                        >
                          {link.label}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
              <div className="flex items-center gap-3 mt-4 relative z-10">
                <ThemeSwitcher />
              </div>
              <div className="flex flex-col gap-3 mt-3 relative z-10">
                <Link
                  href={buttonHref}
                  className="block border border-white/[0.12] text-text-muted px-5 py-3 rounded-full font-semibold text-[0.85rem] text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  {buttonLabel}
                </Link>
                <Link
                  href="/contact"
                  className="block bg-accent text-dark px-5 py-3 rounded-full font-semibold text-[0.85rem] text-center"
                  onClick={() => setMenuOpen(false)}
                >
                  Contactez-nous
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}
