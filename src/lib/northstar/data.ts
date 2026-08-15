/**
 * Northstar Retail Co. — mock catalogue, inventory and order records.
 *
 * REPLACEABLE SEAM: in production these arrays are replaced by calls to the
 * commerce platform (catalogue + inventory) and the OMS (orders). Every field
 * used by the deflection engine is intentionally explicit so the engine never
 * has to guess or invent a value.
 */

import headphonesImg from "@/assets/product-headphones.jpg";
import backpackImg from "@/assets/product-backpack.jpg";
import watchImg from "@/assets/product-watch.jpg";
import lampImg from "@/assets/product-lamp.jpg";
import sneakersImg from "@/assets/product-sneakers.jpg";
import speakerImg from "@/assets/product-speaker.jpg";
import bottleImg from "@/assets/product-bottle.jpg";
import jacketImg from "@/assets/product-jacket.jpg";

export type Category =
  | "Audio"
  | "Bags & Travel"
  | "Wearables"
  | "Home"
  | "Footwear"
  | "Apparel";

export type StockStatus = "In Stock" | "Low Stock" | "Out of Stock" | "Pre-order";

export interface ProductVariant {
  value: string;
  stock: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number | undefined;
  image: string;
  rating: number;
  reviews: number;
  shortDescription: string;
  description: string;
  tags: string[];
  stockStatus: StockStatus;
  stockCount: number;
  restockDate?: string | undefined;
  specs: ProductSpec[];
  variantLabel?: string | undefined;
  variants?: ProductVariant[] | undefined;
}

export const CATEGORIES: { name: Category; blurb: string }[] = [
  { name: "Audio", blurb: "Headphones & speakers" },
  { name: "Bags & Travel", blurb: "Carry for every day" },
  { name: "Wearables", blurb: "Track, train, recover" },
  { name: "Home", blurb: "Considered essentials" },
  { name: "Footwear", blurb: "Made for the walk" },
  { name: "Apparel", blurb: "Layers that last" },
];

