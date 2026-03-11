import type { Metadata } from "next";
import { notFound } from "next/navigation";
import nextDynamic from "next/dynamic";
import { fetchCityBySlug } from "@/lib/cities";
import { seoConfig } from "@/lib/seo-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityHero from "./CityHero";
import CityAbout from "./CityAbout";
import CityFAQ from "./CityFAQ";
import CityCTA from "./CityCTA";
import CityFooterSEO from "./CityFooterSEO";
import CityJsonLd from "./CityJsonLd";

const Services = nextDynamic(() => import("@/components/Services"));
const HowWeWork = nextDynamic(() => import("@/components/HowWeWork"));
const Projects = nextDynamic(() => import("@/components/Projects"));

export const dynamic = "force-dynamic";

const ROUTE_PREFIX = "agence-web-";

/** Extract city slug from route param (e.g. "agence-web-gardanne" → "gardanne") */
function extractSlug(ville: string): string | null {
  if (!ville.startsWith(ROUTE_PREFIX)) return null;
  return ville.slice(ROUTE_PREFIX.length) || null;
}

type Props = {
  params: Promise<{ ville: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const slug = extractSlug(ville);
  if (!slug) return {};
  const city = await fetchCityBySlug(slug);
  if (!city) return {};

  const url = `${seoConfig.siteUrl}/agence-web-${city.slug}`;

  return {
    title: city.metaTitle,
    description: city.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: city.metaTitle,
      description: city.metaDescription,
      url,
      siteName: seoConfig.siteName,
      locale: seoConfig.locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: city.metaTitle,
      description: city.metaDescription,
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { ville } = await params;
  const slug = extractSlug(ville);
  if (!slug) notFound();
  const city = await fetchCityBySlug(slug);
  if (!city) notFound();

  return (
    <>
      <CityJsonLd city={city} />
      <Navbar />
      <main>
        <CityHero city={city} />
        <CityAbout city={city} />
        <Services />
        <HowWeWork />
        <Projects />
        <CityFAQ city={city} />
        <CityCTA city={city} />
      </main>
      <CityFooterSEO city={city} />
      <Footer />
    </>
  );
}
