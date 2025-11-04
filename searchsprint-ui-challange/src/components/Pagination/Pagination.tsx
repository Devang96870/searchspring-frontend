import { memo, useMemo } from "react";
import styles from "./Pagination.module.css";

interface Props {
  current?: number;
  total?: number;
  totalResults?: number;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onPageSelect?: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

function Pagination({
  current = 1,
  total = 1,
  totalResults = 0,
  pageSize,
  hasNext,
  hasPrev,
  onNext,
  onPrev,
  onPageSizeChange,
  onPageSelect,
}: Props) {
  const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;

  // 🧠 Show fewer pages on small screens
  const pages = useMemo(() => {
    const visiblePages = isMobile ? 3 : 5;
    const half = Math.floor(visiblePages / 2);

    let start = Math.max(1, current - half);
    let end = Math.min(total, start + visiblePages - 1);

    if (end - start < visiblePages - 1) {
      start = Math.max(1, end - visiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }, [current, total, isMobile]);

  return (
    <nav className={styles.container} aria-label="Pagination Navigation">
      <div className={styles.pagination}>
        <button
          className={styles.navButton}
          onClick={onPrev}
          disabled={!hasPrev}
          aria-label="Previous page"
        >
          ⬅ Prev
        </button>

        <div className={styles.pageNumbers}>
          {pages[0] > 1 && (
            <>
              <button
                className={styles.pageButton}
                onClick={() => onPageSelect?.(1)}
              >
                1
              </button>
              {pages[0] > 2 && <span className={styles.dots}>...</span>}
            </>
          )}

          {pages.map((p) => (
            <button
              key={p}
              className={`${styles.pageButton} ${
                p === current ? styles.active : ""
              }`}
              onClick={() => onPageSelect?.(p)}
              aria-current={p === current ? "page" : undefined}
            >
              {p}
            </button>
          ))}

          {pages[pages.length - 1] < total && (
            <>
              {pages[pages.length - 1] < total - 1 && (
                <span className={styles.dots}>...</span>
              )}
              <button
                className={styles.pageButton}
                onClick={() => onPageSelect?.(total)}
              >
                {total}
              </button>
            </>
          )}
        </div>

        <button
          className={styles.navButton}
          onClick={onNext}
          disabled={!hasNext}
          aria-label="Next page"
        >
          Next ➡
        </button>
      </div>

      <div className={styles.controls}>
        <label htmlFor="pageSize" className={styles.label}>
          Items per page:
        </label>
        <select
          id="pageSize"
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className={styles.select}
          aria-label="Items per page"
        >
          {[10, 20, 30, 40, 50].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>

        <span className={styles.totalText}>
          Total Results: <strong>{totalResults}</strong>
        </span>
      </div>
    </nav>
  );
}

export default memo(Pagination);
