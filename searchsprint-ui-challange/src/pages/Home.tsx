import { useState, useEffect, type FormEvent, useCallback, Suspense } from "react";
import Header from "../components/Header/Header";
import SearchBar from "../components/Searchbar/SearchBar";
import Pagination from "../components/Pagination/Pagination";
import type { Product } from "../interfaces/product.interface";
import type { PaginationInfo } from "../interfaces/pagination.interface";
import { fetchSearchResults } from "../services/searchspring.service";
import React from "react";


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

  // helper to choose which query to use: user query if not empty, otherwise default
  const activeQuery = (q?: string) => {
    const v = (q ?? query).trim();
    return v.length > 0 ? v : "jeans";
  };

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
    [pageSize, query] // note: query is here so fetchResults sees latest query when called without explicit q
  );

  // initial load uses default ('jeans')
  useEffect(() => {
    fetchResults("jeans", 1, pageSize);
  }, []); // run once on mount

  // handle search submit (explicit user search)
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchResults(query, 1, pageSize);
  };

  // page handlers use activeQuery() which prefers the current search box value
  const handleNext = () => {
    if (pagination.nextPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchResults(activeQuery(), pagination.nextPage, pageSize);
    }
  };

  const handlePrev = () => {
    if (pagination.previousPage) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      fetchResults(activeQuery(), pagination.previousPage, pageSize);
    }
  };

  const handlePageSelect = (pageNum: number) => {
    if (!pageNum || pageNum < 1) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
    fetchResults(activeQuery(), pageNum, pageSize);
  };

  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    // when page size changes, go to page 1 using current query
    fetchResults(activeQuery(), 1, size);
  };

  return (
    <>
      <Header />
      <main style={{ maxWidth: "1100px", margin: "2rem auto", padding: "0 1rem" }}>
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          onSearch={handleSearch}
          onQuickSearch={(keyword) => {
            setQuery(keyword); // update input
            fetchResults(keyword, 1, pageSize); // explicit search using the clicked quick tab
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

            <ProductGrid products={results} />

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
