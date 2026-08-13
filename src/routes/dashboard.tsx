import { createFileRoute, Link } from "@tanstack/react-router";
import { Activity, AlertTriangle, BarChart3, CheckCircle2, Power, Ticket } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { maskEmail, type SupportQuery } from "@/lib/northstar/deflection";
import { useStore } from "@/lib/northstar/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Support operations dashboard — Northstar Retail Co." },
      {
        name: "description",
        content:
          "Monitor Ask Northstar query volume, automated resolution rate, escalations and the automation kill switch.",
      },
      { property: "og:title", content: "Support operations dashboard — Northstar Retail Co." },
      {
        property: "og:description",
        content: "Measure support deflection: volumes, resolution rate and escalations.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const { queries, automationEnabled, setAutomationEnabled, updateQueryStatus, hydrated } =
    useStore();
  const [selected, setSelected] = useState<SupportQuery | null>(null);

  const metrics = useMemo(() => {
    const total = queries.length;
    const resolved = queries.filter((q) => q.outcome === "auto-resolved").length;
    const escalated = total - resolved;
    const byType = queries.reduce<Record<string, number>>((acc, q) => {
      acc[q.classifiedType] = (acc[q.classifiedType] ?? 0) + 1;
      return acc;
    }, {});
    return {
      total,
      resolved,
      escalated,
      rate: total ? Math.round((resolved / total) * 100) : 0,
      byType: Object.entries(byType).sort((a, b) => b[1] - a[1]),
    };
  }, [queries]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Internal · Operations
          </span>
          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Support deflection dashboard</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            Query volume, automation outcomes and escalations. Customer identifiers are masked —
            operations staff see only what they need to run the service.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/governance">Governance &amp; audit trail</Link>
        </Button>
      </header>

      <section
        className={cn(
          "surface-card mt-8 flex flex-wrap items-center justify-between gap-4 p-6",
          !automationEnabled && "border-destructive/60 bg-destructive/5",
        )}
      >
        <div className="flex items-start gap-3">
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-xl",
              automationEnabled ? "bg-success/12 text-success" : "bg-destructive/12 text-destructive",
            )}
          >
            <Power className="h-5 w-5" />
          </span>
          <div>
            <h2 className="font-display text-lg font-bold">Automation kill switch</h2>
            <p className="max-w-xl text-sm text-muted-foreground">
              {automationEnabled
                ? "Automated responses are live. Switch off to route every incoming query to a human agent immediately — no deploy required."
                : "Automation is disabled. Every incoming query is escalated to a human agent and the customer is told so."}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Authority: Support Operations Lead or Engineering on-call (see RANK in Governance).
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold">{automationEnabled ? "Enabled" : "Disabled"}</span>
          <Switch
            checked={automationEnabled}
            aria-label="Toggle automated responses"
            onCheckedChange={(v) => {
              setAutomationEnabled(v);
              toast[v ? "success" : "warning"](
                v ? "Automation re-enabled" : "Automation disabled — all queries go to humans",
              );
            }}
          />
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Total queries" value={metrics.total} Icon={Ticket} />
        <MetricCard
          label="Automatically resolved"
          value={metrics.resolved}
          Icon={CheckCircle2}
          tone="success"
        />
        <MetricCard
          label="Escalated to humans"
          value={metrics.escalated}
          Icon={AlertTriangle}
          tone="warning"
        />
        <MetricCard label="Resolution rate" value={`${metrics.rate}%`} Icon={BarChart3} />
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <section className="surface-card overflow-hidden">
          <div className="flex items-center justify-between gap-4 p-5">
            <h2 className="font-display text-lg font-bold">Query log</h2>
            <span className="text-xs text-muted-foreground">
              {hydrated ? `${queries.length} records` : "loading…"}
            </span>
          </div>
          <Separator />
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Automation result</TableHead>
                  <TableHead className="hidden lg:table-cell">Timestamp</TableHead>
                  <TableHead className="text-right">Review</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {queries.map((q) => (
                  <TableRow key={q.reference}>
                    <TableCell className="font-medium">{q.reference}</TableCell>
                    <TableCell>{q.classifiedType}</TableCell>
                    <TableCell>
                      <StatusPill status={q.status} />
                    </TableCell>
                    <TableCell className="hidden max-w-[280px] truncate md:table-cell">
                      {q.outcome === "auto-resolved" ? "Resolved" : "Escalated"} · {q.reason}
                    </TableCell>
                    <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                      {new Date(q.timestamp).toLocaleString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button size="sm" variant="ghost" onClick={() => setSelected(q)}>
                        Open
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <aside className="space-y-6">
          <div className="surface-card p-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide">
              Queries by ticket type
            </h2>
            <ul className="mt-4 space-y-3">
              {metrics.byType.map(([type, count]) => (
                <li key={type}>
                  <div className="flex justify-between text-sm">
                    <span>{type}</span>
                    <span className="font-semibold">{count}</span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="gold-gradient h-full rounded-full"
                      style={{ width: `${(count / metrics.total) * 100}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-5">
            <h2 className="flex items-center gap-2 font-display text-sm font-bold uppercase tracking-wide">
              <Activity className="h-4 w-4" /> Recent activity
            </h2>
            <ul className="mt-4 space-y-3 text-sm">
              {queries.slice(0, 5).map((q) => (
                <li key={q.reference} className="border-b border-border pb-2 last:border-0">
                  <p className="font-medium">{q.reference}</p>
                  <p className="text-xs text-muted-foreground">
                    {q.classifiedType} · {q.status} ·{" "}
                    {new Date(q.timestamp).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-card p-5">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide">
              CYCLE — what the data tells us
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                • {metrics.rate}% of logged queries were deflected without a human touching them.
              </li>
              <li>
                • Escalations cluster on payment disputes and conflicting carrier data — both
                deliberate policy choices, not model failures.
              </li>
              <li>
                • Next course correction: reconcile carrier vs OMS status before answering, which
                would remove the largest remaining escalation cause.
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-foreground/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Query ${selected.reference}`}
          onClick={() => setSelected(null)}
        >
          <div
            className="max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-card p-6 shadow-[var(--shadow-lift)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-display text-xl font-bold">{selected.reference}</h2>
                <p className="text-sm text-muted-foreground">
                  {selected.classifiedType} · {new Date(selected.timestamp).toLocaleString()}
                </p>
              </div>
              <StatusPill status={selected.status} />
            </div>

            <dl className="mt-5 grid gap-2 text-sm">
              <Row k="Customer (masked)" v={maskEmail(selected.email)} />
              <Row k="Declared type" v={String(selected.queryType)} />
              <Row k="Classified type" v={selected.classifiedType} />
              <Row k="Confidence" v={`${(selected.confidence * 100).toFixed(0)}%`} />
              <Row k="Channel" v={selected.channel} />
              <Row k="Data checked" v={selected.dataChecked.join(", ") || "none"} />
              <Row k="Guardrails" v={selected.guardrailsApplied.join(", ") || "none"} />
              {selected.escalationReason && (
                <Row k="Escalation reason" v={selected.escalationReason} />
              )}
            </dl>

            <h3 className="mt-6 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Customer question
            </h3>
            <p className="mt-1 rounded-xl bg-secondary p-3 text-sm">{selected.question}</p>

            <h3 className="mt-4 text-sm font-bold uppercase tracking-wide text-muted-foreground">
              Response sent
            </h3>
            <p className="mt-1 whitespace-pre-line rounded-xl bg-secondary p-3 text-sm">
              {selected.response.replace(/\*\*/g, "")}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                onClick={() => {
                  updateQueryStatus(selected.reference, "Closed");
                  setSelected(null);
                  toast.success("Query closed after review");
                }}
              >
                Mark reviewed &amp; close
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  updateQueryStatus(selected.reference, "Escalated");
                  setSelected(null);
                  toast.warning("Query escalated to a human agent");
                }}
              >
                Disagree — escalate to human
              </Button>
              <Button variant="ghost" onClick={() => setSelected(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-6 border-b border-border py-1.5">
      <dt className="shrink-0 text-muted-foreground">{k}</dt>
      <dd className="text-right font-medium">{v}</dd>
    </div>
  );
}

function StatusPill({ status }: { status: SupportQuery["status"] }) {
  const tone =
    status === "Answered"
      ? "bg-success/12 text-success"
      : status === "Escalated"
        ? "bg-warning/18 text-warning-foreground"
        : status === "Closed"
          ? "bg-secondary text-muted-foreground"
          : "bg-info/12 text-info";
  return (
    <span className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", tone)}>{status}</span>
  );
}

function MetricCard({
  label,
  value,
  Icon,
  tone,
}: {
  label: string;
  value: string | number;
  Icon: typeof Ticket;
  tone?: "success" | "warning";
}) {
  return (
    <div className="surface-card p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">{label}</span>
        <Icon
          className={cn(
            "h-4 w-4",
            tone === "success"
              ? "text-success"
              : tone === "warning"
                ? "text-warning-foreground"
                : "text-muted-foreground",
          )}
        />
      </div>
      <p className="mt-2 font-display text-3xl font-extrabold">{value}</p>
    </div>
  );
}
