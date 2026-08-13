import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { buildEmail, runDeflection } from "@/lib/northstar/deflection";

/**
 * POST /api/public/customer-query
 *
 * Single integration seam for the support workflow. If N8N_WEBHOOK_URL is set the
 * payload is forwarded to n8n (Webhook -> classify -> lookup -> respond -> log) and
 * its result is returned. Without it, or if the webhook fails, the request falls
 * back to the local deterministic deflection engine so the experience never breaks.
 *
 * Public by design (an unauthenticated customer must be able to ask a question):
 * input is strictly validated, no privileged data is read, and nothing is written
 * to a datastore from this endpoint.
 */

const orderSchema = z.object({
  id: z.string(),
  customerName: z.string(),
  email: z.string(),
  placedAt: z.string(),
  status: z.string(),
  estimatedDelivery: z.string(),
  carrier: z.string(),
  trackingRef: z.string(),
  items: z.array(
    z.object({ productId: z.string(), name: z.string(), qty: z.number(), price: z.number() }),
  ),
  total: z.number(),
  deliveryMethod: z.string(),
  returnWindowDays: z.number(),
  refundStatus: z.string(),
});

const bodySchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Enter a valid email address"),
  queryType: z.string().min(1, "Query type is required"),
  orderNumber: z.string().max(40).optional(),
  question: z.string().min(1, "Please tell us your question").max(2000),
  timestamp: z.string().optional(),
  referenceNumber: z.string().optional(),
  automationEnabled: z.boolean().optional(),
  sessionOrders: z.array(orderSchema).optional(),
});

export const Route = createFileRoute("/api/public/customer-query")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return Response.json({ ok: false, error: "Invalid JSON body" }, { status: 400 });
        }

        const parsed = bodySchema.safeParse(raw);
        if (!parsed.success) {
          return Response.json(
            {
              ok: false,
              error: "Validation failed",
              issues: parsed.error.issues.map((i) => ({
                field: String(i.path[0] ?? "form"),
                message: i.message,
              })),
            },
            { status: 400 },
          );
        }

        const body = parsed.data;
        const reference = body.referenceNumber ?? `NS-Q-${Math.floor(100000 + Math.random() * 899999)}`;

        const webhookUrl = process.env["N8N_WEBHOOK_URL"];
        if (webhookUrl) {
          try {
            const res = await fetch(webhookUrl, {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ ...body, referenceNumber: reference }),
            });
            if (res.ok) {
              const data = (await res.json()) as {
                result?: unknown;
                email?: { subject: string; body: string };
              };
              if (data.result) {
                return Response.json({
                  ok: true,
                  channel: "webhook",
                  reference,
                  result: data.result,
                  email: data.email,
                });
              }
            }
            console.error("n8n webhook returned an unusable response", res.status);
          } catch (error) {
            console.error("n8n webhook unreachable, using local fallback", error);
          }
        }

        const result = runDeflection({
          name: body.name,
          email: body.email,
          queryType: body.queryType,
          orderNumber: body.orderNumber,
          question: body.question,
          automationEnabled: body.automationEnabled ?? true,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          sessionOrders: (body.sessionOrders ?? []) as any,
        });

        const email = buildEmail({ ...body, reference }, result);

        return Response.json({
          ok: true,
          channel: "local-fallback",
          reference,
          result,
          email,
        });
      },
    },
  },
});
