import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, MapPin, MessagesSquare, Package, UserRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ORDERS, PRODUCTS, formatPrice } from "@/lib/northstar/data";
import { useStore } from "@/lib/northstar/store";
import { cn } from "@/lib/utils";
import { Breadcrumbs } from "@/components/northstar/breadcrumbs";

export const Route = createFileRoute("/account")({
  head: () => ({
    meta: [
      { title: "Your account — Northstar Retail Co." },
      {
        name: "description",
        content:
          "View your recent Northstar orders, wishlist, saved addresses and support query history.",
      },
      { property: "og:title", content: "Your account — Northstar Retail Co." },
      { property: "og:description", content: "Orders, wishlist and support queries in one place." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Account,
});

const DEMO_CUSTOMER = { name: "Alex", email: "alex@example.com", phone: "+27 82 000 0000" };

function Account() {
  const { orders, wishlist, queries, hydrated } = useStore();
  const myOrders = [...orders, ...ORDERS.filter((o) => o.email === DEMO_CUSTOMER.email)];
  const saved = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <header>
        <Breadcrumbs items={[{ label: "Account" }]} />
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Welcome back, {DEMO_CUSTOMER.name}</h1>
        <p className="mt-2 text-muted-foreground">
          Prototype account view — signed in as a demo customer. No real authentication is in place.
        </p>
      </header>

      <Tabs defaultValue="orders" className="mt-8">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
          <TabsTrigger value="orders">
            <Package className="mr-2 h-4 w-4" /> Recent Orders
          </TabsTrigger>
          <TabsTrigger value="wishlist">
            <Heart className="mr-2 h-4 w-4" /> Wishlist
          </TabsTrigger>
          <TabsTrigger value="details">
            <UserRound className="mr-2 h-4 w-4" /> Account Details
          </TabsTrigger>
          <TabsTrigger value="addresses">
            <MapPin className="mr-2 h-4 w-4" /> Saved Addresses
          </TabsTrigger>
          <TabsTrigger value="queries">
            <MessagesSquare className="mr-2 h-4 w-4" /> Customer Queries
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6 space-y-4">
          {myOrders.map((o) => (
            <div key={o.id} className="surface-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display text-lg font-bold">{o.id}</p>
                  <p className="text-sm text-muted-foreground">
                    Placed {o.placedAt} · {o.deliveryMethod}
                  </p>
                </div>
                <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold">
                  {o.status}
                </span>
              </div>
              <Separator className="my-4" />
              <ul className="space-y-1 text-sm">
                {o.items.map((i) => (
                  <li key={i.productId} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">
                      {i.qty} × {i.name}
                    </span>
                    <span>{formatPrice(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                <span className="text-sm">
                  <span className="text-muted-foreground">Estimated delivery: </span>
                  <span className="font-semibold">{o.estimatedDelivery}</span>
                </span>
                <Button asChild size="sm" variant="outline">
                  <Link to="/ask" search={{ order: o.id }}>
                    Ask about this order
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </TabsContent>

        <TabsContent value="wishlist" className="mt-6">
          {!hydrated ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : saved.length === 0 ? (
            <div className="surface-card p-8 text-center">
              <p className="text-muted-foreground">
                Nothing saved yet — tap the heart on any product to add it here.
              </p>
              <Button asChild className="mt-4">
                <Link to="/shop">Browse the shop</Link>
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {saved.map((p) => (
                <div key={p.id} className="surface-card flex gap-4 p-4">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-20 w-20 rounded-xl bg-secondary object-cover"
                  />
                  <div>
                    <Link
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      className="font-semibold hover:text-accent-foreground"
                    >
                      {p.name}
                    </Link>
                    <p className="text-sm text-muted-foreground">{formatPrice(p.price)}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{p.stockStatus}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <div className="surface-card max-w-lg p-6">
            <h2 className="font-display text-lg font-bold">Account details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Name</dt>
                <dd className="font-medium">Alex Johnson</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Email</dt>
                <dd className="font-medium">{DEMO_CUSTOMER.email}</dd>
              </div>
              <div className="flex justify-between border-b border-border pb-2">
                <dt className="text-muted-foreground">Phone</dt>
                <dd className="font-medium">{DEMO_CUSTOMER.phone}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Marketing emails</dt>
                <dd className="font-medium">Opted out</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs text-muted-foreground">
              We keep the minimum needed to fulfil orders and answer support queries.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="addresses" className="mt-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Home", body: "24 Marine Drive, Apt 5\nSea Point, Cape Town\nWestern Cape, 8005" },
              { label: "Work", body: "108 Bree Street, 3rd Floor\nCape Town CBD\nWestern Cape, 8001" },
            ].map((a) => (
              <div key={a.label} className="surface-card p-5">
                <p className="font-display font-bold">{a.label}</p>
                <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{a.body}</p>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="queries" className="mt-6 space-y-3">
          {queries.map((q) => (
            <div key={q.reference} className="surface-card p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-display font-bold">{q.reference}</p>
                  <p className="text-sm text-muted-foreground">Subject: {q.classifiedType}</p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    q.outcome === "escalated"
                      ? "bg-warning/18 text-warning-foreground"
                      : "bg-success/12 text-success",
                  )}
                >
                  {q.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{q.question}</p>
            </div>
          ))}
          <Button asChild variant="outline">
            <Link to="/ask">Ask a new question</Link>
          </Button>
        </TabsContent>
      </Tabs>
    </div>
  );
}
