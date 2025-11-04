import { useState } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  query: string;
  onQueryChange: (val: string) => void;
  onSearch: (val: string) => void;
  onQuickSearch: (keyword: string) => void;
}

const QUICK_TABS = ["Shoes", "Jeans", "Bags", "T-Shirts", "Jackets", "Watches"];

export default function SearchBar({
  query,
  onQueryChange,
  onSearch,
  onQuickSearch,
}: Props) {
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleQuickSearch = (tab: string) => {
    setActiveTab(tab);
    onQuickSearch(tab);
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Always trigger search, even if empty
    const trimmed = query.trim();
    setActiveTab(null);
    onSearch(trimmed);
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.searchBar} onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for products..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className={styles.quickTabs}>
        {QUICK_TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles.tab} ${activeTab === tab ? styles.active : ""}`}
            onClick={() => handleQuickSearch(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
