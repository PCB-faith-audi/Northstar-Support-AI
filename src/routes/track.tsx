import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Check, Circle, CircleDot, MessagesSquare, PackageSearch } from "lucide-react";
import { useState } from "react";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { findOrderById, formatPrice, type Order, type OrderStatus } from "@/lib/northstar/data";
import { useStore } from "@/lib/northstar/store";
import { cn } from "@/lib/utils";

interface TrackSearch {
  order?: string;
}

export const Route = createFileRoute("/track")({
  validateSearch: (search: Record<string, unknown>): TrackSearch =>
    typeof search["order"] === "string" ? { order: search["order"] } : {},
  head: () => ({
    meta: [
      { title: "Track your order — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Enter your Northstar order number to see a live delivery timeline: confirmed, packed, shipped, out for delivery and delivered.",
      },
      { property: "og:title", content: "Track your order — Northstar Retail Co." },
      { property: "og:description", content: "Self-serve order tracking, no waiting on support." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackOrder,
});

const STEPS = [
  "Order Confirmed",
  "Payment Confirmed",
  "Processing",
  "Shipped",
  "Out for Delivery",
  "Delivered",
] as const;

function currentStepIndex(status: OrderStatus): number {
  switch (status) {
    case "Processing":
      return 2;
    case "Packed":
      return 2;
    case "Shipped":
      return 3;
    case "Out for Delivery":
      return 4;
    case "Delivered":
      return 5;
    case "Delayed":
      return 3;
    case "Cancelled":
      return 1;
    default:
      return 0;
  }
}

function TrackOrder() {
  const { order: orderParam } = Route.useSearch();
  const navigate = useNavigate({ from: "/track" });
  const { orders } = useStore();
  const [value, setValue] = useState(orderParam ?? "");

  const found = orderParam ? findOrderById(orderParam, orders) : undefined;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "My orders", to: "/orders" }, { label: "Track order" }]} />
      <h1 className="mt-4 flex items-center gap-2 text-3xl font-bold sm:text-4xl">
        <PackageSearch className="h-7 w-7 text-accent" /> Track your order
      </h1>
      <p className="mt-2 text-muted-foreground">
        Enter your order number (for example <span className="font-medium">NS-2026-10482</span>) to
        see exactly where your parcel is.
      </p>

      <form
        className="surface-card mt-6 flex flex-col gap-3 p-5 sm:flex-row sm:items-end"
        onSubmit={(e) => {
          e.preventDefault();
          navigate({ search: value.trim() ? { order: value.trim() } : {} });
        }}
      >
        <div className="grid flex-1 gap-2">
          <Label htmlFor="order-ref">Order number</Label>
          <Input
            id="order-ref"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="NS-2026-10482"
          />
        </div>
        <Button type="submit">Track order</Button>
      </form>

      {orderParam && !found && (
        <div className="surface-card mt-6 p-6">
          <p className="font-medium">We could not find order “{orderParam}”.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Check the reference on your confirmation email, or ask our support assistant to look it
            up with you.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline">
              <Link to="/orders">See my orders</Link>
            </Button>
            <Button asChild>
              <Link to="/ask">
                <MessagesSquare className="h-4 w-4" /> Ask Northstar
              </Link>
            </Button>
          </div>
        </div>
      )}

      {found && <OrderTimeline order={found} />}
    </div>
  );
}

export function OrderTimeline({ order }: { order: Order }) {
  const active = currentStepIndex(order.status);
  const cancelled = order.status === "Cancelled";

  return (
    <div className="surface-card mt-6 p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-bold">Order {order.id}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed {order.placedAt} · {order.deliveryMethod} · {order.carrier} ({order.trackingRef})
          </p>
        </div>
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
          {order.status}
        </span>
      </div>

      <Separator className="my-5" />

      <ol className="space-y-4">
        {STEPS.map((step, i) => {
          const done = !cancelled && i < active;
          const current = !cancelled && i === active;
          return (
            <li key={step} className="flex items-start gap-3">
              <span
                className={cn(
                  "mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border",
                  done && "border-success bg-success text-success-foreground",
                  current && "border-accent bg-accent text-accent-foreground",
                  !done && !current && "border-border text-muted-foreground",
                )}
                aria-hidden
              >
                {done ? (
                  <Check className="h-3.5 w-3.5" />
                ) : current ? (
                  <CircleDot className="h-3.5 w-3.5" />
                ) : (
                  <Circle className="h-3 w-3" />
                )}
              </span>
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    !done && !current && "text-muted-foreground",
                  )}
                >
                  {step}
                </p>
                {current && (
                  <p className="text-xs text-muted-foreground">
                    {order.status === "Delayed"
                      ? `Delayed — revised estimate ${order.estimatedDelivery}`
                      : `Estimated delivery: ${order.estimatedDelivery}`}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {cancelled && (
        <p className="mt-4 rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
          This order was cancelled. Contact support if you were charged.
        </p>
      )}

      <Separator className="my-5" />

      <ul className="space-y-2 text-sm">
        {order.items.map((item) => (
          <li key={`${order.id}-${item.productId}`} className="flex justify-between gap-4">
            <span>
              {item.name} × {item.qty}
            </span>
            <span className="font-medium">{formatPrice(item.price * item.qty)}</span>
          </li>
        ))}
      </ul>
      <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm font-semibold">
        <span>Total</span>
        <span>{formatPrice(order.total)}</span>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Button asChild variant="outline">
          <Link to="/returns">Returns &amp; refunds</Link>
        </Button>
        <Button asChild>
          <Link to="/ask" search={{ order: order.id }}>
            <MessagesSquare className="h-4 w-4" /> Ask about this order
          </Link>
        </Button>
      </div>
    </div>
  );
}
