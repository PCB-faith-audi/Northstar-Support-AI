import { Link } from "@tanstack/react-router";
import { Menu, MessagesSquare, ShoppingBag, UserRound } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useStore } from "@/lib/northstar/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/shop", label: "Shop" },
  { to: "/deals", label: "Deals" },
  { to: "/about", label: "About" },
  { to: "/governance", label: "Governance" },
  { to: "/dashboard", label: "Ops dashboard" },
] as const;

export function SiteHeader() {
  const { cartCount, hydrated } = useStore();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-lg font-black text-accent">
            N
          </span>
          <span className="font-display text-base font-extrabold tracking-tight">
            Northstar<span className="text-muted-foreground"> Retail Co.</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-6 text-sm font-medium lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-foreground" }}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <Link to="/ask">
              <MessagesSquare className="h-4 w-4" /> Ask Northstar
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost" aria-label="Account">
            <Link to="/account">
              <UserRound className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild size="icon" variant="ghost" aria-label="Cart" className="relative">
            <Link to="/cart">
              <ShoppingBag className="h-5 w-5" />
              {hydrated && cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className={cn("border-t border-border lg:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3 text-sm sm:px-6">
          {[...NAV, { to: "/ask", label: "Ask Northstar" } as const].map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
