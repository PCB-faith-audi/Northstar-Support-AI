import { createFileRoute, Link } from "@tanstack/react-router";
import { Gem, HandCoins, Truck } from "lucide-react";

import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Built Around Better Shopping — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Northstar Retail Co. is a modern online retailer focused on quality products, great value and a simple shopping experience.",
      },
      { property: "og:title", content: "Built Around Better Shopping — Northstar Retail Co." },
      {
        property: "og:description",
        content: "Quality, value and convenience — the three ideas Northstar is built on.",
      },
    ],
  }),
  component: About,
});

const PILLARS = [
  {
    title: "Quality",
    body: "Curated products selected with customers in mind.",
    Icon: Gem,
  },
  {
    title: "Value",
    body: "Competitive prices and meaningful deals.",
    Icon: HandCoins,
  },
  {
    title: "Convenience",
    body: "A simple experience from product discovery to delivery.",
    Icon: Truck,
  },
];

function About() {
  return (
    <div>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <h1 className="max-w-3xl text-3xl font-extrabold sm:text-5xl">
            Built Around Better Shopping
          </h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Northstar Retail Co. is a modern online retailer focused on bringing quality products,
            great value, and a simple shopping experience to customers.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
          {PILLARS.map(({ title, body, Icon }) => (
            <article key={title} className="surface-card p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary text-accent">
                <Icon className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-xl font-bold">{title}</h2>
              <p className="mt-2 text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>

        <div className="surface-card mt-10 grid gap-6 p-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Support that respects your time</h2>
            <p className="mt-3 text-muted-foreground">
              Most support questions are simple and repetitive: where is my order, how do I return
              this, is this back in stock. Ask Northstar answers those instantly from real order and
              inventory records — and gets out of the way the moment a question needs human
              judgement.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/ask">Ask Northstar</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/governance">How we govern the automation</Link>
              </Button>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {[
              { k: "3", v: "Ticket types automated" },
              { k: "< 5s", v: "Typical response time" },
              { k: "100%", v: "Automated replies labelled" },
              { k: "0", v: "Automated payment decisions" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl bg-secondary p-5">
                <dt className="font-display text-2xl font-extrabold">{s.k}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </div>
  );
}
