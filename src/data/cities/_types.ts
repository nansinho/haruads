export interface CityPageData {
  // Identity
  name: string;
  slug: string;
  department: string;
  departmentCode: string;
  region: string;
  population: number;
  postalCode: string;
  latitude: number;
  longitude: number;
  distanceFromAgency: number;
  wikipediaUrl: string;

  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };

  // Page content
  hero: {
    title: string;
    subtitle: string;
    description: string;
  };

  introduction: {
    title: string;
    paragraphs: string[];
  };

  localStats: {
    value: string;
    label: string;
  }[];

  serviceHighlights: {
    serviceSlug: string;
    localizedSubtitle: string;
  }[];

  advantages: {
    title: string;
    description: string;
    icon: string;
  }[];

  faq: {
    question: string;
    answer: string;
  }[];

  nearbyCities: {
    slug: string;
    name: string;
    distance: number;
  }[];

  lastUpdated: string;
}
