import { CATEGORIES, PRODUCTS, type Category, type Product } from "./data";

export function categorySlug(name: Category): string {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function categoryFromSlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => categorySlug(c.name) === slug.toLowerCase())?.name;
}

export function productsInCategory(name: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === name);
}

/** Newest arrivals — the catalogue is ordered oldest-first, so reverse it. */
export function newArrivals(limit = 8): Product[] {
  return [...PRODUCTS].reverse().slice(0, limit);
}
