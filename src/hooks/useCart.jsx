import { useEffect, useRef, useState, useContext, createContext } from "react";
function useCart() {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);

  // Fetch cart from backend (hydration)
  useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/getCart", {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch cart");

        setItems(data.items || []);
        setHydrated(true);
        setError(null);
      } catch (err) {
        setError(err.message);
        setHydrated(true); // even if failed, mark hydrated
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Debounced save to backend
  useEffect(() => {
    if (!hydrated) return;
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(async () => {
      try {
        await fetch("http://localhost:5000/api/saveCart", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(items),
        });
      } catch (err) {
        setError("failed to save in Cart/Switch on the server");
        
      }
    }, 1000);
    return () => clearTimeout(timeoutRef.current);
  }, [items, hydrated]);

  // Cart operations
  const bag = {
    addToCart(id) {
      setItems((prev) => {
        const obj = prev.find((ele) => ele.id === id);
        if (obj) {
          return prev.map((ele) =>
            ele.id === id ? { ...ele, count: ele.count + 1 } : ele
          );
        } else {
          return [...prev, { id, count: 1 }];
        }
      });
    },
    removeFromCart(id) {
      setItems((prev) => {
        const obj = prev.find((ele) => ele.id === id);
        if (!obj) return prev;
        if (obj.count > 1) {
          return prev.map((ele) =>
            ele.id === id ? { ...ele, count: ele.count - 1 } : ele
          );
        } else {
          return prev.filter((ele) => ele.id !== id);
        }
      });
    },
    clearTheCart() {
      setItems([]);
    },
    getTotalNumbersOfItems() {
      return items.reduce((acc, curr) => acc + curr.count, 0);
    },
    getBag() {
      return items;
    },
    getItemsPerCard(id) {
      return items.find((ele) => ele.id === id)?.count || 0;
    },
    loading,
    error,
    hydrated,
  };

  return bag;
}
const CartContext = createContext(null);
export function CartProvider({ children }) {
  const obj = useCart();
  return <CartContext.Provider value={obj}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  return useContext(CartContext);
}
