import { supabase } from "./supabase";
import type {
  QueryFilters,
  DashboardStats,
  User,
  BlogPost,
  Project,
  Offer,
  City,
  LocalizedService,
  SeoPage,
  QuoteRequest,
  Ticket,
  TicketMessage,
  ContactMessage,
  NewsletterSubscriber,
  NewsletterCampaign,
  DynamicPricing,
  SiteSetting,
  SecurityLog,
} from "@/types/database";

function getClient() {
  if (!supabase) throw new Error("Supabase non configuré");
  return supabase;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function paginate(query: any, filters: QueryFilters) {
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 20;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  return query.range(from, to);
}

// --- Dashboard ---
export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const db = getClient();
    const { data, error } = await db.from("dashboard_stats").select("*").single();
    if (error) throw error;
    return data as DashboardStats;
  },

  async getRecentActivity(limit = 10) {
    const db = getClient();
    const { data, error } = await db
      .from("security_logs")
      .select("id, action, severity, details, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data;
  },
};

// --- Users ---
export const usersService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db
      .from("users")
      .select("id, name, email, role, company, phone, is_active, last_login, created_at, updated_at", { count: "exact" });

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
    }
    if (filters.role && filters.role !== "all") {
      query = query.eq("role", filters.role);
    }

    query = query.order(filters.sortBy || "created_at", { ascending: filters.sortOrder === "asc" });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("users").select("id, name, email, role, company, phone, address, city, is_active, last_login, created_at, updated_at").eq("id", id).single();
  },

  async create(data: Partial<User>) {
    const db = getClient();
    return db.from("users").insert(data).select().single();
  },

  async update(id: string, data: Partial<User>) {
    const db = getClient();
    return db.from("users").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("users").delete().eq("id", id);
  },
};

// --- Blog ---
export const blogService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db
      .from("blog_posts")
      .select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,category.ilike.%${filters.search}%`);
    }
    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    query = query.order(filters.sortBy || "created_at", { ascending: filters.sortOrder === "asc" });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("blog_posts").select("*").eq("id", id).single();
  },

  async create(data: Partial<BlogPost>) {
    const db = getClient();
    return db.from("blog_posts").insert(data).select().single();
  },

  async update(id: string, data: Partial<BlogPost>) {
    const db = getClient();
    return db.from("blog_posts").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("blog_posts").delete().eq("id", id);
  },
};

// --- Projects ---
export const projectsService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db.from("projects").select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`title.ilike.%${filters.search}%,client.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    if (filters.status === "featured") {
      query = query.eq("featured", true);
    } else if (filters.status === "hero") {
      query = query.eq("hero_visible", true);
    }

    query = query.order(filters.sortBy || "sort_order", { ascending: true });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("projects").select("*").eq("id", id).single();
  },

  async create(data: Partial<Project>) {
    const db = getClient();
    return db.from("projects").insert(data).select().single();
  },

  async update(id: string, data: Partial<Project>) {
    const db = getClient();
    return db.from("projects").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("projects").delete().eq("id", id);
  },
};

// --- Offers ---
export const offersService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db.from("offers").select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }
    if (filters.status === "popular") {
      query = query.eq("is_popular", true);
    } else if (filters.status === "active") {
      query = query.eq("is_active", true);
    } else if (filters.status === "inactive") {
      query = query.eq("is_active", false);
    }

    query = query.order("sort_order", { ascending: true });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("offers").select("*").eq("id", id).single();
  },

  async create(data: Partial<Offer>) {
    const db = getClient();
    return db.from("offers").insert(data).select().single();
  },

  async update(id: string, data: Partial<Offer>) {
    const db = getClient();
    return db.from("offers").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("offers").delete().eq("id", id);
  },
};

