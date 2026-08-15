import { Link, useNavigate } from "@tanstack/react-router";
import { Heart, Menu, MessagesSquare, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useStore } from "@/lib/northstar/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", exact: true },
  { to: "/shop", label: "Shop" },
  { to: "/categories", label: "Categories" },
  { to: "/deals", label: "Deals" },
  { to: "/new-arrivals", label: "New Arrivals" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

const MOBILE_EXTRA = [
  { to: "/ask", label: "Ask Northstar" },
  { to: "/wishlist", label: "Wishlist" },
  { to: "/orders", label: "My Orders" },
  { to: "/track", label: "Track Order" },
  { to: "/account", label: "Account" },
  { to: "/cart", label: "Cart" },
  { to: "/dashboard", label: "Ops dashboard" },
  { to: "/governance", label: "Governance" },
] as const;

export function SiteHeader() {
  const { cartCount, wishlist, hydrated } = useStore();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [term, setTerm] = useState("");
  const navigate = useNavigate();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = term.trim();
    if (!q) return;
    setSearchOpen(false);
    setOpen(false);
    navigate({ to: "/search", search: { q } });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary font-display text-lg font-black text-accent">
            N
          </span>
          <span className="font-display text-base font-extrabold tracking-tight">
            Northstar<span className="hidden text-muted-foreground sm:inline"> Retail Co.</span>
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-5 text-sm font-medium xl:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              {...("exact" in item && item.exact ? { activeOptions: { exact: true } } : {})}
              activeProps={{ className: "text-foreground" }}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1 sm:gap-2">
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link to="/ask">
              <MessagesSquare className="h-4 w-4" /> Ask Northstar
            </Link>
          </Button>
          <Button
            size="icon"
            variant="ghost"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen((v) => !v)}
          >
            {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
          </Button>
          <Button asChild size="icon" variant="ghost" aria-label="Wishlist" className="relative hidden sm:inline-flex">
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
              {hydrated && wishlist.length > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
                  {wishlist.length}
                </span>
              )}
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
            className="xl:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-border bg-background">
          <form className="mx-auto flex max-w-7xl gap-2 px-4 py-3 sm:px-6" onSubmit={submitSearch}>
            <Input
              autoFocus
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="Search products, categories or tags"
              aria-label="Search products"
            />
            <Button type="submit">Search</Button>
          </form>
        </div>
      )}

      <div className={cn("border-t border-border xl:hidden", open ? "block" : "hidden")}>
        <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3 text-sm sm:px-6">
          {[...NAV, ...MOBILE_EXTRA].map((item) => (
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
