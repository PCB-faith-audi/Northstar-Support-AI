import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy notice — Northstar Retail Co." },
      {
        name: "description",
        content:
          "How this Northstar Retail Co. prototype handles customer data, support queries and automated replies.",
      },
      { property: "og:title", content: "Privacy notice — Northstar Retail Co." },
      { property: "og:description", content: "Data handling in the Northstar prototype." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Privacy,
});

function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Privacy" }]} />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Privacy notice</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Northstar Retail Co. is a demonstration application. The statements below describe how this
        prototype behaves; it is not legal advice and no real customer data is processed.
      </p>

      <section className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <Block title="What this prototype stores">
          Cart contents, wishlist, demo orders and support queries are stored in your browser's
          local storage on this device only. Clearing site data removes them.
        </Block>
        <Block title="Support queries">
          Queries submitted to Ask Northstar are kept in the same local store so the operations
          dashboard can show resolution metrics. Personal identifiers shown on the dashboard are
          masked.
        </Block>
        <Block title="Automated decisions">
          Automated replies are always labelled as automated, and a human route is always offered.
          Payment disputes, sensitive complaints and conflicting delivery data are never resolved by
          automation.
        </Block>
        <Block title="Third parties">
          If an external workflow endpoint is configured, query text is forwarded to it for
          processing. When it is not configured, everything is resolved locally.
        </Block>
        <Block title="Contact">
          Questions about this notice can be sent through the{" "}
          <Link to="/contact" className="font-medium underline">
            contact page
          </Link>
          .
        </Block>
      </section>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-display text-xl font-bold text-foreground">{title}</h2>
      <p className="mt-2">{children}</p>
    </div>
  );
}