// --- Cities ---
export const citiesService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db.from("cities").select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,department.ilike.%${filters.search}%,region.ilike.%${filters.search}%`);
    }
    if (filters.status === "active") {
      query = query.eq("is_active", true);
    } else if (filters.status === "inactive") {
      query = query.eq("is_active", false);
    }

    query = query.order("name", { ascending: true });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("cities").select("*").eq("id", id).single();
  },

  async create(data: Partial<City>) {
    const db = getClient();
    return db.from("cities").insert(data).select().single();
  },

  async update(id: string, data: Partial<City>) {
    const db = getClient();
    return db.from("cities").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("cities").delete().eq("id", id);
  },
};

// --- Localized Services ---
export const localizedServicesService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db
      .from("localized_services")
      .select("*, services(title), cities(name)", { count: "exact" });

    if (filters.status === "active") {
      query = query.eq("is_active", true);
    } else if (filters.status === "inactive") {
      query = query.eq("is_active", false);
    }

    query = query.order("created_at", { ascending: false });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("localized_services").select("*, services(title), cities(name)").eq("id", id).single();
  },

  async create(data: Partial<LocalizedService>) {
    const db = getClient();
    return db.from("localized_services").insert(data).select().single();
  },

  async update(id: string, data: Partial<LocalizedService>) {
    const db = getClient();
    return db.from("localized_services").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("localized_services").delete().eq("id", id);
  },
};

// --- SEO Pages ---
export const seoService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db.from("seo_pages").select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`page_path.ilike.%${filters.search}%,title.ilike.%${filters.search}%`);
    }
    if (filters.status === "indexed") {
      query = query.eq("no_index", false);
    } else if (filters.status === "noindex") {
      query = query.eq("no_index", true);
    }

    query = query.order("page_path", { ascending: true });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("seo_pages").select("*").eq("id", id).single();
  },

  async create(data: Partial<SeoPage>) {
    const db = getClient();
    return db.from("seo_pages").insert(data).select().single();
  },

  async update(id: string, data: Partial<SeoPage>) {
    const db = getClient();
    return db.from("seo_pages").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("seo_pages").delete().eq("id", id);
  },
};

// --- Quote Requests ---
export const quotesService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db.from("quote_requests").select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`reference.ilike.%${filters.search}%,name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,company.ilike.%${filters.search}%`);
    }
    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    query = query.order("created_at", { ascending: false });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("quote_requests").select("*").eq("id", id).single();
  },

  async create(data: Partial<QuoteRequest>) {
    const db = getClient();
    return db.from("quote_requests").insert(data).select().single();
  },

  async update(id: string, data: Partial<QuoteRequest>) {
    const db = getClient();
    return db.from("quote_requests").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("quote_requests").delete().eq("id", id);
  },

  async getNextReference() {
    const db = getClient();
    const year = new Date().getFullYear();
    const { count } = await db
      .from("quote_requests")
      .select("id", { count: "exact", head: true })
      .ilike("reference", `DEV-${year}-%`);
    return `DEV-${year}-${String((count || 0) + 1).padStart(3, "0")}`;
  },
};

// --- Tickets ---
export const ticketsService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db.from("tickets").select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`reference.ilike.%${filters.search}%,subject.ilike.%${filters.search}%`);
    }
    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    query = query.order("created_at", { ascending: false });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("tickets").select("*").eq("id", id).single();
  },

  async create(data: Partial<Ticket>) {
    const db = getClient();
    return db.from("tickets").insert(data).select().single();
  },

  async update(id: string, data: Partial<Ticket>) {
    const db = getClient();
    return db.from("tickets").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("tickets").delete().eq("id", id);
  },

  async getMessages(ticketId: string) {
    const db = getClient();
    return db
      .from("ticket_messages")
      .select("*")
      .eq("ticket_id", ticketId)
      .order("created_at", { ascending: true });
  },

  async addMessage(data: Partial<TicketMessage>) {
    const db = getClient();
    return db.from("ticket_messages").insert(data).select().single();
  },
};

// --- Contact Messages ---
export const messagesService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db.from("contact_messages").select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,subject.ilike.%${filters.search}%,message.ilike.%${filters.search}%`);
    }
    if (filters.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    query = query.order("created_at", { ascending: false });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("contact_messages").select("*").eq("id", id).single();
  },

  async update(id: string, data: Partial<ContactMessage>) {
    const db = getClient();
    return db.from("contact_messages").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("contact_messages").delete().eq("id", id);
  },
};

