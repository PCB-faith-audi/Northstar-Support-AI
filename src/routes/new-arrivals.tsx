import { createFileRoute } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { ProductCard } from "@/components/northstar/product-card";
import { newArrivals } from "@/lib/northstar/categories";

export const Route = createFileRoute("/new-arrivals")({
  head: () => ({
    meta: [
      { title: "New arrivals — Northstar Retail Co." },
      {
        name: "description",
        content:
          "The latest products to land at Northstar Retail Co., with live stock status on every card.",
      },
      { property: "og:title", content: "New arrivals — Northstar Retail Co." },
      { property: "og:description", content: "Fresh drops across audio, apparel, home and more." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NewArrivals,
});

function NewArrivals() {
  const products = newArrivals();

  return (
    <div>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Breadcrumbs tone="dark" items={[{ label: "New arrivals" }]} />
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">New arrivals</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            The newest additions to the Northstar catalogue. Stock status is shown up front so you
            never have to ask.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
