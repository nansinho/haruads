"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import CountUp from "@/components/CountUp";

const experienceYears = `${new Date().getFullYear() - 2014}+`;

const values = [
  {
    num: "01",
    title: "Excellence",
    desc: "Nous visons la perfection dans chaque ligne de code, chaque design, chaque interaction. L\u2019excellence n\u2019est pas un objectif, c\u2019est notre standard.",
  },
  {
    num: "02",
    title: "Innovation",
    desc: "L\u2019int\u00e9gration de l\u2019IA et des technologies de pointe nous permet de cr\u00e9er des solutions digitales toujours plus performantes.",
  },
  {
    num: "03",
    title: "Passion",
    desc: "Du joueur passionn\u00e9 au d\u00e9veloppeur d\u00e9vou\u00e9, notre amour pour la technologie anime chaque projet et inspire notre travail quotidien.",
  },
  {
    num: "04",
    title: "Transparence",
    desc: "Communication claire, honn\u00eatet\u00e9 totale et relation de confiance : nous croyons en une collaboration transparente avec nos clients.",
  },
  {
    num: "05",
    title: "Accompagnement",
    desc: "Nous sommes \u00e0 vos c\u00f4t\u00e9s \u00e0 chaque \u00e9tape, de la conception \u00e0 la maintenance, pour garantir le succ\u00e8s de votre projet digital.",
  },
  {
    num: "06",
    title: "Performance",
    desc: "Vitesse, optimisation et efficacit\u00e9 : nos solutions sont con\u00e7ues pour offrir les meilleures performances et une exp\u00e9rience utilisateur exceptionnelle.",
  },
];

const partners = [
  {
    name: "Neuralia",
    logo: "/Logo_Neuralia_2.png",
    href: "https://neuralia.life/",
    desc: "Un partenaire cl\u00e9 qui a permis \u00e0 HDS de d\u00e9velopper son expertise dans des projets innovants et ambitieux.",
  },
  {
    name: "Aiako",
    logo: "/LOGO-AIAKO_COUL_RVB300-NEW.png",
    href: "https://aiako.fr/",
    desc: "Merci \u00e0 Aiako pour leur confiance et leur collaboration, d\u00e9terminantes dans la croissance de notre entreprise.",
  },
];