// --- Newsletter ---
export const newsletterService = {
  subscribers: {
    async list(filters: QueryFilters) {
      const db = getClient();
      let query = db.from("newsletter_subscribers").select("*", { count: "exact" });

      if (filters.search) {
        query = query.or(`email.ilike.%${filters.search}%,name.ilike.%${filters.search}%`);
      }
      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      query = query.order("subscribed_at", { ascending: false });
      return paginate(query, filters);
    },

    async create(data: Partial<NewsletterSubscriber>) {
      const db = getClient();
      return db.from("newsletter_subscribers").insert(data).select().single();
    },

    async update(id: string, data: Partial<NewsletterSubscriber>) {
      const db = getClient();
      return db.from("newsletter_subscribers").update(data).eq("id", id).select().single();
    },

    async delete(id: string) {
      const db = getClient();
      return db.from("newsletter_subscribers").delete().eq("id", id);
    },
  },

  campaigns: {
    async list(filters: QueryFilters) {
      const db = getClient();
      let query = db.from("newsletter_campaigns").select("*", { count: "exact" });

      if (filters.search) {
        query = query.ilike("subject", `%${filters.search}%`);
      }
      if (filters.status && filters.status !== "all") {
        query = query.eq("status", filters.status);
      }

      query = query.order("created_at", { ascending: false });
      return paginate(query, filters);
    },

    async create(data: Partial<NewsletterCampaign>) {
      const db = getClient();
      return db.from("newsletter_campaigns").insert(data).select().single();
    },

    async update(id: string, data: Partial<NewsletterCampaign>) {
      const db = getClient();
      return db.from("newsletter_campaigns").update(data).eq("id", id).select().single();
    },

    async delete(id: string) {
      const db = getClient();
      return db.from("newsletter_campaigns").delete().eq("id", id);
    },
  },
};

// --- Dynamic Pricing ---
export const pricingService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db
      .from("dynamic_pricing")
      .select("*, services(title), offers(name)", { count: "exact" });

    if (filters.search) {
      query = query.ilike("name", `%${filters.search}%`);
    }
    if (filters.status === "active") {
      query = query.eq("is_active", true);
    } else if (filters.status === "inactive") {
      query = query.eq("is_active", false);
    }

    query = query.order("created_at", { ascending: false });
    return paginate(query, filters);
  },

  async getById(id: string) {
    const db = getClient();
    return db.from("dynamic_pricing").select("*, services(title), offers(name)").eq("id", id).single();
  },

  async create(data: Partial<DynamicPricing>) {
    const db = getClient();
    return db.from("dynamic_pricing").insert(data).select().single();
  },

  async update(id: string, data: Partial<DynamicPricing>) {
    const db = getClient();
    return db.from("dynamic_pricing").update(data).eq("id", id).select().single();
  },

  async delete(id: string) {
    const db = getClient();
    return db.from("dynamic_pricing").delete().eq("id", id);
  },
};

// --- Settings ---
export const settingsService = {
  async getAll() {
    const db = getClient();
    return db.from("site_settings").select("*").order("category");
  },

  async upsert(settings: { key: string; value: string; updated_by?: string }[]) {
    const db = getClient();
    return db.from("site_settings").upsert(
      settings.map((s) => ({ ...s, updated_at: new Date().toISOString() })),
      { onConflict: "key" }
    );
  },
};

// --- Security Logs ---
export const logsService = {
  async list(filters: QueryFilters) {
    const db = getClient();
    let query = db.from("security_logs").select("*", { count: "exact" });

    if (filters.search) {
      query = query.or(`action.ilike.%${filters.search}%,ip_address.ilike.%${filters.search}%`);
    }
    if (filters.status && filters.status !== "all") {
      query = query.eq("severity", filters.status);
    }

    query = query.order("created_at", { ascending: false });
    return paginate(query, filters);
  },

  async create(data: Partial<SecurityLog>) {
    const db = getClient();
    return db.from("security_logs").insert(data);
  },
};
