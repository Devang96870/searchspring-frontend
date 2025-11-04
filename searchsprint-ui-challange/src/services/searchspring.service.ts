// src/services/searchspring.service.ts
import type { SearchspringResponse } from "../interfaces/api.interface";

const API_BASE = import.meta.env.VITE_API_BASE;
const SITE_ID = import.meta.env.VITE_SITE_ID;

export async function fetchSearchResults(
  query: string,
  page: number,
  resultsPerPage: number
): Promise<SearchspringResponse> {
  const url = `${API_BASE}?siteId=${SITE_ID}&resultsFormat=native&q=${encodeURIComponent(
    query || "jeans"
  )}&page=${page}&resultsPerPage=${resultsPerPage}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Error: ${response.status}`);
  }

  const data = (await response.json()) as SearchspringResponse;
  return data;
}
