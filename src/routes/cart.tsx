import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/northstar/data";
import { useStore } from "@/lib/northstar/store";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your cart — Northstar Retail Co." },
      { name: "description", content: "Review the items in your Northstar cart before checkout." },
      { property: "og:title", content: "Your cart — Northstar Retail Co." },
      { property: "og:description", content: "Review your Northstar cart and proceed to checkout." },
    ],
  }),
  component: CartPage,
});

export function deliveryFeeFor(subtotal: number, express = false) {
  if (subtotal === 0) return 0;
  if (express) return 149;
  return subtotal >= 1000 ? 0 : 79;
}

function CartPage() {
  const { cartLines, subtotal, setQty, removeFromCart, hydrated } = useStore();
  const delivery = deliveryFeeFor(subtotal);
  const total = subtotal + delivery;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Your cart</h1>

      {!hydrated ? (
        <p className="mt-6 text-muted-foreground">Loading your cart…</p>
      ) : cartLines.length === 0 ? (
        <div className="surface-card mt-8 p-10 text-center">
          <h2 className="font-display text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Browse the shop and add something you love.
          </p>
          <Button asChild className="mt-6">
            <Link to="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="space-y-4">
            {cartLines.map((line) => (
              <div
                key={`${line.product.id}-${line.variant ?? "default"}`}
                className="surface-card flex gap-4 p-4"
              >
                <img
                  src={line.product.image}
                  alt={line.product.name}
                  className="h-24 w-24 shrink-0 rounded-xl bg-secondary object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Link
                        to="/product/$slug"
                        params={{ slug: line.product.slug }}
                        className="font-display font-semibold hover:text-accent-foreground"
                      >
                        {line.product.name}
                      </Link>
                      {line.variant && (
                        <p className="text-xs text-muted-foreground">Option: {line.variant}</p>
                      )}
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatPrice(line.product.price)} each
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${line.product.name}`}
                      onClick={() => removeFromCart(line.product.id, line.variant)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="mt-3 flex items-center justify-between">
                    <div className="flex items-center rounded-xl border border-border">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Decrease quantity"
                        onClick={() => setQty(line.product.id, line.qty - 1, line.variant)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center text-sm font-semibold">{line.qty}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Increase quantity"
                        onClick={() => setQty(line.product.id, line.qty + 1, line.variant)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="font-display font-bold">
                      {formatPrice(line.product.price * line.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="surface-card h-fit p-6">
            <h2 className="font-display text-lg font-semibold">Order summary</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="font-medium">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Delivery (standard)</dt>
                <dd className="font-medium">{delivery === 0 ? "Free" : formatPrice(delivery)}</dd>
              </div>
              <Separator className="my-3" />
              <div className="flex justify-between text-base">
                <dt className="font-semibold">Total</dt>
                <dd className="font-display font-extrabold">{formatPrice(total)}</dd>
              </div>
            </dl>
            <Button asChild size="lg" className="mt-6 w-full">
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button asChild variant="outline" className="mt-3 w-full">
              <Link to="/shop">Continue Shopping</Link>
            </Button>
          </aside>
        </div>
      )}
    </div>
  );
}
