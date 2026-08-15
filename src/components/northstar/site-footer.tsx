import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SHOP_LINKS = [
  { to: "/shop", label: "All products" },
  { to: "/categories", label: "Categories" },
  { to: "/new-arrivals", label: "New arrivals" },
  { to: "/deals", label: "Deals" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/cart", label: "Cart" },
] as const;

const SERVICE_LINKS = [
  { to: "/ask", label: "Ask Northstar" },
  { to: "/track", label: "Track order" },
  { to: "/orders", label: "My orders" },
  { to: "/returns", label: "Returns & refunds" },
  { to: "/shipping", label: "Shipping information" },
  { to: "/contact", label: "Contact us" },
] as const;

const ABOUT_LINKS = [
  { to: "/about", label: "About Northstar" },
  { to: "/governance", label: "Responsible AI" },
  { to: "/dashboard", label: "Deflection dashboard" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
] as const;

const SOCIALS = [
  { label: "Instagram", Icon: Instagram },
  { label: "Facebook", Icon: Facebook },
  { label: "X", Icon: Twitter },
  { label: "LinkedIn", Icon: Linkedin },
];

export function SiteFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 xl:grid-cols-5">
        <div className="xl:col-span-1">
          <span className="font-display text-lg font-extrabold">Northstar Retail Co.</span>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
            A demonstration storefront for an AI-assisted customer support deflection system.
            Products, orders and prices are fictional.
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                aria-label={`${label} (placeholder)`}
                onClick={() => toast("Social placeholder", { description: `${label} is not connected in this prototype.` })}
                className="grid h-9 w-9 place-items-center rounded-full border border-primary-foreground/25 text-primary-foreground/80 transition-colors hover:border-accent hover:text-accent"
              >
                <Icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        <FooterCol title="Shop" links={SHOP_LINKS} />
        <FooterCol title="Customer Service" links={SERVICE_LINKS} />
        <FooterCol title="About Northstar" links={ABOUT_LINKS} />

        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Stay in touch</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li className="flex gap-2">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="mailto:support@northstar-retail.example" className="hover:text-primary-foreground">
                support@northstar-retail.example
              </a>
            </li>
            <li className="flex gap-2">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <a href="tel:+27210004400" className="hover:text-primary-foreground">
                +27 21 000 4400
              </a>
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
              <span>18 Harbour Way, Cape Town, 8001</span>
            </li>
          </ul>

          <form
            className="mt-5 flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              toast.success("You're on the list", {
                description: "Prototype newsletter — no email is actually stored.",
              });
              setEmail("");
            }}
          >
            <Input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              aria-label="Email address for newsletter"
              className="border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button type="submit" variant="secondary">
              Join
            </Button>
          </form>
        </div>
      </div>

      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-5 text-xs text-primary-foreground/60 sm:px-6">
          <p>© {new Date().getFullYear()} Northstar Retail Co. Prototype — not a real store.</p>
          <p>Automated replies are clearly labelled. A human is always one reply away.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: readonly { to: string; label: string }[];
}) {
  return (
    <div>
      <h2 className="text-sm font-bold uppercase tracking-wide text-accent">{title}</h2>
      <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
        {links.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="hover:text-primary-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
