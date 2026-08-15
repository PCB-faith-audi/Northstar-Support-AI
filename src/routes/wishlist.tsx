import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { ProductCard } from "@/components/northstar/product-card";
import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/lib/northstar/data";
import { useStore } from "@/lib/northstar/store";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your wishlist — Northstar Retail Co." },
      { name: "description", content: "Products you saved for later at Northstar Retail Co." },
      { property: "og:title", content: "Your wishlist — Northstar Retail Co." },
      { property: "og:description", content: "Saved Northstar products, ready when you are." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Wishlist,
});

function Wishlist() {
  const { wishlist, hydrated } = useStore();
  const saved = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Wishlist" }]} />
      <h1 className="mt-4 flex items-center gap-2 text-3xl font-bold sm:text-4xl">
        <Heart className="h-7 w-7 text-accent" /> Wishlist
      </h1>
      <p className="mt-2 text-muted-foreground">
        Saved on this device. Tap the heart on any product card to add or remove it.
      </p>

      {hydrated && saved.length === 0 && (
        <div className="surface-card mt-8 p-10 text-center">
          <p className="font-medium">Your wishlist is empty.</p>
          <Button asChild className="mt-4">
            <Link to="/shop">Start browsing</Link>
          </Button>
        </div>
      )}

      {saved.length > 0 && (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {saved.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
