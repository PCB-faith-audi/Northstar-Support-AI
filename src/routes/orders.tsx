import { createFileRoute, Link } from "@tanstack/react-router";
import { Package } from "lucide-react";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { Button } from "@/components/ui/button";
import { ORDERS, formatPrice } from "@/lib/northstar/data";
import { useStore } from "@/lib/northstar/store";

export const Route = createFileRoute("/orders")({
  head: () => ({
    meta: [
      { title: "My orders — Northstar Retail Co." },
      {
        name: "description",
        content: "Every Northstar order in one place, each with a live tracking timeline.",
      },
      { property: "og:title", content: "My orders — Northstar Retail Co." },
      { property: "og:description", content: "Review and track your Northstar orders." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Orders,
});

const DEMO_EMAIL = "alex@example.com";

function Orders() {
  const { orders } = useStore();
  const myOrders = [...orders, ...ORDERS.filter((o) => o.email === DEMO_EMAIL)];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Account", to: "/account" }, { label: "My orders" }]} />
      <h1 className="mt-4 flex items-center gap-2 text-3xl font-bold sm:text-4xl">
        <Package className="h-7 w-7 text-accent" /> My orders
      </h1>
      <p className="mt-2 text-muted-foreground">
        Demo account view. Open any order to see its delivery timeline.
      </p>

      <div className="mt-8 grid gap-4">
        {myOrders.map((o) => (
          <div
            key={o.id}
            className="surface-card flex flex-wrap items-center justify-between gap-4 p-5"
          >
            <div>
              <p className="font-display font-bold">{o.id}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Placed {o.placedAt} · {o.items.length} item{o.items.length === 1 ? "" : "s"} ·{" "}
                {formatPrice(o.total)}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {o.status} · ETA {o.estimatedDelivery}
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild size="sm" variant="outline">
                <Link to="/ask" search={{ order: o.id }}>
                  Ask about it
                </Link>
              </Button>
              <Button asChild size="sm">
                <Link to="/track" search={{ order: o.id }}>
                  Track order
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {myOrders.length === 0 && (
        <div className="surface-card mt-8 p-10 text-center">
          <p className="font-medium">No orders yet.</p>
          <Button asChild className="mt-4">
            <Link to="/shop">Start shopping</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
