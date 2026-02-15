// ============================================
// TypeScript types derived from Supabase migrations
// ============================================

// --- Auth & Users ---
export interface User {
  id: string;
  name: string | null;
  email: string;
  email_verified: string | null;
  password_hash: string | null;
  image: string | null;
  role: "admin" | "client" | "editor";
  company: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  is_active: boolean;
  last_login: string | null;
  created_at: string;
  updated_at: string;
}

// --- Content ---
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author_id: string | null;
  category: string | null;
  tags: string[];
  status: "draft" | "published" | "archived";
  is_ai_generated: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string[];
  published_at: string | null;
  views_count: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  tags: string[];
  client: string | null;
  year: number | null;
  featured: boolean;
  hero_visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Service {
  id: string;
  title: string;
  slug: string;
  description: string;
  long_description: string | null;
  icon: string | null;
  image_url: string | null;
  features: string[];
  price_from: number | null;
  is_active: boolean;
  sort_order: number;
  seo_title: string | null;
  seo_description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Offer {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price: number;
  price_type: "fixed" | "monthly" | "from" | "custom";
  features: string[];
  is_popular: boolean;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: string;
  name: string;
  slug: string;
  department: string | null;
  region: string | null;
  population: number | null;
  description: string | null;
  seo_title: string | null;
  seo_description: string | null;
  seo_content: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface LocalizedService {
  id: string;
  service_id: string;
  city_id: string;
  custom_title: string | null;
  custom_description: string | null;
  custom_content: string | null;
  seo_title: string | null;
  seo_description: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  service_name?: string;
  city_name?: string;
}

export interface SeoPage {
  id: string;
  page_path: string;
  title: string | null;
  description: string | null;
  keywords: string[];
  og_image: string | null;
  canonical_url: string | null;
  no_index: boolean;
  structured_data: Record<string, unknown> | null;
  created_at: string;
  updated_at: string;
}

// --- Client Management ---
export interface QuoteRequest {
  id: string;
  reference: string;
  client_id: string | null;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  service_id: string | null;
  budget_range: string | null;
  description: string;
  attachments: string[];
  status: "new" | "read" | "in_progress" | "quoted" | "accepted" | "rejected" | "expired";
  assigned_to: string | null;
  quoted_amount: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Ticket {
  id: string;
  reference: string;
  client_id: string | null;
  project_id: string | null;
  subject: string;
  description: string | null;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "in_progress" | "waiting_client" | "waiting_internal" | "resolved" | "closed";
  category: string;
  assigned_to: string | null;
  created_at: string;
  updated_at: string;
  resolved_at: string | null;
  closed_at: string | null;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  sender_id: string | null;
  message: string;
  attachments: string[];
  is_internal: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  source: string;
  status: "unread" | "read" | "replied" | "archived";
  replied_at: string | null;
  created_at: string;
}

// --- Marketing ---
export interface NewsletterSubscriber {
  id: string;
  email: string;
  name: string | null;
  status: "active" | "unsubscribed" | "bounced";
  source: string;
  subscribed_at: string;
  unsubscribed_at: string | null;
}

export interface NewsletterCampaign {
  id: string;
  subject: string;
  content: string;
  status: "draft" | "scheduled" | "sending" | "sent";
  sent_count: number;
  open_count: number;
  click_count: number;
  scheduled_at: string | null;
  sent_at: string | null;
  created_at: string;
}

export interface DynamicPricing {
  id: string;
  service_id: string | null;
  offer_id: string | null;
  name: string;
  base_price: number;
  current_price: number;
  discount_percent: number;
  valid_from: string | null;
  valid_until: string | null;
  conditions: Record<string, unknown>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  // Joined fields
  service_name?: string;
  offer_name?: string;
}

// --- Configuration ---
export interface SiteSetting {
  id: string;
  key: string;
  value: string | null;
  type: "string" | "number" | "boolean" | "json" | "image";
  category: string;
  label: string | null;
  description: string | null;
  updated_by: string | null;
  updated_at: string;
}

export interface SecurityLog {
  id: string;
  user_id: string | null;
  action: string;
  details: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
  severity: "info" | "warning" | "error" | "critical";
  created_at: string;
  // Joined fields
  user_name?: string;
  user_email?: string;
}

// --- Dashboard ---
export interface DashboardStats {
  total_clients: number;
  new_quotes: number;
  active_tickets: number;
  published_articles: number;
  newsletter_subs: number;
  unread_messages: number;
  total_projects: number;
  total_revenue: number;
  overdue_invoices: number;
  views_30d: number;
}

// --- Helpers ---
export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface QueryFilters {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  role?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}
