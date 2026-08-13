import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  CheckCircle2,
  Loader2,
  Mail,
  ShieldAlert,
  UserRound,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { QUERY_TYPES, makeReference, type SupportQuery } from "@/lib/northstar/deflection";
import { useStore } from "@/lib/northstar/store";
import { cn } from "@/lib/utils";

interface AskSearch {
  order?: string;
}

export const Route = createFileRoute("/ask")({
  validateSearch: (search: Record<string, unknown>): AskSearch =>
    typeof search["order"] === "string" ? { order: search["order"] } : {},
  head: () => ({
    meta: [
      { title: "Ask Northstar — fast answers on orders, returns and stock" },
      {
        name: "description",
        content:
          "Ask Northstar about an order, delivery, return, refund or product availability and get an immediate, clearly-labelled automated answer — or a human agent.",
      },
      { property: "og:title", content: "Ask Northstar — Northstar Retail Co. support" },
      {
        property: "og:description",
        content: "Automated answers for order status, returns and stock. Humans for everything else.",
      },
    ],
  }),
  component: Ask,
});

type Phase = "form" | "sending" | "done";

const EXAMPLES = [
  "Where is my order NS-2026-10482?",
  "How do I return this item?",
  "Do you have the Everyday Sneakers in size 42?",
  "Is the Portable Bluetooth Speaker back in stock?",
];

