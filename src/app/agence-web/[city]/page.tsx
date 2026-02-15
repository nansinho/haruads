import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { citiesData, citySlugs, getCityBySlug } from "@/data/cities";
import CityHero from "@/components/city/CityHero";
import CityIntroduction from "@/components/city/CityIntroduction";
import CityServices from "@/components/city/CityServices";
import CityStats from "@/components/city/CityStats";
import CityAdvantages from "@/components/city/CityAdvantages";
import CityFAQ from "@/components/city/CityFAQ";
import NearbyCities from "@/components/city/NearbyCities";
import CityCTA from "@/components/city/CityCTA";
import CityJsonLd from "@/components/city/CityJsonLd";

export function generateStaticParams() {
  return citySlugs.map((slug) => ({ city: slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};

  const siteUrl = "https://agencehds.fr";

  return {
    title: city.seo.title,
    description: city.seo.description,
    keywords: city.seo.keywords,
    alternates: {
      canonical: `${siteUrl}/agence-web/${city.slug}`,
    },
    openGraph: {
      title: city.seo.title,
      description: city.seo.description,
      url: `${siteUrl}/agence-web/${city.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: city.seo.title,
      description: city.seo.description,
    },
  };
}

export default async function CityPage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  if (!city) {
    notFound();
  }

  // Get all cities for the map
  const allCities = Object.values(citiesData).map((c) => ({
    name: c.name,
    slug: c.slug,
    latitude: c.latitude,
    longitude: c.longitude,
  }));

  return (
    <>
      <Navbar />
      <main>
        <CityHero city={city} />
        <CityIntroduction city={city} />
        <CityServices city={city} />
        <CityStats city={city} />
        <CityAdvantages city={city} />
        <CityFAQ city={city} />
        <NearbyCities city={city} />
        <CityCTA city={city} />
      </main>
      <Footer />
      <CityJsonLd city={city} />
    </>
  );
}
