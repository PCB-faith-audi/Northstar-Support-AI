import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { CATEGORIES } from "@/lib/northstar/data";
import { categorySlug, productsInCategory } from "@/lib/northstar/categories";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Shop by category — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Browse every Northstar category: audio, bags and travel, wearables, home, footwear and apparel.",
      },
      { property: "og:title", content: "Shop by category — Northstar Retail Co." },
      { property: "og:description", content: "Six curated Northstar categories, one click away." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Categories,
});

function Categories() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Categories" }]} />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Shop by category</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every Northstar product lives in one of six categories. Pick a lane and we will show you
        stock levels before you add to cart.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((c) => {
          const count = productsInCategory(c.name).length;
          return (
            <Link
              key={c.name}
              to="/category/$slug"
              params={{ slug: categorySlug(c.name) }}
              className="surface-card group p-6 transition-shadow hover:shadow-lg"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {count} product{count === 1 ? "" : "s"}
              </span>
              <h2 className="mt-2 font-display text-xl font-bold group-hover:underline">{c.name}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{c.blurb}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
