import { createFileRoute } from "@tanstack/react-router";

import { ProductCard } from "@/components/northstar/product-card";
import { PRODUCTS } from "@/lib/northstar/data";

export const Route = createFileRoute("/deals")({
  head: () => ({
    meta: [
      { title: "Big Deals. Better Shopping. — Northstar Retail Co." },
      {
        name: "description",
        content: "Discounted Northstar products with original price, sale price and savings shown.",
      },
      { property: "og:title", content: "Big Deals. Better Shopping. — Northstar Retail Co." },
      { property: "og:description", content: "Save on headphones, watches, sneakers and more." },
    ],
  }),
  component: Deals,
});

function Deals() {
  const deals = PRODUCTS.filter((p) => p.originalPrice);

  return (
    <div>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <h1 className="text-3xl font-extrabold sm:text-5xl">Big Deals. Better Shopping.</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">
            {deals.length} products currently reduced. Prices shown include the original price and
            the saving, so you always know what you are paying.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {deals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
