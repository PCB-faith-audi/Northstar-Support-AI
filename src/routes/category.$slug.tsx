import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { ProductCard } from "@/components/northstar/product-card";
import { Button } from "@/components/ui/button";
import { CATEGORIES } from "@/lib/northstar/data";
import { categoryFromSlug, categorySlug, productsInCategory } from "@/lib/northstar/categories";

export const Route = createFileRoute("/category/$slug")({
  loader: ({ params }) => {
    const category = categoryFromSlug(params.slug);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Category not found — Northstar" }, { name: "robots", content: "noindex" }],
      };
    }
    const title = `${loaderData.category} — Northstar Retail Co.`;
    const description = `Shop ${loaderData.category.toLowerCase()} at Northstar Retail Co. with live stock status and instant support answers.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  notFoundComponent: CategoryNotFound,
  component: CategoryPage,
});

function CategoryNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
      <h1 className="text-2xl font-bold">We could not find that category</h1>
      <p className="mt-2 text-muted-foreground">It may have been renamed or removed.</p>
      <Button asChild className="mt-6">
        <Link to="/categories">Browse all categories</Link>
      </Button>
    </div>
  );
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const products = productsInCategory(category);
  const blurb = CATEGORIES.find((c) => c.name === category)?.blurb ?? "";

  return (
    <div>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <Breadcrumbs
            tone="dark"
            items={[{ label: "Categories", to: "/categories" }, { label: category }]}
          />
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">{category}</h1>
          <p className="mt-3 max-w-2xl text-primary-foreground/80">{blurb}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c.name !== category).map((c) => (
            <Button key={c.name} asChild size="sm" variant="outline">
              <Link to="/category/$slug" params={{ slug: categorySlug(c.name) }}>
                {c.name}
              </Link>
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
