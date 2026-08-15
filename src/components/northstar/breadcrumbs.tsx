import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  to?: string;
  params?: Record<string, string>;
  search?: Record<string, string>;
}

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const base = tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground";
  const active = tone === "dark" ? "text-primary-foreground" : "text-foreground";

  return (
    <nav aria-label="Breadcrumb" className={`flex flex-wrap items-center gap-1 text-xs ${base}`}>
      <Link to="/" className="transition-colors hover:underline">
        Home
      </Link>
      {items.map((item, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${item.label}-${i}`} className="flex items-center gap-1">
            <ChevronRight className="h-3.5 w-3.5 opacity-60" aria-hidden />
            {item.to && !last ? (
              <Link
                to={item.to}
                {...(item.params ? { params: item.params } : {})}
                {...(item.search ? { search: item.search } : {})}
                className="transition-colors hover:underline"
              >
                {item.label}
              </Link>
            ) : (
              <span className={last ? `font-medium ${active}` : undefined} aria-current={last ? "page" : undefined}>
                {item.label}
              </span>
            )}
          </span>
        );
      })}
    </nav>
  );
}
