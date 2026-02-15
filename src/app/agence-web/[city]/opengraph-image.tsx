import { ImageResponse } from "next/og";
import { getCityBySlug, citySlugs } from "@/data/cities";

export const alt = "Agence Web";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return citySlugs.map((slug) => ({ city: slug }));
}

export default async function OGImage({
  params,
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);

  const cityName = city?.name || "PACA";
  const subtitle = city
    ? `${city.department} (${city.departmentCode}) — ${city.distanceFromAgency === 0 ? "Notre ville" : `À ${city.distanceFromAgency} km`}`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#0a0a0a",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 18, letterSpacing: 6, color: "rgba(200,170,110,0.6)", textTransform: "uppercase" as const }}>
          AGENCE HDS
        </div>
        <div style={{ display: "flex", fontSize: 56, fontWeight: "bold", marginTop: 20, textAlign: "center" as const }}>
          {`Agence Web à ${cityName}`}
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "rgba(200,170,110,0.8)", marginTop: 16 }}>
          {subtitle}
        </div>
        <div style={{ display: "flex", fontSize: 16, color: "rgba(255,255,255,0.3)", marginTop: 40 }}>
          Sites Web • E-Commerce • SaaS • IA • Design • SEO
        </div>
        <div style={{ display: "flex", fontSize: 14, color: "rgba(255,255,255,0.2)", marginTop: 24 }}>
          agencehds.fr
        </div>
      </div>
    ),
    { ...size }
  );
}
