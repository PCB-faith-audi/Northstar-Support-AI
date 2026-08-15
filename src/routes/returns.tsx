import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { Button } from "@/components/ui/button";
import { RETURNS_POLICY } from "@/lib/northstar/data";

export const Route = createFileRoute("/returns")({
  head: () => ({
    meta: [
      { title: "Returns & refunds — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Northstar's 30-day return window, refund timelines and step-by-step instructions for starting a return.",
      },
      { property: "og:title", content: "Returns & refunds — Northstar Retail Co." },
      { property: "og:description", content: "How Northstar returns and refunds work." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Returns,
});

function Returns() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Customer service", to: "/contact" }, { label: "Returns & refunds" }]}
      />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Returns &amp; refunds</h1>

      <div className="surface-card mt-6 grid gap-4 p-6 sm:grid-cols-3">
        <Stat label="Return window" value={`${RETURNS_POLICY.windowDays} days`} />
        <Stat label="Refund time" value={RETURNS_POLICY.refundBusinessDays} />
        <Stat label="Return shipping" value="Free on faulty items" />
      </div>

      <section className="prose-none mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">What you can return</h2>
          <p className="mt-2">{RETURNS_POLICY.conditions}</p>
          <p className="mt-2">
            Personalised items and opened hygiene products cannot be returned unless faulty.
          </p>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-foreground">How to start a return</h2>
          <ol className="mt-2 list-decimal space-y-2 pl-5">
            <li>Open the order in your account or on the Track Order page.</li>
            <li>Choose the items you are returning and the reason.</li>
            <li>Print the prepaid label or book a collection.</li>
            <li>
              Once we receive and inspect the parcel, your refund is issued to the original payment
              method within {RETURNS_POLICY.refundBusinessDays}.
            </li>
          </ol>
        </div>

        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Refund status</h2>
          <p className="mt-2">
            Ask Northstar can tell you the current refund state of any order instantly. Anything
            involving a payment dispute or a charge you do not recognise is routed to a human
            specialist — automation never decides those.
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/ask">Ask about a return</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/orders">My orders</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/shipping">Shipping information</Link>
        </Button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-display text-lg font-bold">{value}</p>
    </div>
  );
}
