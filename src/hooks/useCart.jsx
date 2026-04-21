import { useEffect, useRef, useState, useContext, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserCartId } from "../store/slices/loginSlice";
import { API_URL } from "../main";
function useCart() {
  const dispatch = useDispatch();
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const {products} = useSelector(bag=>bag.products);
  const allProducts = products.flatMap(obj=>obj.products);
  const [productLimitError , setProductLimitError] = useState(null);
  const token = localStorage.getItem("token");
  async function fetchCart() {
    setLoading(true);
   
    try {
      const res = await fetch(`${API_URL}/api/getCart`, {
        headers: {
          "Authorization": `Bearer ${token}`, // send token in Authorization header
          "Content-Type": "application/json"
        }
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch cart");
      
      dispatch(setUserCartId(data.cartId));
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
  useEffect(() => {
   
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
        await fetch(`${API_URL}/api/saveCart`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`, // send token in Authorization header
            "Content-Type": "application/json"
          },
          
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
        const product = allProducts.find(temp => temp.id === id);
    
        if (!product) {
          setProductLimitError({ id, message: "Product not found." });
          setTimeout(() => setProductLimitError(null), 1000);
          return prev;
        }
    
        if (obj) {
          // Already in cart → check stock before incrementing
          if (obj.count + 1 <= product.stock) {
            // clear any previous error for this product
            setProductLimitError(null);
            return prev.map((ele) =>
              ele.id === id ? { ...ele, count: ele.count + 1 } : ele
            );
          } else {
            setProductLimitError({ id, message: "Limit exceeded" });
            setTimeout(() => setProductLimitError(null), 1000);
            return prev;
          }
        } else {
          // First time adding → ensure stock > 0
          if (product.stock > 0) {
            setProductLimitError(null);
            return [...prev, { id, count: 1 }];
          } else {
            setProductLimitError({ id, message: "Out of stock" });
            setTimeout(() => setProductLimitError(null), 1000);
            return prev;
          }
        }
      });
    }
    
    
    ,
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
      setProductLimitError(null);
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
    fetchCart,
    productLimitError
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
