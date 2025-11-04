// src/interfaces/api.interface.ts
import type { Product } from "./product.interface";
import type { PaginationInfo } from "./pagination.interface";

export interface SearchspringResponse {
  results: Product[];
  pagination: PaginationInfo;
}