export default function AProposPage() {
  return (
    <>
      <Navbar />
      <main>
        {/* ── Section 1 : Hero ── */}
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
              <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                Notre Histoire
              </span>
              <h1 className="text-[2rem] sm:text-[2.8rem] lg:text-[4rem] leading-[1.08] tracking-[-0.02em] mt-4">
                <span className="font-light">Cette Entreprise, </span>
                <span className="font-serif italic text-accent">
                  C&apos;est Ma Vie.
                </span>
              </h1>
              <p className="text-[0.95rem] text-white/40 mt-5 max-w-[520px] leading-[1.8] font-light">
                Du Geek passionn&eacute; de Call of Duty 2 &agrave;
                l&apos;entrepreneur digital, l&apos;histoire d&apos;une passion
                devenue r&eacute;alit&eacute;.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ── Section 2 : Les Origines — COD2 & Geek ── */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
              <ScrollReveal animation="fadeLeft">
                <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/Jc4K8rmE0yA"
                    title="La preuve de mon c&ocirc;t&eacute; Geek"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150} animation="fadeRight">
                <div>
                  <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                    Les Origines
                  </span>
                  <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.1] tracking-[-0.02em] mt-4">
                    <span className="font-light">Tout a commenc&eacute; avec </span>
                    <span className="font-serif italic">Call of Duty 2.</span>
                  </h2>
                  <p className="text-[0.9rem] text-text-body mt-5 leading-[1.8]">
                    Ma passion pour l&apos;informatique n&apos;est pas n&eacute;e
                    dans une salle de classe, mais devant un &eacute;cran, manette
                    en main, &agrave; explorer les possibilit&eacute;s infinies du
                    digital.
                  </p>
                  <p className="text-[0.9rem] text-text-body mt-4 leading-[1.8]">
                    &Agrave; force de passer des heures sur Call of Duty 2,
                    j&apos;ai d&eacute;velopp&eacute; bien plus qu&apos;un simple
                    talent de joueur. J&apos;ai d&eacute;couvert ma passion pour la
                    technologie, les serveurs, le d&eacute;veloppement web et tout
                    l&apos;&eacute;cosyst&egrave;me digital. Et c&apos;est cette
                    passion d&eacute;bordante qui m&apos;a conduit &agrave;
                    cr&eacute;er HDS.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Section 3 : Fondation — Depuis 2015 ── */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <div className="grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
              <ScrollReveal animation="fadeLeft">
                <div className="rounded-2xl overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/founder-with-mother.jpg"
                    alt="Fondateur avec sa m&egrave;re"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={150} animation="fadeRight">
                <div>
                  <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                    Depuis 2015
                  </span>
                  <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.1] tracking-[-0.02em] mt-4">
                    <span className="font-light">L&apos;Histoire </span>
                    <span className="font-serif italic">de HDS.</span>
                  </h2>
                  <p className="text-[0.9rem] text-text-body mt-5 leading-[1.8]">
                    HDS a vu le jour en 2015, fruit d&apos;une passion pour le
                    d&eacute;veloppement web et d&apos;une volont&eacute; de
                    cr&eacute;er des solutions digitales innovantes et sur mesure.
                    Une aventure entrepreneuriale n&eacute;e d&apos;une passion pour
                    le digital et nourrie par un soutien familial exceptionnel.
                  </p>

                  {/* Citation hommage */}
                  <div className="bg-accent/5 p-6 rounded-xl border border-accent/10 mt-6">
                    <p className="text-[0.88rem] text-text-body leading-[1.8] italic font-serif">
                      &ldquo;Ma m&egrave;re m&apos;a soutenu comme une folle pour
                      cr&eacute;er ma petite entreprise. Son d&eacute;part en
                      ao&ucirc;t 2024 a marqu&eacute; &agrave; jamais mon
                      c&oelig;ur, mais son soutien continue de m&apos;inspirer
                      chaque jour.&rdquo;
                    </p>
                  </div>

                  {/* Compteur experience */}
                  <div className="flex items-center gap-4 mt-8">
                    <CountUp
                      value={experienceYears}
                      className="text-[2.8rem] font-serif text-accent leading-none"
                    />
                    <span className="text-[0.85rem] text-text-body leading-[1.4]">
                      ann&eacute;es d&apos;expertise
                      <br />
                      et de passion
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Section 4 : Messages de Maman ── */}
        <section className="bg-dark text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12 relative z-2">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto mb-14">
                <div className="w-12 h-12 rounded-full bg-accent/20 mx-auto flex items-center justify-center mb-5">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 fill-accent"
                  >
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Les Mots qui </span>
                  <span className="font-serif italic text-accent">Restent.</span>
                </h2>
                <p className="text-[0.9rem] text-white/40 mt-4 leading-[1.7]">
                  Des messages pr&eacute;cieux qui continuent de guider mon chemin.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ScrollReveal delay={100} animation="fadeLeft">
                <div className="bg-dark-2 rounded-2xl overflow-hidden border border-white/[0.06] group">
                  <div className="relative h-[300px] sm:h-[350px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/mother-note-1.jpg"
                      alt="Message de maman"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[0.9rem] text-white/70 italic font-serif leading-[1.7]">
                      &ldquo;Un grand MERCI encore !! Je t&apos;aime tr&egrave;s
                      fort. J&apos;esp&egrave;re que tout va aller pour toi, les
                      amours.&rdquo;
                    </p>
                    <div className="mt-3 text-[0.78rem] text-accent font-semibold">
                      &mdash; Maman
                    </div>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={200} animation="fadeRight">
                <div className="bg-dark-2 rounded-2xl overflow-hidden border border-white/[0.06] group">
                  <div className="relative h-[300px] sm:h-[350px] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="/images/mother-note-2.jpg"
                      alt="Message de maman"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-[0.9rem] text-white/70 italic font-serif leading-[1.7]">
                      &ldquo;Le travail, je te souhaite que du bonheur. Bisous
                      Maman.&rdquo;
                    </p>
                    <div className="mt-3 text-[0.78rem] text-accent font-semibold">
                      &mdash; Maman
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ── Section 5 : Partenaires & Remerciements ── */}
        <section className="bg-light text-text-dark">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[700px] mx-auto mb-14">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  Remerciements
                </span>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                  <span className="font-light">Merci &agrave; Ceux qui Ont </span>
                  <span className="font-serif italic">Cru en Nous.</span>
                </h2>
                <p className="text-[0.9rem] text-text-body mt-4 leading-[1.7]">
                  Sans certaines entreprises et partenaires, HDS n&apos;aurait pas
                  pu &eacute;voluer et atteindre le niveau qu&apos;elle a
                  aujourd&apos;hui. Un immense merci &agrave; ceux qui nous ont fait
                  confiance.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {partners.map((partner, i) => (
                <ScrollReveal key={partner.name} delay={i * 100}>
                  <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block h-full"
                  >
                    <div className="bg-white rounded-2xl p-8 border border-gray-100 text-center hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20 transition-all duration-300 h-full">
                      <div className="h-24 mx-auto flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={partner.logo}
                          alt={`Logo ${partner.name}`}
                          className="h-full w-auto object-contain"
                        />
                      </div>
                      <h3 className="text-[1.1rem] font-semibold text-text-dark mb-2 group-hover:text-accent transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-[0.82rem] text-text-body leading-[1.7]">
                        {partner.desc}
                      </p>
                    </div>
                  </a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── Section 6 : Valeurs & Mission ── */}
        <section className="bg-dark text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto mb-14">
                <span className="text-[0.72rem] uppercase tracking-[3px] text-accent font-semibold">
                  Nos Valeurs
                </span>
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em] mt-4">
                  <span className="font-light">Ce qui Nous </span>
                  <span className="font-serif italic text-accent">
                    D&eacute;finit.
                  </span>
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {values.map((value, i) => (
                <ScrollReveal key={value.num} delay={i * 80}>
                  <div className="bg-dark-2 rounded-2xl p-7 lg:p-8 border border-white/[0.06] h-full hover:border-white/[0.12] transition-all duration-300">
                    <div className="flex items-start gap-5">
                      <span className="text-[2.8rem] font-serif text-accent leading-none shrink-0">
                        {value.num}
                      </span>
                      <div>
                        <h3 className="text-[1.1rem] font-semibold text-white mb-2">
                          {value.title}
                        </h3>
                        <p className="text-[0.82rem] text-white/50 leading-[1.7]">
                          {value.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Mission card */}
            <ScrollReveal delay={200} animation="scaleUp">
              <div className="mt-12 bg-accent/5 border border-accent/20 rounded-2xl p-8 lg:p-10">
                <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                  <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center shrink-0">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-8 h-8 fill-none stroke-dark stroke-2"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-[1.3rem] font-semibold text-white mb-2">
                      Notre Mission
                    </h3>
                    <p className="text-[0.9rem] text-white/60 leading-[1.8]">
                      Transformer les id&eacute;es en solutions digitales
                      performantes et sur mesure, en combinant expertise technique,
                      innovation constante et un accompagnement personnalis&eacute;
                      pour faire de chaque projet une r&eacute;ussite.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Section 7 : Vision ── */}
        <section className="bg-white text-text-dark">
          <div className="max-w-[800px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal animation="scaleUp">
              <div className="text-center">
                <h2 className="text-[1.6rem] sm:text-[2rem] lg:text-[2.5rem] leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Plus qu&apos;une entreprise, </span>
                  <span className="font-serif italic">une passion.</span>
                </h2>
                <p className="text-[0.9rem] text-text-body mt-6 leading-[1.8]">
                  Chaque projet que nous r&eacute;alisons porte en lui cette
                  histoire, ce d&eacute;vouement et cet amour du travail bien fait.
                  HDS n&apos;est pas qu&apos;une simple agence digitale, c&apos;est
                  le fruit d&apos;un r&ecirc;ve soutenu, d&apos;une passion nourrie
                  et d&apos;un engagement total envers l&apos;excellence.
                </p>
                <p className="text-[0.9rem] text-text-body mt-4 leading-[1.8]">
                  Aujourd&apos;hui, nous continuons &agrave; grandir, &agrave;
                  innover et &agrave; accompagner nos clients avec la m&ecirc;me
                  d&eacute;termination et le m&ecirc;me c&oelig;ur qui ont fait
                  na&icirc;tre cette aventure il y a plus de 10 ans.
                </p>
                <div className="mt-10 inline-flex items-center gap-3 bg-accent/5 px-6 py-3 rounded-full border border-accent/10">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-[0.85rem] font-medium text-text-dark">
                    Avec amour et d&eacute;termination depuis 2015
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── Section 8 : CTA ── */}
        <section className="bg-accent text-white">
          <div className="max-w-[1200px] mx-auto px-5 py-[100px] lg:px-12">
            <ScrollReveal>
              <div className="text-center max-w-[600px] mx-auto">
                <h2 className="text-fluid-h2 leading-[1.08] tracking-[-0.02em]">
                  <span className="font-light">Envie de </span>
                  <span className="font-serif italic">collaborer ?</span>
                </h2>
                <p className="text-[0.9rem] text-white/70 mt-4 leading-[1.7]">
                  Discutons de votre projet autour d&apos;un caf&eacute; (virtuel ou
                  r&eacute;el).
                </p>
                <div className="flex flex-wrap gap-4 justify-center mt-10">
                  <motion.a
                    href="/contact"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-accent font-medium text-[0.9rem] cursor-pointer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Nous contacter
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4 stroke-accent fill-none stroke-2"
                    >
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
