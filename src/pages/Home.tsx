import {
  useState,
  useEffect,
  useCallback,
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
import styles from "./Home.module.css"; // ✅ Add loader styling here

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

  const activeQuery = useCallback(
    (q?: string) => {
      const v = (q ?? query).trim();
      return v.length > 0 ? v : "jeans";
    },
    [query]
  );

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

  useEffect(() => {
    fetchResults("jeans", 1, pageSize);
  }, []);

  const handleSearch = useCallback(
    (val: string) => {
      const finalQuery = val.trim() || "jeans";
      fetchResults(finalQuery, 1, pageSize);
    },
    [fetchResults, pageSize]
  );

  const handleQuickSearch = useCallback(
    (val: string) => {
      const finalQuery = val.trim() || "jeans";
      setQuery(finalQuery);
      fetchResults(finalQuery, 1, pageSize);
    },
    [fetchResults, pageSize]
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
          onQuickSearch={handleQuickSearch}
        />

        {/* ✅ Modern loader while fetching */}
        {loading && (
          <div className={styles.loaderContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.loaderText}>Loading awesome products...</p>
          </div>
        )}

        {!loading && (
          <>
            {results.length > 0 ? (
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

                <Suspense
                  fallback={
                    <div className={styles.loaderContainer}>
                      <div className={styles.spinner}></div>
                      <p className={styles.loaderText}>Loading products...</p>
                    </div>
                  }
                >
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
            ) : (
              <div
                style={{
                  textAlign: "center",
                  marginTop: "3rem",
                  color: "#555",
                  fontSize: "1.1rem",
                }}
              >
                <p>😕 No products found for your search.</p>
                <p style={{ fontSize: "0.95rem", marginTop: "0.5rem" }}>
                  Try searching for something else, or browse popular categories
                  like <strong>Jeans</strong> or <strong>Shoes</strong>.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}

export default Home;