export const PRODUCTS: Product[] = [
  {
    id: "p-001",
    slug: "aurora-anc-headphones",
    name: "Aurora ANC Headphones",
    category: "Audio",
    price: 2499,
    originalPrice: 2999,
    image: headphonesImg,
    rating: 4.8,
    reviews: 412,
    shortDescription: "Adaptive noise cancelling over-ear headphones with 40-hour battery.",
    description:
      "The Aurora ANC pairs adaptive noise cancelling with a warm, balanced signature tuned for long listening sessions. Memory-foam earcups, multipoint Bluetooth 5.3 and 40 hours of playback between charges.",
    tags: ["headphones", "anc", "bluetooth", "audio"],
    stockStatus: "In Stock",
    stockCount: 64,
    specs: [
      { label: "Battery life", value: "40 hours (ANC on)" },
      { label: "Connectivity", value: "Bluetooth 5.3, USB-C, 3.5mm" },
      { label: "Weight", value: "268 g" },
      { label: "Warranty", value: "2 years" },
    ],
    variantLabel: "Colour",
    variants: [
      { value: "Midnight Navy", stock: 42 },
      { value: "Graphite", stock: 22 },
    ],
  },
  {
    id: "p-002",
    slug: "meridian-commuter-backpack",
    name: "Meridian Commuter Backpack",
    category: "Bags & Travel",
    price: 1299,
    image: backpackImg,
    rating: 4.6,
    reviews: 268,
    shortDescription: "22L water-resistant commuter pack with a padded 16\" laptop sleeve.",
    description:
      "Built for the daily commute: a structured 22L body, water-resistant recycled shell, luggage pass-through and a suspended laptop sleeve that fits most 16-inch machines.",
    tags: ["backpack", "bag", "commuter", "laptop"],
    stockStatus: "In Stock",
    stockCount: 38,
    specs: [
      { label: "Capacity", value: "22 litres" },
      { label: "Laptop fit", value: 'Up to 16"' },
      { label: "Material", value: "Recycled 900D polyester" },
      { label: "Warranty", value: "Lifetime hardware" },
    ],
  },
  {
    id: "p-003",
    slug: "pulse-fitness-watch",
    name: "Pulse Fitness Watch",
    category: "Wearables",
    price: 1899,
    originalPrice: 2199,
    image: watchImg,
    rating: 4.5,
    reviews: 331,
    shortDescription: "AMOLED training watch with dual-band GPS and 12-day battery.",
    description:
      "A training-first smartwatch: dual-band GPS, continuous heart rate, sleep and recovery scoring, and up to 12 days of battery in smartwatch mode.",
    tags: ["watch", "fitness", "wearable", "gps"],
    stockStatus: "Low Stock",
    stockCount: 6,
    specs: [
      { label: "Display", value: "1.4\" AMOLED" },
      { label: "Battery", value: "Up to 12 days" },
      { label: "Water rating", value: "5 ATM" },
      { label: "Warranty", value: "2 years" },
    ],
    variantLabel: "Band size",
    variants: [
      { value: "S/M", stock: 2 },
      { value: "M/L", stock: 4 },
    ],
  },
  {
    id: "p-004",
    slug: "atlas-desk-lamp",
    name: "Atlas Desk Lamp",
    category: "Home",
    price: 899,
    image: lampImg,
    rating: 4.7,
    reviews: 154,
    shortDescription: "Brass-accented LED task lamp with stepless dimming.",
    description:
      "A weighted, matte-black task lamp with brass detailing, stepless dimming from 2700K to 5000K and a flicker-free driver for long evenings at the desk.",
    tags: ["lamp", "desk", "lighting", "home"],
    stockStatus: "In Stock",
    stockCount: 27,
    specs: [
      { label: "Colour temperature", value: "2700K – 5000K" },
      { label: "Output", value: "480 lumens" },
      { label: "Power", value: "9W LED" },
      { label: "Warranty", value: "3 years" },
    ],
  },
  {
    id: "p-005",
    slug: "everyday-sneakers",
    name: "Everyday Sneakers",
    category: "Footwear",
    price: 1199,
    image: sneakersImg,
    rating: 4.4,
    reviews: 587,
    shortDescription: "All-day cushioned sneakers in a clean, minimal silhouette.",
    description:
      "Knit uppers, a recycled-foam midsole and a stitched rubber outsole. Designed to be worn every day and resoled rather than replaced.",
    tags: ["sneakers", "shoes", "footwear", "size"],
    stockStatus: "Low Stock",
    stockCount: 9,
    specs: [
      { label: "Upper", value: "Recycled knit" },
      { label: "Midsole", value: "Recycled EVA foam" },
      { label: "Drop", value: "8 mm" },
      { label: "Warranty", value: "1 year" },
    ],
    variantLabel: "Size (EU)",
    variants: [
      { value: "40", stock: 4 },
      { value: "41", stock: 5 },
      { value: "42", stock: 0 },
      { value: "43", stock: 0 },
    ],
  },
  {
    id: "p-006",
    slug: "portable-bluetooth-speaker",
    name: "Portable Bluetooth Speaker",
    category: "Audio",
    price: 799,
    image: speakerImg,
    rating: 4.3,
    reviews: 221,
    shortDescription: "Pocket-sized IP67 speaker with 18 hours of playback.",
    description:
      "A rugged, IP67-rated speaker with passive radiators for real low end, 18 hours of playback and stereo pairing with a second unit.",
    tags: ["speaker", "bluetooth", "audio", "portable"],
    stockStatus: "Out of Stock",
    stockCount: 0,
    restockDate: "2026-09-02",
    specs: [
      { label: "Battery", value: "18 hours" },
      { label: "Rating", value: "IP67 dust & water" },
      { label: "Weight", value: "540 g" },
      { label: "Warranty", value: "2 years" },
    ],
  },
  {
    id: "p-007",
    slug: "summit-insulated-bottle",
    name: "Summit Insulated Bottle",
    category: "Home",
    price: 449,
    image: bottleImg,
    rating: 4.9,
    reviews: 903,
    shortDescription: "750ml vacuum-insulated stainless bottle, 24h cold / 12h hot.",
    description:
      "Double-wall 18/8 stainless steel with a leak-proof cap and powder-coated grip. Keeps drinks cold for 24 hours and hot for 12.",
    tags: ["bottle", "water", "insulated", "home"],
    stockStatus: "In Stock",
    stockCount: 112,
    specs: [
      { label: "Capacity", value: "750 ml" },
      { label: "Material", value: "18/8 stainless steel" },
      { label: "Insulation", value: "24h cold / 12h hot" },
      { label: "Warranty", value: "Lifetime" },
    ],
  },
  {
    id: "p-008",
    slug: "harbour-quilted-jacket",
    name: "Harbour Quilted Jacket",
    category: "Apparel",
    price: 1699,
    originalPrice: 2100,
    image: jacketImg,
    rating: 4.5,
    reviews: 176,
    shortDescription: "Wind-resistant quilted jacket with recycled insulation.",
    description:
      "A clean quilted shell with recycled synthetic insulation, wind-resistant face fabric and a cut that layers over a hoodie without bulk.",
    tags: ["jacket", "apparel", "outerwear", "size"],
    stockStatus: "Pre-order",
    stockCount: 0,
    restockDate: "2026-08-25",
    specs: [
      { label: "Fill", value: "Recycled synthetic, 80 g" },
      { label: "Shell", value: "Wind-resistant recycled nylon" },
      { label: "Care", value: "Machine wash cold" },
      { label: "Warranty", value: "2 years" },
    ],
    variantLabel: "Size",
    variants: [
      { value: "S", stock: 0 },
      { value: "M", stock: 0 },
      { value: "L", stock: 0 },
    ],
  },
];

