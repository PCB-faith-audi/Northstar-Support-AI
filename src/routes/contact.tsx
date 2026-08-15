import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessagesSquare, Phone } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Breadcrumbs } from "@/components/northstar/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact us — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Reach the Northstar Retail Co. support team by email, phone or message — or get an instant answer from Ask Northstar.",
      },
      { property: "og:title", content: "Contact us — Northstar Retail Co." },
      { property: "og:description", content: "Humans and automation, one reply away." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Contact,
});

export const CONTACT = {
  email: "support@northstar-retail.example",
  phone: "+27 21 000 4400",
  address: "18 Harbour Way, Cape Town, 8001, South Africa",
  hours: "Mon–Fri 08:00–18:00 SAST · Sat 09:00–13:00",
};

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <h1 className="mt-4 text-3xl font-bold sm:text-4xl">Contact Northstar</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Simple questions about orders, returns and stock are usually answered instantly by Ask
        Northstar. Anything sensitive goes straight to a human.
      </p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="surface-card p-6">
          <h2 className="font-display text-xl font-bold">Send us a message</h2>
          <form
            className="mt-5 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Message received", {
                description: "This is a prototype — no email was actually sent.",
              });
            }}
          >
            <div className="grid gap-2 sm:grid-cols-2 sm:gap-4">
              <div className="grid gap-2">
                <Label htmlFor="c-name">Name</Label>
                <Input id="c-name" required placeholder="Alex Johnson" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="c-email">Email</Label>
                <Input id="c-email" type="email" required placeholder="alex@example.com" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-subject">Subject</Label>
              <Input id="c-subject" required placeholder="Question about my order" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="c-message">Message</Label>
              <Textarea id="c-message" required rows={5} placeholder="How can we help?" />
            </div>
            <Button type="submit" className="justify-self-start">
              Send message
            </Button>
            {sent && (
              <p className="text-sm text-success">
                Thanks — a support specialist will reply within one business day.
              </p>
            )}
          </form>
        </div>

        <div className="grid gap-4 content-start">
          <div className="surface-card p-6">
            <h2 className="font-display text-lg font-bold">Reach us directly</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex gap-3">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                <a href={`mailto:${CONTACT.email}`} className="hover:underline">
                  {CONTACT.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="h-4 w-4 shrink-0 text-accent" />
                <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:underline">
                  {CONTACT.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-muted-foreground">{CONTACT.address}</span>
              </li>
              <li className="flex gap-3">
                <Clock className="h-4 w-4 shrink-0 text-accent" />
                <span className="text-muted-foreground">{CONTACT.hours}</span>
              </li>
            </ul>
          </div>

          <div className="surface-card p-6">
            <h2 className="font-display text-lg font-bold">Need an answer right now?</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask Northstar resolves order status, returns and stock questions instantly, and hands
              over to a human when it should.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild>
                <Link to="/ask">
                  <MessagesSquare className="h-4 w-4" /> Ask Northstar
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/track">Track an order</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
