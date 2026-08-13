import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, PackageCheck, ShieldCheck, Sparkles, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/northstar/product-card";
import { CATEGORIES, PRODUCTS } from "@/lib/northstar/data";
import heroImage from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Northstar Retail Co. — Find What Moves You." },
      {
        name: "description",
        content:
          "Discover quality products, everyday essentials and great deals at Northstar Retail Co. Ask Northstar answers order, return and stock questions in seconds.",
      },
      { property: "og:title", content: "Northstar Retail Co. — Find What Moves You." },
      {
        property: "og:description",
        content: "Quality Finds. Delivered. Shop Northstar and get fast, transparent support.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = PRODUCTS.slice(0, 8);

  return (
    <div>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
              <Sparkles className="h-3.5 w-3.5" /> Quality Finds. Delivered.
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-[1.05] sm:text-5xl lg:text-6xl">
              Find What Moves You.
            </h1>
            <p className="mt-5 max-w-xl text-base text-primary-foreground/80 sm:text-lg">
              Discover quality products, everyday essentials, and great deals — all in one place.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/shop">
                  Shop Now <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/deals">Explore Deals</Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-4 text-sm text-primary-foreground/75 sm:grid-cols-3">
              <span className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-accent" /> Free delivery over R1,000
              </span>
              <span className="flex items-center gap-2">
                <PackageCheck className="h-4 w-4 text-accent" /> 30-day returns
              </span>
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-accent" /> Secure checkout
              </span>
            </div>
          </div>

          <div className="relative">
            <img
              src={heroImage}
              alt="Northstar Retail Co. lifestyle products arranged on a warm neutral surface"
              className="w-full rounded-3xl object-cover shadow-[var(--shadow-lift)]"
            />
            <div className="surface-card absolute -bottom-6 left-4 right-4 hidden gap-3 p-4 text-foreground sm:flex sm:items-center">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary text-accent">
                <Bot className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold">Ask Northstar</p>
                <p className="truncate text-xs text-muted-foreground">
                  “Order NS-2026-10482 is Out for Delivery. Estimated delivery: Today.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="surface-card grid items-center gap-6 p-6 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Support, without the wait
            </span>
            <h2 className="mt-2 text-3xl font-bold sm:text-4xl">Ask Northstar</h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Need help with an order, return, refund, or product availability? Ask Northstar and
              get a fast response. Simple questions are answered automatically in seconds; anything
              uncertain or sensitive goes straight to a human agent.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/ask">Ask a question</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/dashboard">See how it is monitored</Link>
              </Button>
            </div>
          </div>
          <ul className="grid gap-3 text-sm">
            {[
              "Order status & tracking answered from live order records",
              "Return and refund guidance quoted from policy — never invented",
              "Stock and size availability with real alternatives",
              "Automated replies always labelled as automated",
            ].map((line) => (
              <li key={line} className="flex gap-3 rounded-xl bg-secondary p-3">
                <span className="text-accent">★</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Shop by category</h2>
            <p className="mt-1 text-muted-foreground">Six edits, curated for everyday life.</p>
          </div>
          <Link to="/shop" className="text-sm font-semibold hover:text-accent-foreground">
            View all →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c) => (
            <Link
              key={c.name}
              to="/shop"
              search={{ category: c.name }}
              className="surface-card group flex flex-col justify-between gap-6 p-4 transition-shadow hover:shadow-[var(--shadow-lift)]"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary text-lg text-accent">
                ★
              </span>
              <span>
                <span className="block font-display text-sm font-semibold">{c.name}</span>
                <span className="mt-1 block text-xs text-muted-foreground">{c.blurb}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">Featured products</h2>
            <p className="mt-1 text-muted-foreground">
              Live mock inventory — the same data Ask Northstar reads.
            </p>
          </div>
          <Link to="/shop" className="text-sm font-semibold hover:text-accent-foreground">
            Browse shop →
          </Link>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
