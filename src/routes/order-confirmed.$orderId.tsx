import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { findOrderById, formatPrice } from "@/lib/northstar/data";
import { useStore } from "@/lib/northstar/store";

export const Route = createFileRoute("/order-confirmed/$orderId")({
  head: () => ({
    meta: [
      { title: "Order confirmed — Northstar Retail Co." },
      { name: "description", content: "Your Northstar order has been placed successfully." },
      { property: "og:title", content: "Order confirmed — Northstar Retail Co." },
      { property: "og:description", content: "Thank you for shopping with Northstar Retail Co." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OrderConfirmed,
});

function OrderConfirmed() {
  const { orderId } = Route.useParams();
  const { orders, hydrated } = useStore();
  const order = hydrated ? findOrderById(orderId, orders) : undefined;

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="surface-card p-8 text-center sm:p-12">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-success/12 text-success">
          <CheckCircle2 className="h-8 w-8" />
        </span>
        <h1 className="mt-6 text-3xl font-bold sm:text-4xl">Order Confirmed 🎉</h1>
        <p className="mt-3 text-muted-foreground">
          Thank you for shopping with Northstar Retail Co.
        </p>

        <div className="mt-8 rounded-2xl bg-secondary p-6 text-left">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">Order number</span>
            <span className="font-display text-lg font-extrabold">{orderId}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm text-muted-foreground">Estimated delivery</span>
            <span className="font-semibold">{order?.estimatedDelivery ?? "3–5 business days"}</span>
          </div>
          {order && (
            <>
              <Separator className="my-4" />
              <ul className="space-y-2 text-sm">
                {order.items.map((i) => (
                  <li key={i.productId} className="flex justify-between gap-3">
                    <span className="text-muted-foreground">
                      {i.qty} × {i.name}
                    </span>
                    <span className="font-medium">{formatPrice(i.price * i.qty)}</span>
                  </li>
                ))}
              </ul>
              <Separator className="my-4" />
              <div className="flex justify-between">
                <span className="font-semibold">Total paid (mock)</span>
                <span className="font-display font-extrabold">{formatPrice(order.total)}</span>
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          This order is now available to the Ask Northstar support automation — try asking
          “Where is my order {orderId}?”
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/ask" search={{ order: orderId }}>
              Ask about this order
            </Link>
          </Button>
          <Button asChild size="lg" variant="ghost">
            <Link to="/account">View my account</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
