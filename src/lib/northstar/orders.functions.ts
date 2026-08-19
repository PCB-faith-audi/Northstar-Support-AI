import { createServerFn } from "@tanstack/react-start";

import type { Order } from "./data";

/**
 * Order records are not exposed to the browser (no anon/authenticated SELECT),
 * so they are read server-side over the database GraphQL endpoint using the
 * service key. Falls back to the bundled demo records if the backend is
 * unreachable, so the prototype never dead-ends.
 */
export const getOrders = createServerFn({ method: "GET" }).handler(async (): Promise<Order[]> => {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_SERVICE_ROLE_KEY'];

  const { ORDERS } = await import("./data");
  if (!url || !key) return ORDERS;

  try {
    const { graphqlRequest, ORDERS_QUERY, mapOrder } = await import("./graphql");
    const data = await graphqlRequest<import("./graphql").OrdersQueryData>(
      url,
      key,
      ORDERS_QUERY,
    );
    const orders = data.ordersCollection.edges.map((e) => mapOrder(e.node));
    return orders.length ? orders : ORDERS;
  } catch {
    return ORDERS;
  }
});
