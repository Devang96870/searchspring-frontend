import { ShoppingCart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";

export default function Header() {
  const { totalItems } = useCart();

  const handleCartClick = () => {
    alert(`You have ${totalItems} item(s) in your cart!`);
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>🛍️ Searchspring Store</h1>
      {/* <span className={styles.tagline}>Find your style, instantly</span> */}

      <div className={styles.cart} onClick={handleCartClick}>
        <ShoppingCart size={28} />
        {totalItems > 0 && <span className={styles.badge}>{totalItems}</span>}
      </div>
    </header>
  );
}
