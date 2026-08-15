import { createFileRoute, Link } from "@tanstack/react-router";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of use — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Terms of use for the Northstar Retail Co. demonstration storefront and Ask Northstar support assistant.",
      },
      { property: "og:title", content: "Terms of use — Northstar Retail Co." },
      { property: "og:description", content: "Prototype terms of use." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Terms" }]} />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Terms of use</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Northstar Retail Co. is a prototype. Products, prices, orders and deliveries are fictional
        and nothing on this site constitutes a real offer to sell.
      </p>

      <section className="mt-8 space-y-6 text-sm leading-relaxed text-muted-foreground">
        <Block title="Use of the site">
          You may browse, add items to a cart and complete a simulated checkout. No payment is taken
          and no goods are dispatched.
        </Block>
        <Block title="Ask Northstar">
          Automated answers are generated from the demo data set. They are labelled as automated and
          may be incomplete. Always confirm anything important with a human.
        </Block>
        <Block title="Acceptable use">
          Do not attempt to submit malicious content, manipulate the assistant into ignoring its
          safeguards, or use the endpoint for automated abuse.
        </Block>
        <Block title="Liability">
          The prototype is provided as-is, without warranty. Decisions should not be made on the
          basis of the fictional data it displays.
        </Block>
        <Block title="Questions">
          Reach us through the{" "}
          <Link to="/contact" className="font-medium underline">
            contact page
          </Link>{" "}
          or read the{" "}
          <Link to="/governance" className="font-medium underline">
            responsible AI governance notes
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
