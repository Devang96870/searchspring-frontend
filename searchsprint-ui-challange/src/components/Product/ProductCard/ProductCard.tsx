import { useState, memo } from "react";
import styles from "./ProductCard.module.css";
import type { Product } from "../../../interfaces/product.interface";

function ProductCardComponent({ item }: { item: Product }) {
  const [loaded, setLoaded] = useState(false);
  const [count, setCount] = useState(0);

  const handleAddToCart = () => {
    setCount((prev) => prev + 1);
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.imageWrapper} ${!loaded ? styles.loading : ""}`}>
        <img
          src={item.thumbnailImageUrl}
          alt={item.name}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
            setLoaded(true);
          }}
        />
      </div>

      <h4 className={styles.title}>{item.name}</h4>

      <p className={styles.priceRow}>
        <span className={styles.price}>${item.price}</span>
        {item.msrp && item.msrp > item.price && (
          <span className={styles.msrp}>${item.msrp}</span>
        )}
      </p>

      <button
        type="button"
        className={`${styles.addButton} ${count > 0 ? styles.active : ""}`}
        onClick={handleAddToCart}
        aria-label={`Add ${item.name} to cart`}
      >
        {count > 0 ? `Added (${count})` : "Add to Cart"}
      </button>
    </div>
  );
}

export const ProductCard = memo(ProductCardComponent);
export default ProductCard;
