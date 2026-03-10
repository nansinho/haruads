import type { Metadata } from "next";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { fetchCityBySlug, fetchAllCitySlugs } from "@/lib/cities";
import { seoConfig } from "@/lib/seo-config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CityHero from "./CityHero";
import CityAbout from "./CityAbout";
import CityFAQ from "./CityFAQ";
import CityCTA from "./CityCTA";
import CityFooterSEO from "./CityFooterSEO";
import CityJsonLd from "./CityJsonLd";

const Services = dynamic(() => import("@/components/Services"));
const HowWeWork = dynamic(() => import("@/components/HowWeWork"));
const Projects = dynamic(() => import("@/components/Projects"));

type Props = {
  params: Promise<{ ville: string }>;
};

export async function generateStaticParams() {
  const slugs = await fetchAllCitySlugs();
  return slugs.map((slug) => ({ ville: slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ville } = await params;
  const city = await fetchCityBySlug(ville);
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
  const city = await fetchCityBySlug(ville);
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
