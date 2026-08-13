import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <span className="font-display text-lg font-extrabold">Northstar Retail Co.</span>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
            A demonstration storefront for an AI-assisted customer support deflection system.
            Products, orders and prices are fictional.
          </p>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Shop</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/shop" className="hover:text-primary-foreground">All products</Link></li>
            <li><Link to="/deals" className="hover:text-primary-foreground">Deals</Link></li>
            <li><Link to="/cart" className="hover:text-primary-foreground">Cart</Link></li>
            <li><Link to="/account" className="hover:text-primary-foreground">Account</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Support</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/ask" className="hover:text-primary-foreground">Ask Northstar</Link></li>
            <li><Link to="/about" className="hover:text-primary-foreground">About us</Link></li>
            <li><Link to="/governance" className="hover:text-primary-foreground">Responsible AI</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-accent">Operations</h2>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/75">
            <li><Link to="/dashboard" className="hover:text-primary-foreground">Deflection dashboard</Link></li>
            <li><Link to="/governance" className="hover:text-primary-foreground">Audit trail</Link></li>
          </ul>
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
