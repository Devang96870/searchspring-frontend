
import ProductCard from "../ProductCard/ProductCard";
import styles from "./ProductGrid.module.css";
import type { Product } from "../../../interfaces/product.interface";

export default function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0)
    return <p style={{ textAlign: "center" }}>No results found.</p>;

  return (
    <div className={styles.grid}>
      {products.map((p) => (
        <ProductCard key={p.id} item={p} />
      ))}
    </div>
  );
}
