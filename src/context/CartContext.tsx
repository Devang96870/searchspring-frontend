// src/context/CartContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

interface CartContextType {
  totalItems: number;
  addToCart: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
  totalItems: 0,
  addToCart: () => {},
  clearCart: () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [totalItems, setTotalItems] = useState(0);

  const addToCart = () => setTotalItems((prev) => prev + 1);
  const clearCart = () => setTotalItems(0);

  return (
    <CartContext.Provider value={{ totalItems, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
