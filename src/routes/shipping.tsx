import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/shipping")({
  head: () => ({
    meta: [
      { title: "Shipping information — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Northstar delivery options, costs, cut-off times and carrier partners for standard, express and collection orders.",
      },
      { property: "og:title", content: "Shipping information — Northstar Retail Co." },
      { property: "og:description", content: "Delivery options, costs and timelines." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Shipping,
});

const OPTIONS = [
  { method: "Standard Delivery", time: "3–5 business days", cost: "R 79 (free over R 1 000)" },
  { method: "Express Delivery", time: "1–2 business days", cost: "R 149" },
  { method: "Click & Collect", time: "Next business day", cost: "Free" },
];

function Shipping() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs
        items={[{ label: "Customer service", to: "/contact" }, { label: "Shipping information" }]}
      />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Shipping information</h1>
      <p className="mt-2 text-muted-foreground">
        Orders placed before 14:00 SAST on a business day are picked the same day.
      </p>

      <div className="surface-card mt-6 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Method</TableHead>
              <TableHead>Estimated time</TableHead>
              <TableHead>Cost</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {OPTIONS.map((o) => (
              <TableRow key={o.method}>
                <TableCell className="font-medium">{o.method}</TableCell>
                <TableCell>{o.time}</TableCell>
                <TableCell>{o.cost}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <section className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Carriers</h2>
          <p className="mt-2">
            We ship with Northstar Express and SwiftPost. Your tracking reference appears on the
            order confirmation and on the Track Order page as soon as the parcel is scanned.
          </p>
        </div>
        <div>
          <h2 className="font-display text-xl font-bold text-foreground">Delays</h2>
          <p className="mt-2">
            If a carrier scan and our order system disagree, Ask Northstar will not guess — the
            query is escalated to a human who confirms the real status before we reply.
          </p>
        </div>
      </section>

      <div className="mt-8 flex flex-wrap gap-2">
        <Button asChild>
          <Link to="/track">Track an order</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/returns">Returns &amp; refunds</Link>
        </Button>
      </div>
    </div>
  );
}
