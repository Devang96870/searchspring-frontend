import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type FormEvent,
  Suspense,
} from "react";
import React from "react";

import Header from "../components/Header/Header";
import SearchBar from "../components/Searchbar/SearchBar";
import Pagination from "../components/Pagination/Pagination";
import type { Product } from "../interfaces/product.interface";
import type { PaginationInfo } from "../interfaces/pagination.interface";
import { fetchSearchResults } from "../services/searchspring.service";

const ProductGrid = React.lazy(() => import("../components/Product/Productgrid/ProductGrid"));

const API_BASE = import.meta.env.VITE_API_BASE as string;
const SITE_ID = import.meta.env.VITE_SITE_ID as string;

function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo>({});
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(
    Number(import.meta.env.VITE_DEFAULT_RESULTS_PER_PAGE) || 20
  );

  // store the debounce timer reference
  const debounceRef = useRef<number | undefined>(undefined);

  const activeQuery = useCallback(
    (q?: string) => {
      const v = (q ?? query).trim();
      return v.length > 0 ? v : "jeans";
    },
    [query]
  );

  // ✅ Core fetch logic memoized
  const fetchResults = useCallback(
    async (q: string = query, page = 1, size = pageSize) => {
      setLoading(true);
      try {
        const data = await fetchSearchResults(activeQuery(q), page, size);
        setResults(data.results || []);
        setPagination(data.pagination || {});
      } catch (err) {
        console.error("Error fetching search results:", err);
        setResults([]);
        setPagination({});
      } finally {
        setLoading(false);
      }
    },
    [activeQuery, pageSize, query]
  );

  // 🧩 Initial load (default “jeans”)
  useEffect(() => {
    fetchResults("jeans", 1, pageSize);
  }, []);

  // ✅ Debounce search when typing
  useEffect(() => {
    // skip debounce if empty
    if (query.trim() === "") return;

    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      fetchResults(query, 1, pageSize);
    }, 400); // 400ms debounce delay for smoother typing
    return () => window.clearTimeout(debounceRef.current);
  }, [query, pageSize]);

  // ✅ Optimized search submit (immediate search)
  const handleSearch = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      fetchResults(query, 1, pageSize);
    },
    [fetchResults, query, pageSize]
  );

  const handleNext = useCallback(() => {
    if (pagination.nextPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchResults(activeQuery(), pagination.nextPage, pageSize);
    }
  }, [pagination, activeQuery, fetchResults, pageSize]);

  const handlePrev = useCallback(() => {
    if (pagination.previousPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchResults(activeQuery(), pagination.previousPage, pageSize);
    }
  }, [pagination, activeQuery, fetchResults, pageSize]);

  const handlePageSelect = useCallback(
    (pageNum: number) => {
      if (!pageNum || pageNum < 1) return;
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchResults(activeQuery(), pageNum, pageSize);
    },
    [activeQuery, fetchResults, pageSize]
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      setPageSize(size);
      fetchResults(activeQuery(), 1, size);
    },
    [activeQuery, fetchResults]
  );

  // 🪶 Suspense fallback for lazy ProductGrid
  return (
    <>
      <Header />
      <main
        style={{
          maxWidth: "1100px",
          margin: "2rem auto",
          padding: "0 1rem",
        }}
      >
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          onQuickSearch={(keyword) => {
            setQuery(keyword);
            fetchResults(keyword, 1, pageSize);
          }}
        />

        {loading && <p style={{ textAlign: "center" }}>Fetching products...</p>}

        {!loading && (
          <>
            <Pagination
              current={pagination.currentPage}
              total={pagination.totalPages}
              totalResults={pagination.totalResults}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              onNext={handleNext}
              onPrev={handlePrev}
              onPageSelect={handlePageSelect}
              hasNext={!!pagination.nextPage}
              hasPrev={!!pagination.previousPage}
            />

            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading products...</p>}>
              <ProductGrid products={results} />
            </Suspense>

            <Pagination
              current={pagination.currentPage}
              total={pagination.totalPages}
              totalResults={pagination.totalResults}
              pageSize={pageSize}
              onPageSizeChange={handlePageSizeChange}
              onNext={handleNext}
              onPrev={handlePrev}
              onPageSelect={handlePageSelect}
              hasNext={!!pagination.nextPage}
              hasPrev={!!pagination.previousPage}
            />
          </>
        )}
      </main>
    </>
  );
}

export default Home;
