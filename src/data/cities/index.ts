import type { CityPageData } from "./_types";
import { gardanneData } from "./gardanne";
import { aixEnProvenceData } from "./aix-en-provence";
import { marseilleData } from "./marseille";
import { toulonData } from "./toulon";
import { avignonData } from "./avignon";
import { aubagneData } from "./aubagne";
import { salonDeProvenceData } from "./salon-de-provence";
import { martiguesData } from "./martigues";
import { istresData } from "./istres";
import { vitrollesData } from "./vitrolles";
import { arlesData } from "./arles";
import { nimesData } from "./nimes";
import { montpellierData } from "./montpellier";
import { niceData } from "./nice";
import { lyonData } from "./lyon";

export const citiesData: Record<string, CityPageData> = {
  gardanne: gardanneData,
  "aix-en-provence": aixEnProvenceData,
  marseille: marseilleData,
  toulon: toulonData,
  avignon: avignonData,
  aubagne: aubagneData,
  "salon-de-provence": salonDeProvenceData,
  martigues: martiguesData,
  istres: istresData,
  vitrolles: vitrollesData,
  arles: arlesData,
  nimes: nimesData,
  montpellier: montpellierData,
  nice: niceData,
  lyon: lyonData,
};

export const citySlugs = Object.keys(citiesData);

export function getCityBySlug(slug: string): CityPageData | undefined {
  return citiesData[slug];
}

export function getNearbyCities(slug: string): CityPageData[] {
  const city = citiesData[slug];
  if (!city) return [];
  return city.nearbyCities
    .map((nc) => citiesData[nc.slug])
    .filter((c): c is CityPageData => Boolean(c));
}

// Primary cities for footer and service pages (closest/largest)
export const primaryCitySlugs = [
  "gardanne",
  "aix-en-provence",
  "marseille",
  "aubagne",
  "toulon",
  "avignon",
  "nice",
  "lyon",
];

export type { CityPageData } from "./_types";
