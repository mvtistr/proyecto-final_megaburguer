import { createContext, useMemo, useState } from "react";

export const MarketContext = createContext(null);

export function MarketProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]); // [{id, title, price, qty}]

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => setCart((prev) => prev.filter((p) => p.id !== id));
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((acc, p) => acc + p.qty, 0);

  const value = useMemo(
    () => ({
      products,
      setProducts,
      cart,
      cartCount,
      addToCart,
      removeFromCart,
      clearCart,
    }),
    [products, cart, cartCount]
  );

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}