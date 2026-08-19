import { useQuery } from "@tanstack/react-query";

import { ORDERS, PRODUCTS, type Order, type Product } from "./data";
import { fetchProductsViaGraphQL } from "./graphql";
import { getOrders } from "./orders.functions";

/**
 * Catalogue read over the database GraphQL endpoint. The bundled demo
 * catalogue is used as initial data so first paint (and SSR) is instant and
 * the prototype still works if the backend is unavailable.
 */
export function useProducts(): Product[] {
  const { data } = useQuery({
    queryKey: ["graphql", "products"],
    queryFn: fetchProductsViaGraphQL,
    initialData: PRODUCTS,
    staleTime: 60_000,
  });
  return data;
}

export function useProductBySlug(slug: string): Product | undefined {
  return useProducts().find((p) => p.slug === slug);
}

/** Demo order records, read server-side over GraphQL. */
export function useDemoOrders(): Order[] {
  const { data } = useQuery({
    queryKey: ["graphql", "orders"],
    queryFn: () => getOrders(),
    initialData: ORDERS,
    staleTime: 60_000,
  });
  return data;
}