export type OrderStatus =
  | "Processing"
  | "Packed"
  | "Shipped"
  | "Out for Delivery"
  | "Delivered"
  | "Delayed"
  | "Cancelled";

export type RefundStatus =
  | "Not requested"
  | "Refund requested"
  | "Refund approved"
  | "Refund processed";

export interface OrderItem {
  productId: string;
  name: string;
  qty: number;
  price: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  placedAt: string;
  status: OrderStatus;
  estimatedDelivery: string;
  carrier: string;
  trackingRef: string;
  items: OrderItem[];
  total: number;
  deliveryMethod: string;
  returnWindowDays: number;
  refundStatus: RefundStatus;
  /** Set when the carrier feed disagrees with the OMS — forces escalation. */
  dataConflict?: string | undefined;
}

export const ORDERS: Order[] = [
  {
    id: "NS-2026-10482",
    customerName: "Alex Johnson",
    email: "alex@example.com",
    placedAt: "2026-08-08",
    status: "Out for Delivery",
    estimatedDelivery: "Today, before 18:00",
    carrier: "Northstar Express",
    trackingRef: "NSX448120933",
    items: [{ productId: "p-001", name: "Aurora ANC Headphones", qty: 1, price: 2499 }],
    total: 2499,
    deliveryMethod: "Express Delivery",
    returnWindowDays: 30,
    refundStatus: "Not requested",
  },
  {
    id: "NS-2026-10391",
    customerName: "Alex Johnson",
    email: "alex@example.com",
    placedAt: "2026-07-21",
    status: "Delivered",
    estimatedDelivery: "Delivered 2026-07-24",
    carrier: "Northstar Express",
    trackingRef: "NSX441002871",
    items: [
      { productId: "p-007", name: "Summit Insulated Bottle", qty: 2, price: 449 },
      { productId: "p-004", name: "Atlas Desk Lamp", qty: 1, price: 899 },
    ],
    total: 1797,
    deliveryMethod: "Standard Delivery",
    returnWindowDays: 30,
    refundStatus: "Not requested",
  },
  {
    id: "NS-2026-10233",
    customerName: "Priya Naidoo",
    email: "priya@example.com",
    placedAt: "2026-08-02",
    status: "Shipped",
    estimatedDelivery: "2026-08-15",
    carrier: "SwiftPost",
    trackingRef: "SP9931200412",
    items: [{ productId: "p-002", name: "Meridian Commuter Backpack", qty: 1, price: 1299 }],
    total: 1299,
    deliveryMethod: "Standard Delivery",
    returnWindowDays: 30,
    refundStatus: "Not requested",
    dataConflict:
      "Carrier scan shows 'Delivered' while the order management system still shows 'Shipped'.",
  },
  {
    id: "NS-2026-10190",
    customerName: "Thabo Mokoena",
    email: "thabo@example.com",
    placedAt: "2026-06-30",
    status: "Delivered",
    estimatedDelivery: "Delivered 2026-07-03",
    carrier: "Northstar Express",
    trackingRef: "NSX432119004",
    items: [{ productId: "p-003", name: "Pulse Fitness Watch", qty: 1, price: 1899 }],
    total: 1899,
    deliveryMethod: "Standard Delivery",
    returnWindowDays: 30,
    refundStatus: "Refund approved",
  },
  {
    id: "NS-2026-10077",
    customerName: "Lerato Dlamini",
    email: "lerato@example.com",
    placedAt: "2026-08-10",
    status: "Delayed",
    estimatedDelivery: "2026-08-18 (revised)",
    carrier: "SwiftPost",
    trackingRef: "SP9931455190",
    items: [{ productId: "p-008", name: "Harbour Quilted Jacket", qty: 1, price: 1699 }],
    total: 1699,
    deliveryMethod: "Standard Delivery",
    returnWindowDays: 30,
    refundStatus: "Not requested",
  },
];

export const RETURNS_POLICY = {
  windowDays: 30,
  refundBusinessDays: "5–7 business days",
  conditions: "Unused, in original packaging, with proof of purchase.",
  portalPath: "/account",
} as const;

/** Deterministic ZAR formatting — avoids SSR/client Intl locale mismatches. */
export function formatPrice(value: number): string {
  const rounded = Math.round(value);
  const grouped = String(Math.abs(rounded)).replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
  return `${rounded < 0 ? "-" : ""}R\u00a0${grouped}`;
}

export function findProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function relatedProducts(product: Product, limit = 4): Product[] {
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  );
  const others = PRODUCTS.filter((p) => p.id !== product.id && p.category !== product.category);
  return [...sameCategory, ...others].slice(0, limit);
}

export function findOrderById(id: string, sessionOrders: Order[] = []): Order | undefined {
  const needle = id.trim().toUpperCase();
  return [...sessionOrders, ...ORDERS].find((o) => o.id.toUpperCase() === needle);
}
