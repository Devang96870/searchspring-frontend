import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>🛍️ Searchspring Store</h1>
      <span>Find your style, instantly</span>
    </header>
  );
}
