/**
 * GraphQL data access for Northstar.
 *
 * All catalogue/order reads go through the database's GraphQL endpoint
 * (pg_graphql) rather than the standard JS query builder. Products are public
 * (publishable key, RLS `TO anon` SELECT). Orders are server-only and read via
 * a server function with the service key.
 */

import headphonesImg from "@/assets/product-headphones.jpg";
import backpackImg from "@/assets/product-backpack.jpg";
import watchImg from "@/assets/product-watch.jpg";
import lampImg from "@/assets/product-lamp.jpg";
import sneakersImg from "@/assets/product-sneakers.jpg";
import speakerImg from "@/assets/product-speaker.jpg";
import bottleImg from "@/assets/product-bottle.jpg";
import jacketImg from "@/assets/product-jacket.jpg";

import type {
  Category,
  Order,
  OrderItem,
  OrderStatus,
  Product,
  ProductSpec,
  ProductVariant,
  RefundStatus,
  StockStatus,
} from "./data";

export const PRODUCT_IMAGES: Record<string, string> = {
  headphones: headphonesImg,
  backpack: backpackImg,
  watch: watchImg,
  lamp: lampImg,
  sneakers: sneakersImg,
  speaker: speakerImg,
  bottle: bottleImg,
  jacket: jacketImg,
};

export interface GraphQLError {
  message: string;
}

/** Minimal GraphQL POST helper — no client library, just the endpoint. */
export async function graphqlRequest<T>(
  url: string,
  apiKey: string,
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetch(`${url}/graphql/v1`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: apiKey,
    },
    body: JSON.stringify({ query, variables }),
  });

  const payload = (await response.json()) as { data?: T; errors?: GraphQLError[] };
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((e) => e.message).join("; "));
  }
  if (!payload.data) throw new Error("GraphQL response contained no data");
  return payload.data;
}

/** Browser/SSR-safe request against the public (publishable key) endpoint. */
export function publicGraphqlRequest<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const url = import.meta.env['VITE_SUPABASE_URL'] as string;
  const key = import.meta.env['VITE_SUPABASE_PUBLISHABLE_KEY'] as string;
  return graphqlRequest<T>(url, key, query, variables);
}

export const PRODUCTS_QUERY = /* GraphQL */ `
  query Products {
    productsCollection(first: 100, orderBy: [{ sort_order: AscNullsLast }]) {
      edges {
        node {
          id
          slug
          name
          category
          price
          original_price
          image_key
          rating
          reviews
          short_description
          description
          tags
          stock_status
          stock_count
          restock_date
          specs
          variant_label
          variants
        }
      }
    }
  }
`;

export const ORDERS_QUERY = /* GraphQL */ `
  query Orders {
    ordersCollection(first: 200, orderBy: [{ placed_at: DescNullsLast }]) {
      edges {
        node {
          id
          customer_name
          email
          placed_at
          status
          estimated_delivery
          carrier
          tracking_ref
          items
          total
          delivery_method
          return_window_days
          refund_status
          data_conflict
        }
      }
    }
  }
`;

interface Connection<T> {
  edges: { node: T }[];
}

export interface ProductRow {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: string | number;
  original_price: string | number | null;
  image_key: string;
  rating: string | number;
  reviews: number;
  short_description: string;
  description: string;
  tags: unknown;
  stock_status: string;
  stock_count: number;
  restock_date: string | null;
  specs: unknown;
  variant_label: string | null;
  variants: unknown;
}

export interface OrderRow {
  id: string;
  customer_name: string;
  email: string;
  placed_at: string;
  status: string;
  estimated_delivery: string;
  carrier: string;
  tracking_ref: string;
  items: unknown;
  total: string | number;
  delivery_method: string;
  return_window_days: number;
  refund_status: string;
  data_conflict: string | null;
}

export type ProductsQueryData = { productsCollection: Connection<ProductRow> };
export type OrdersQueryData = { ordersCollection: Connection<OrderRow> };

/** pg_graphql returns jsonb columns as JSON strings. */
function parseJson<T>(value: unknown, fallback: T): T {
  if (value == null) return fallback;
  if (typeof value === "string") {
    try {
      return JSON.parse(value) as T;
    } catch {
      return fallback;
    }
  }
  return value as T;
}

function num(value: string | number | null | undefined): number {
  return typeof value === "number" ? value : Number(value ?? 0);
}

export function mapProduct(row: ProductRow): Product {
  const variants = parseJson<ProductVariant[] | null>(row.variants, null);
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    category: row.category as Category,
    price: num(row.price),
    originalPrice: row.original_price == null ? undefined : num(row.original_price),
    image: PRODUCT_IMAGES[row.image_key] ?? headphonesImg,
    rating: num(row.rating),
    reviews: row.reviews,
    shortDescription: row.short_description,
    description: row.description,
    tags: parseJson<string[]>(row.tags, []),
    stockStatus: row.stock_status as StockStatus,
    stockCount: row.stock_count,
    restockDate: row.restock_date ?? undefined,
    specs: parseJson<ProductSpec[]>(row.specs, []),
    variantLabel: row.variant_label ?? undefined,
    variants: variants && variants.length ? variants : undefined,
  };
}

export function mapOrder(row: OrderRow): Order {
  return {
    id: row.id,
    customerName: row.customer_name,
    email: row.email,
    placedAt: row.placed_at,
    status: row.status as OrderStatus,
    estimatedDelivery: row.estimated_delivery,
    carrier: row.carrier,
    trackingRef: row.tracking_ref,
    items: parseJson<OrderItem[]>(row.items, []),
    total: num(row.total),
    deliveryMethod: row.delivery_method,
    returnWindowDays: row.return_window_days,
    refundStatus: row.refund_status as RefundStatus,
    dataConflict: row.data_conflict ?? undefined,
  };
}

/** Fetch the whole catalogue over GraphQL. */
export async function fetchProductsViaGraphQL(): Promise<Product[]> {
  const data = await publicGraphqlRequest<ProductsQueryData>(PRODUCTS_QUERY);
  return data.productsCollection.edges.map((e) => mapProduct(e.node));
}
