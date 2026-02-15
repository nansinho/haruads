"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { QueryFilters } from "@/types/database";

interface UseAdminDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  total: number;
  refetch: () => void;
}

export function useAdminData<T>(
  endpoint: string,
  filters: QueryFilters = {}
): UseAdminDataResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const abortRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (filters.page) params.set("page", String(filters.page));
      if (filters.pageSize) params.set("pageSize", String(filters.pageSize));
      if (filters.search) params.set("search", filters.search);
      if (filters.status) params.set("status", filters.status);
      if (filters.role) params.set("role", filters.role);
      if (filters.sortBy) params.set("sortBy", filters.sortBy);
      if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);

      const url = params.toString() ? `${endpoint}?${params}` : endpoint;
      const res = await fetch(url, { signal: controller.signal });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Erreur ${res.status}`);
      }

      const json = await res.json();

      if (Array.isArray(json)) {
        setData(json);
        setTotal(json.length);
      } else if (json.data) {
        setData(json.data);
        setTotal(json.count ?? json.data.length);
      } else {
        setData([json]);
        setTotal(1);
      }
    } catch (err: unknown) {
      if (err instanceof Error && err.name === "AbortError") return;
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, [endpoint, filters.page, filters.pageSize, filters.search, filters.status, filters.role, filters.sortBy, filters.sortOrder]);

  useEffect(() => {
    fetchData();
    return () => abortRef.current?.abort();
  }, [fetchData]);

  return { data, loading, error, total, refetch: fetchData };
}
