import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { useMemo, useState } from "react";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { ProductCard } from "@/components/northstar/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PRODUCTS } from "@/lib/northstar/data";

interface SearchParams {
  q?: string;
}

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>): SearchParams =>
    typeof search["q"] === "string" ? { q: search["q"] } : {},
  head: () => ({
    meta: [
      { title: "Search the catalogue — Northstar Retail Co." },
      {
        name: "description",
        content: "Search Northstar products by name, category, description or tag.",
      },
      { property: "og:title", content: "Search — Northstar Retail Co." },
      { property: "og:description", content: "Find any Northstar product in seconds." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate({ from: "/search" });
  const [term, setTerm] = useState(q ?? "");

  const results = useMemo(() => {
    const needle = (q ?? "").trim().toLowerCase();
    if (!needle) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle) ||
        p.shortDescription.toLowerCase().includes(needle) ||
        p.description.toLowerCase().includes(needle) ||
        p.tags.some((t) => t.toLowerCase().includes(needle)),
    );
  }, [q]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Search" }]} />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Search</h1>

      <form
        className="mt-6 flex max-w-xl gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ search: term.trim() ? { q: term.trim() } : {} });
        }}
      >
        <div className="relative flex-1">
          <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products, categories or tags"
            aria-label="Search products"
            className="pl-9"
          />
        </div>
        <Button type="submit">Search</Button>
      </form>

      {q ? (
        <p className="mt-6 text-sm text-muted-foreground">
          {results.length} result{results.length === 1 ? "" : "s"} for “{q}”
        </p>
      ) : (
        <p className="mt-6 text-sm text-muted-foreground">
          Type anything above, or{" "}
          <Link to="/shop" className="font-medium underline">
            browse the full shop
          </Link>
          .
        </p>
      )}

      {results.length > 0 && (
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      {q && results.length === 0 && (
        <div className="surface-card mt-6 p-8 text-center">
          <p className="font-medium">Nothing matched that search.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a broader term, or ask our support assistant.
          </p>
          <div className="mt-4 flex justify-center gap-2">
            <Button asChild variant="outline">
              <Link to="/shop">Browse shop</Link>
            </Button>
            <Button asChild>
              <Link to="/ask">Ask Northstar</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
