import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard } from "@/components/northstar/product-card";
import { CATEGORIES, PRODUCTS, type Category } from "@/lib/northstar/data";
import { Breadcrumbs } from "@/components/northstar/breadcrumbs";

interface ShopSearch {
  q?: string;
  category?: string;
  sort?: string;
}

export const Route = createFileRoute("/shop")({
  validateSearch: (search: Record<string, unknown>): ShopSearch => ({
    ...(typeof search["q"] === "string" ? { q: search["q"] } : {}),
    ...(typeof search["category"] === "string" ? { category: search["category"] } : {}),
    ...(typeof search["sort"] === "string" ? { sort: search["sort"] } : {}),
  }),
  head: () => ({
    meta: [
      { title: "Shop all products — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Search, filter and sort the full Northstar catalogue by category, price, rating and availability.",
      },
      { property: "og:title", content: "Shop all products — Northstar Retail Co." },
      {
        property: "og:description",
        content: "Browse electronics, fashion, home, beauty, fitness and accessories at Northstar.",
      },
    ],
  }),
  component: Shop,
});

const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Best Rated" },
];

function Shop() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/shop" });

  const [query, setQuery] = useState(search.q ?? "");
  const [categories, setCategories] = useState<Category[]>(
    search.category ? [search.category as Category] : [],
  );
  const [maxPrice, setMaxPrice] = useState(3500);
  const [minRating, setMinRating] = useState(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState(search.sort ?? "featured");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = PRODUCTS.filter((p) => {
      const matchesQuery =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q) ||
        p.tags.some((t) => t.includes(q));
      const matchesCategory = categories.length === 0 || categories.includes(p.category);
      const matchesPrice = p.price <= maxPrice;
      const matchesRating = p.rating >= minRating;
      const matchesStock = !inStockOnly || p.stockCount > 0;
      return matchesQuery && matchesCategory && matchesPrice && matchesRating && matchesStock;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [query, categories, maxPrice, minRating, inStockOnly, sort]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="mb-8">
        <Breadcrumbs items={[{ label: "Shop" }]} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Shop</h1>
        <p className="mt-2 text-muted-foreground">
          {PRODUCTS.length} products · inventory shared with the Ask Northstar support engine.
        </p>
      </header>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              void navigate({ search: (prev) => ({ ...prev, q: e.target.value }), replace: true });
            }}
            placeholder="Search headphones, sneakers, home office, fitness, gifts, speakers…"
            aria-label="Search products"
            className="h-12 pl-10"
          />
        </div>
        <Select
          value={sort}
          onValueChange={(v) => {
            setSort(v);
            void navigate({ search: (prev) => ({ ...prev, sort: v }), replace: true });
          }}
        >
          <SelectTrigger className="h-12 sm:w-56" aria-label="Sort products">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORTS.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="surface-card h-fit p-5">
          <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide">
            <SlidersHorizontal className="h-4 w-4" /> Filters
          </h2>

          <div className="mt-5">
            <h3 className="text-sm font-semibold">Category</h3>
            <div className="mt-3 space-y-2">
              {CATEGORIES.map((c) => (
                <label key={c.name} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={categories.includes(c.name)}
                    onCheckedChange={(checked) =>
                      setCategories((prev) =>
                        checked ? [...prev, c.name] : prev.filter((x) => x !== c.name),
                      )
                    }
                  />
                  {c.name}
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <Label className="text-sm font-semibold">Max price: R{maxPrice}</Label>
            <Slider
              className="mt-3"
              value={[maxPrice]}
              min={400}
              max={3500}
              step={50}
              onValueChange={([v]) => setMaxPrice(v ?? 3500)}
            />
          </div>

          <div className="mt-6">
            <Label className="text-sm font-semibold">Minimum rating: {minRating || "Any"}</Label>
            <Slider
              className="mt-3"
              value={[minRating]}
              min={0}
              max={5}
              step={0.5}
              onValueChange={([v]) => setMinRating(v ?? 0)}
            />
          </div>

          <label className="mt-6 flex items-center gap-2 text-sm">
            <Checkbox
              checked={inStockOnly}
              onCheckedChange={(c) => setInStockOnly(Boolean(c))}
            />
            Available items only
          </label>

          <Button
            variant="outline"
            className="mt-6 w-full"
            onClick={() => {
              setQuery("");
              setCategories([]);
              setMaxPrice(3500);
              setMinRating(0);
              setInStockOnly(false);
              setSort("featured");
              void navigate({ search: {}, replace: true });
            }}
          >
            Reset filters
          </Button>
        </aside>

        <section>
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {results.length} of {PRODUCTS.length} products
          </p>
          {results.length === 0 ? (
            <div className="surface-card p-10 text-center">
              <h3 className="font-display text-lg font-semibold">No products match those filters</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening your price range or clearing a category.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
