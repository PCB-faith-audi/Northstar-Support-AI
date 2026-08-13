import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

import { PRODUCTS, findProductById, type Order, type Product } from "./data";
import { seedQueries, type QueryStatus, type SupportQuery } from "./deflection";

export interface CartItem {
  productId: string;
  qty: number;
  variant?: string | undefined;
}

export interface CartLine {
  product: Product;
  qty: number;
  variant?: string | undefined;
}

interface StoreValue {
  hydrated: boolean;
  cart: CartItem[];
  cartLines: CartLine[];
  cartCount: number;
  subtotal: number;
  addToCart: (productId: string, qty?: number, variant?: string | undefined) => void;
  setQty: (productId: string, qty: number, variant?: string | undefined) => void;
  removeFromCart: (productId: string, variant?: string | undefined) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  queries: SupportQuery[];
  addQuery: (query: SupportQuery) => void;
  updateQueryStatus: (reference: string, status: QueryStatus) => void;
  automationEnabled: boolean;
  setAutomationEnabled: (enabled: boolean) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const KEY = "northstar:v1";

interface Persisted {
  cart: CartItem[];
  wishlist: string[];
  orders: Order[];
  queries: SupportQuery[];
  automationEnabled: boolean;
}

function load(): Persisted | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Persisted) : null;
  } catch {
    return null;
  }
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [hydrated, setHydrated] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [queries, setQueries] = useState<SupportQuery[]>([]);
  const [automationEnabled, setAutomationEnabled] = useState(true);

  useEffect(() => {
    const saved = load();
    if (saved) {
      setCart(saved.cart ?? []);
      setWishlist(saved.wishlist ?? []);
      setOrders(saved.orders ?? []);
      setQueries(saved.queries?.length ? saved.queries : seedQueries());
      setAutomationEnabled(saved.automationEnabled ?? true);
    } else {
      setWishlist([PRODUCTS[1]!.id]);
      setQueries(seedQueries());
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const payload: Persisted = { cart, wishlist, orders, queries, automationEnabled };
    try {
      window.localStorage.setItem(KEY, JSON.stringify(payload));
    } catch {
      /* storage full or unavailable — the prototype keeps working in memory */
    }
  }, [hydrated, cart, wishlist, orders, queries, automationEnabled]);

  const value = useMemo<StoreValue>(() => {
    const cartLines: CartLine[] = cart.flatMap((item) => {
      const product = findProductById(item.productId);
      return product ? [{ product, qty: item.qty, variant: item.variant }] : [];
    });

    const same = (a: CartItem, productId: string, variant?: string | undefined) =>
      a.productId === productId && (a.variant ?? "") === (variant ?? "");

    return {
      hydrated,
      cart,
      cartLines,
      cartCount: cartLines.reduce((n, l) => n + l.qty, 0),
      subtotal: cartLines.reduce((n, l) => n + l.product.price * l.qty, 0),
      addToCart: (productId, qty = 1, variant) =>
        setCart((prev) => {
          const existing = prev.find((i) => same(i, productId, variant));
          if (existing) {
            return prev.map((i) =>
              same(i, productId, variant) ? { ...i, qty: Math.min(i.qty + qty, 20) } : i,
            );
          }
          return [...prev, { productId, qty, variant }];
        }),
      setQty: (productId, qty, variant) =>
        setCart((prev) =>
          qty <= 0
            ? prev.filter((i) => !same(i, productId, variant))
            : prev.map((i) => (same(i, productId, variant) ? { ...i, qty: Math.min(qty, 20) } : i)),
        ),
      removeFromCart: (productId, variant) =>
        setCart((prev) => prev.filter((i) => !same(i, productId, variant))),
      clearCart: () => setCart([]),
      wishlist,
      toggleWishlist: (productId) =>
        setWishlist((prev) =>
          prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
        ),
      orders,
      addOrder: (order) => setOrders((prev) => [order, ...prev]),
      queries,
      addQuery: (query) => setQueries((prev) => [query, ...prev]),
      updateQueryStatus: (reference, status) =>
        setQueries((prev) => prev.map((q) => (q.reference === reference ? { ...q, status } : q))),
      automationEnabled,
      setAutomationEnabled,
    };
  }, [hydrated, cart, wishlist, orders, queries, automationEnabled]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside <StoreProvider>");
  return ctx;
}