function Ask() {
  const search = Route.useSearch();
  const { addQuery, orders, automationEnabled, queries } = useStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [queryType, setQueryType] = useState<string>("Auto-detect");
  const [orderNumber, setOrderNumber] = useState(search.order ?? "");
  const [question, setQuestion] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [phase, setPhase] = useState<Phase>("form");
  const [result, setResult] = useState<SupportQuery | null>(null);
  const [showEmail, setShowEmail] = useState(false);

  const validate = () => {
    const next: Record<string, string> = {};
    if (!name.trim()) next["name"] = "Name is required";
    if (!email.trim()) next["email"] = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next["email"] = "Enter a valid email address";
    if (!queryType) next["queryType"] = "Query type is required";
    if (!question.trim()) next["question"] = "Please tell us your question";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setPhase("sending");
    const reference = makeReference();
    const timestamp = new Date().toISOString();

    const payload = {
      name: name.trim(),
      email: email.trim(),
      queryType,
      orderNumber: orderNumber.trim() || undefined,
      question: question.trim(),
      timestamp,
      referenceNumber: reference,
      automationEnabled,
      sessionOrders: orders,
    };

    let logged: SupportQuery | null = null;

    try {
      const res = await fetch("/api/public/customer-query", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as {
        ok: boolean;
        channel: "webhook" | "local-fallback";
        result?: SupportQuery;
        email?: { subject: string; body: string };
        error?: string;
        issues?: { field: string; message: string }[];
      };

      if (!data.ok || !data.result) {
        setErrors(
          Object.fromEntries((data.issues ?? []).map((i) => [i.field, i.message])) as Record<
            string,
            string
          >,
        );
        setPhase("form");
        return;
      }

      logged = {
        ...payload,
        orderNumber: payload.orderNumber,
        queryType: queryType as SupportQuery["queryType"],
        reference,
        timestamp,
        classifiedType: data.result.classifiedType,
        status: data.result.outcome === "escalated" ? "Escalated" : "Answered",
        outcome: data.result.outcome,
        confidence: data.result.confidence,
        response: data.result.response,
        reason: data.result.reason,
        escalationReason: data.result.escalationReason,
        dataChecked: data.result.dataChecked,
        guardrailsApplied: data.result.guardrailsApplied,
        emailSubject: data.email?.subject ?? "Northstar Retail Co. — Response to Your Query",
        emailBody: data.email?.body ?? "",
        channel: data.channel,
      };
    } catch {
      setPhase("form");
      setErrors({ question: "We couldn't reach the support service. Please try again." });
      return;
    }

    addQuery(logged);
    setResult(logged);
    setPhase("done");
  };

  const reset = () => {
    setPhase("form");
    setResult(null);
    setQuestion("");
    setShowEmail(false);
  };

  return (
    <div>
      <section className="hero-gradient text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
            <Bot className="h-3.5 w-3.5" /> Automated support assistant
          </span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-5xl">Ask Northstar</h1>
          <p className="mt-4 max-w-2xl text-primary-foreground/80">
            Have a question about a product, order, delivery, return, refund, or availability? Send
            us a message and we'll help you find the answer.
          </p>
          {!automationEnabled && (
            <p className="mt-5 inline-flex items-center gap-2 rounded-xl bg-destructive/20 px-4 py-2 text-sm">
              <ShieldAlert className="h-4 w-4" /> Automated responses are currently switched off.
              Every query will be answered by a person.
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_380px]">
        <div>
          {phase !== "done" && (
            <form onSubmit={submit} className="surface-card p-6 sm:p-8" noValidate>
              <h2 className="font-display text-xl font-bold">Send us your question</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                We only ask for what we need to answer you: your name, an email to reply to, and
                your question.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="ns-name">Name *</Label>
                  <Input
                    id="ns-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    aria-invalid={Boolean(errors["name"])}
                    className="mt-1.5"
                  />
                  {errors["name"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["name"]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="ns-email">Email *</Label>
                  <Input
                    id="ns-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors["email"])}
                    className="mt-1.5"
                  />
                  {errors["email"] && (
                    <p className="mt-1 text-xs text-destructive">{errors["email"]}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="ns-type">Query Type *</Label>
                  <Select value={queryType} onValueChange={setQueryType}>
                    <SelectTrigger id="ns-type" className="mt-1.5">
                      <SelectValue placeholder="Select a query type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Auto-detect">Auto-detect from my question</SelectItem>
                      {QUERY_TYPES.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="ns-order">Order Number (optional)</Label>
                  <Input
                    id="ns-order"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="NS-2026-10482"
                    className="mt-1.5"
                  />
                </div>
              </div>

              <div className="mt-5">
                <Label htmlFor="ns-question">Your Question *</Label>
                <Textarea
                  id="ns-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="How can we help you?"
                  rows={6}
                  aria-invalid={Boolean(errors["question"])}
                  className="mt-1.5"
                />
                {errors["question"] && (
                  <p className="mt-1 text-xs text-destructive">{errors["question"]}</p>
                )}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setQuestion(ex)}
                    className="rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                  >
                    {ex}
                  </button>
                ))}
              </div>

              <p className="mt-6 rounded-xl bg-secondary p-4 text-xs text-muted-foreground">
                Your email is used only to send you a reply to this query. Replies may be generated
                automatically and are always labelled as such. Uncertain, disputed or payment-related
                cases are routed to a human agent.
              </p>

              <Button type="submit" size="lg" className="mt-6 w-full sm:w-auto" disabled={phase === "sending"}>
                {phase === "sending" ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending your query…
                  </>
                ) : (
                  "Send Query"
                )}
              </Button>
            </form>
          )}

          {phase === "done" && result && (
            <div className="space-y-6">
              <div className="surface-card p-6 sm:p-8">
                <span className="inline-grid h-12 w-12 place-items-center rounded-full bg-success/12 text-success">
                  <CheckCircle2 className="h-6 w-6" />
                </span>
                <h2 className="mt-4 text-2xl font-bold">Query Received ✓</h2>
                <p className="mt-2 text-muted-foreground">
                  Thanks, {result.name}. We've received your question.
                </p>
                <dl className="mt-4 grid gap-2 text-sm">
                  <div className="flex justify-between gap-4 rounded-xl bg-secondary p-3">
                    <dt className="text-muted-foreground">Reference</dt>
                    <dd className="font-display font-bold">{result.reference}</dd>
                  </div>
                  <div className="flex justify-between gap-4 rounded-xl bg-secondary p-3">
                    <dt className="text-muted-foreground">We'll send our response to</dt>
                    <dd className="font-medium">{result.email}</dd>
                  </div>
                  <div className="flex justify-between gap-4 rounded-xl bg-secondary p-3">
                    <dt className="text-muted-foreground">Classified as</dt>
                    <dd className="font-medium">{result.classifiedType}</dd>
                  </div>
                </dl>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Button asChild>
                    <Link to="/shop">Continue Shopping</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link to="/account">View Query Status</Link>
                  </Button>
                  <Button variant="ghost" onClick={reset}>
                    Ask another question
                  </Button>
                </div>
              </div>

              <div
                className={cn(
                  "surface-card p-6 sm:p-8",
                  result.outcome === "escalated" && "border-warning/60",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={cn(
                      "grid h-10 w-10 place-items-center rounded-xl",
                      result.outcome === "escalated"
                        ? "bg-warning/20 text-warning-foreground"
                        : "bg-primary text-accent",
                    )}
                  >
                    {result.outcome === "escalated" ? (
                      <UserRound className="h-5 w-5" />
                    ) : (
                      <Bot className="h-5 w-5" />
                    )}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-bold">
                      {result.outcome === "escalated"
                        ? "Escalated to a human agent"
                        : "Automated response"}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Confidence {(result.confidence * 100).toFixed(0)}% ·{" "}
                      {result.channel === "webhook"
                        ? "processed via n8n workflow"
                        : "processed by the local deflection engine (no webhook configured)"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 whitespace-pre-line rounded-2xl bg-secondary p-5 text-sm leading-relaxed">
                  {result.response.replace(/\*\*/g, "")}
                </div>

                {result.escalationReason && (
                  <p className="mt-4 flex items-start gap-2 rounded-xl bg-warning/12 p-4 text-sm">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />
                    <span>
                      <strong>Why a human is reviewing this:</strong> {result.escalationReason}
                    </span>
                  </p>
                )}

                <Separator className="my-6" />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Data checked
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      {result.dataChecked.length === 0 && (
                        <li className="text-muted-foreground">None — stopped before data lookup</li>
                      )}
                      {result.dataChecked.map((d) => (
                        <li key={d}>• {d}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                      Guardrails applied
                    </h4>
                    <ul className="mt-2 space-y-1 text-sm">
                      {result.guardrailsApplied.map((g) => (
                        <li key={g}>• {g}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setShowEmail((v) => !v)}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  {showEmail ? "Hide simulated email" : "Preview the email we would send"}
                </Button>

                {showEmail && (
                  <div className="mt-4 rounded-2xl border border-border bg-card p-5">
                    <p className="text-xs uppercase tracking-wide text-muted-foreground">Subject</p>
                    <p className="font-semibold">{result.emailSubject}</p>
                    <Separator className="my-3" />
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">
                      {result.emailBody.replace(/\*\*/g, "").replace(/^### /gm, "")}
                    </pre>
                    <p className="mt-4 text-xs text-muted-foreground">
                      In production this email is sent by the configured provider via the n8n
                      workflow. In this prototype it is rendered here instead.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <aside className="space-y-6">
          <div className="surface-card p-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide">
              How your query is handled
            </h2>
            <ol className="mt-4 space-y-3 text-sm">
              {[
                "Your query is validated in the browser and again on the server.",
                "It is classified into a ticket type (or auto-detected).",
                "Only the relevant order, product, inventory or policy data is checked.",
                "A guarded response is generated — never inventing dates or amounts.",
                "Low-confidence, disputed or payment cases are escalated to a person.",
                "The outcome is logged for operational review.",
              ].map((step, i) => (
                <li key={step} className="flex gap-3">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary text-xs font-bold text-accent">
                    {i + 1}
                  </span>
                  <span className="text-muted-foreground">{step}</span>
                </li>
              ))}
            </ol>
            <Link
              to="/governance"
              className="mt-5 inline-flex items-center gap-1 text-sm font-semibold hover:text-accent-foreground"
            >
              Read the governance model <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="surface-card p-6">
            <h2 className="font-display text-sm font-bold uppercase tracking-wide">
              Recent activity
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Anonymised — no customer details are shown here.
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              {queries.slice(0, 4).map((q) => (
                <li key={q.reference} className="flex items-center justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{q.classifiedType}</span>
                    <span className="block text-xs text-muted-foreground">{q.reference}</span>
                  </span>
                  <span
                    className={cn(
                      "shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold",
                      q.outcome === "escalated"
                        ? "bg-warning/18 text-warning-foreground"
                        : "bg-success/12 text-success",
                    )}
                  >
                    {q.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
