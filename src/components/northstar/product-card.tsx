import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { formatPrice, type Product } from "@/lib/northstar/data";
import { cn } from "@/lib/utils";

export function StockPill({ product, className }: { product: Product; className?: string }) {
  const tone =
    product.stockStatus === "In Stock"
      ? "bg-success/12 text-success"
      : product.stockStatus === "Low Stock"
        ? "bg-warning/15 text-warning-foreground"
        : product.stockStatus === "Pre-order"
          ? "bg-info/12 text-info"
          : "bg-destructive/12 text-destructive";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
        tone,
        className,
      )}
    >
      {product.stockStatus}
      {product.stockStatus === "Low Stock" && ` · ${product.stockCount} left`}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="surface-card group flex h-full flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]">
      <Link
        to="/product/$slug"
        params={{ slug: product.slug }}
        className="block overflow-hidden bg-secondary"
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          width={800}
          height={800}
          className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            {product.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-semibold">
            <Star className="h-3.5 w-3.5 fill-accent text-accent" />
            {product.rating}
          </span>
        </div>
        <h3 className="font-display text-base font-semibold leading-snug">
          <Link to="/product/$slug" params={{ slug: product.slug }} className="hover:text-accent-foreground">
            {product.name}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">{product.shortDescription}</p>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <span className="font-display text-lg font-extrabold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="ml-2 text-sm text-muted-foreground line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <StockPill product={product} />
        </div>
      </div>
    </article>
  );
}
