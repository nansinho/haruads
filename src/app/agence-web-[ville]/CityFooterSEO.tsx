import Link from "next/link";
import type { City } from "@/lib/cities";
import { cities } from "@/lib/cities";

function getNearbyCities(currentSlug: string): string[] {
  const nearbyMap: Record<string, string[]> = {
    gardanne: ["Aix-en-Provence", "Marseille", "Aubagne", "Vitrolles"],
    "aix-en-provence": ["Gardanne", "Marseille", "Salon-de-Provence", "Vitrolles"],
    marseille: ["Aix-en-Provence", "Aubagne", "Gardanne", "La Ciotat"],
    aubagne: ["Marseille", "La Ciotat", "Gardanne", "Aix-en-Provence"],
    vitrolles: ["Aix-en-Provence", "Marseille", "Martigues", "Gardanne"],
    martigues: ["Vitrolles", "Salon-de-Provence", "Aix-en-Provence", "Marseille"],
    "salon-de-provence": ["Aix-en-Provence", "Martigues", "Vitrolles", "Gardanne"],
    "la-ciotat": ["Aubagne", "Marseille", "Gardanne", "Aix-en-Provence"],
  };
  return nearbyMap[currentSlug] || cities.filter((c) => c.slug !== currentSlug).slice(0, 4).map((c) => c.name);
}

export default function CityFooterSEO({ city }: { city: City }) {
  const nearby = getNearbyCities(city.slug);

  return (
    <div className="bg-dark border-t border-white/[0.04] text-white">
      <div className="max-w-[1400px] mx-auto px-5 pt-14 pb-10 lg:px-12">
        <p className="text-sm text-gray-400 leading-[1.8]">
          L&apos;Agence HDS accompagne les entreprises de {city.name} dans leur transformation
          digitale :{" "}
          <Link href="/services/developpement-web" className="text-gray-400 font-semibold hover:text-accent transition-colors">
            cr&eacute;ation de sites internet
          </Link>,{" "}
          <Link href="/services/solutions-saas" className="text-gray-400 font-semibold hover:text-accent transition-colors">
            applications web sur mesure
          </Link>,{" "}
          <Link href="/services/e-commerce" className="text-gray-400 font-semibold hover:text-accent transition-colors">
            e-commerce
          </Link> et{" "}
          <Link href="/services/branding-seo" className="text-gray-400 font-semibold hover:text-accent transition-colors">
            SEO
          </Link>.
          Bas&eacute;s &agrave; Gardanne, nous intervenons sur {city.name}, {nearby.join(", ")} et toute la r&eacute;gion PACA.
          D&eacute;couvrez nos{" "}
          <Link href="/services" className="text-gray-400 font-semibold hover:text-accent transition-colors">
            services
          </Link>,{" "}
          <Link href="/projets" className="text-gray-400 font-semibold hover:text-accent transition-colors">
            projets
          </Link>,{" "}
          <Link href="/tarifs" className="text-gray-400 font-semibold hover:text-accent transition-colors">
            tarifs
          </Link> ou{" "}
          <Link href="/contact" className="text-gray-400 font-semibold hover:text-accent transition-colors">
            contactez-nous
          </Link> pour un devis gratuit.
        </p>
      </div>
    </div>
  );
}
