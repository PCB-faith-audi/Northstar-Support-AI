import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Heart, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProductCard, StockPill } from "@/components/northstar/product-card";
import { findProductBySlug, formatPrice, relatedProducts } from "@/lib/northstar/data";
import { useStore } from "@/lib/northstar/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = findProductBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable — Northstar Retail Co." },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    return {
      meta: [
        { title: `${product.name} — Northstar Retail Co.` },
        { name: "description", content: product.shortDescription },
        { property: "og:title", content: `${product.name} — Northstar Retail Co.` },
        { property: "og:description", content: product.shortDescription },
      ],
    };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product } = Route.useLoaderData();
  const { addToCart, toggleWishlist, wishlist, hydrated } = useStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [variant, setVariant] = useState(
    product.variants?.find((v) => v.stock > 0)?.value ?? undefined,
  );

  const saved = hydrated && wishlist.includes(product.id);
  const buyable = product.stockCount > 0;
  const related = relatedProducts(product);

  const add = () => {
    addToCart(product.id, qty, variant);
    toast.success("Added to cart", { description: `${qty} × ${product.name}` });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link to="/" className="hover:text-foreground">
          Home
        </Link>{" "}
        /{" "}
        <Link to="/shop" className="hover:text-foreground">
          Shop
        </Link>{" "}
        / <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-3xl bg-secondary object-cover shadow-[var(--shadow-soft)]"
          />
          <div className="mt-4 grid grid-cols-4 gap-3">
            {[0, 1, 2, 3].map((i) => (
              <img
                key={i}
                src={product.image}
                alt={`${product.name} view ${i + 1}`}
                loading="lazy"
                className={cn(
                  "aspect-square w-full rounded-xl bg-secondary object-cover",
                  i === 0 ? "ring-2 ring-accent" : "opacity-70",
                )}
              />
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1 font-semibold">
              <Star className="h-4 w-4 fill-accent text-accent" /> {product.rating}
            </span>
            <span className="text-muted-foreground">{product.reviews} reviews</span>
            <StockPill product={product} />
          </div>

          <div className="mt-5 flex items-end gap-3">
            <span className="font-display text-3xl font-extrabold">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="pb-1 text-lg text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <p className="mt-5 text-muted-foreground">{product.description}</p>

          {product.variants && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold">{product.variantLabel}</h2>
              <div className="mt-2 flex flex-wrap gap-2">
                {product.variants.map((v) => (
                  <button
                    key={v.value}
                    type="button"
                    disabled={v.stock === 0}
                    onClick={() => setVariant(v.value)}
                    className={cn(
                      "rounded-xl border px-4 py-2 text-sm font-medium transition-colors",
                      variant === v.value
                        ? "border-accent bg-accent/15"
                        : "border-border hover:bg-secondary",
                      v.stock === 0 && "cursor-not-allowed text-muted-foreground line-through",
                    )}
                  >
                    {v.value}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Options shown as unavailable are out of stock in our inventory system.
              </p>
            </div>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-xl border border-border">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center text-sm font-semibold">{qty}</span>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => Math.min(10, q + 1))}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button size="lg" disabled={!buyable} onClick={add}>
              <ShoppingBag className="mr-2 h-4 w-4" /> Add to Cart
            </Button>
            <Button
              size="lg"
              variant="secondary"
              disabled={!buyable}
              onClick={() => {
                add();
                void navigate({ to: "/checkout" });
              }}
            >
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => toggleWishlist(product.id)}
              aria-pressed={saved}
            >
              <Heart className={cn("mr-2 h-4 w-4", saved && "fill-destructive text-destructive")} />
              {saved ? "Saved" : "Wishlist"}
            </Button>
          </div>

          {!buyable && (
            <p className="mt-4 rounded-xl bg-secondary p-4 text-sm">
              This item is {product.stockStatus.toLowerCase()}.{" "}
              {product.restockDate
                ? `Our inventory record shows an expected restock date of ${product.restockDate}.`
                : "We don't have a confirmed restock date, so we won't guess at one."}{" "}
              <Link to="/ask" className="font-semibold underline">
                Ask Northstar
              </Link>{" "}
              to be notified.
            </p>
          )}

          <Separator className="my-8" />

          <h2 className="font-display text-lg font-semibold">Specifications</h2>
          <dl className="mt-3 grid gap-2 text-sm">
            {product.specs.map((s) => (
              <div key={s.label} className="flex justify-between gap-4 border-b border-border py-2">
                <dt className="text-muted-foreground">{s.label}</dt>
                <dd className="font-medium">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">You May Also Like</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
