import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { CreditCard, Landmark, Lock, Wallet } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { formatPrice, type Order } from "@/lib/northstar/data";
import { makeOrderId } from "@/lib/northstar/deflection";
import { useStore } from "@/lib/northstar/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Northstar Retail Co." },
      {
        name: "description",
        content: "Complete your Northstar order with mock delivery and payment options.",
      },
      { property: "og:title", content: "Checkout — Northstar Retail Co." },
      { property: "og:description", content: "Prototype checkout — no real payments are processed." },
    ],
  }),
  component: Checkout,
});

interface Errors {
  [key: string]: string | undefined;
}

function Checkout() {
  const { cartLines, subtotal, clearCart, addOrder, hydrated } = useStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [delivery, setDelivery] = useState<"Standard Delivery" | "Express Delivery">(
    "Standard Delivery",
  );
  const [payment, setPayment] = useState("card");
  const [errors, setErrors] = useState<Errors>({});
  const [placing, setPlacing] = useState(false);

  const deliveryFee = delivery === "Express Delivery" ? 149 : subtotal >= 1000 ? 0 : 79;
  const total = subtotal + deliveryFee;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: Errors = {};
    if (!form.fullName.trim()) next["fullName"] = "Full name is required";
    if (!form.email.trim()) next["email"] = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next["email"] = "Enter a valid email";
    if (!form.phone.trim()) next["phone"] = "Phone is required";
    if (!form.address.trim()) next["address"] = "Address is required";
    if (!form.city.trim()) next["city"] = "City is required";
    if (!form.province.trim()) next["province"] = "Province / region is required";
    if (!form.postalCode.trim()) next["postalCode"] = "Postal code is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = async () => {
    if (cartLines.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    if (!validate()) {
      toast.error("Please fix the highlighted fields");
      return;
    }
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 900));

    const id = makeOrderId();
    const order: Order = {
      id,
      customerName: form.fullName,
      email: form.email,
      placedAt: new Date().toISOString().slice(0, 10),
      status: "Processing",
      estimatedDelivery:
        delivery === "Express Delivery" ? "1–2 business days" : "3–5 business days",
      carrier: "Northstar Express",
      trackingRef: `NSX${Math.floor(100000000 + Math.random() * 899999999)}`,
      items: cartLines.map((l) => ({
        productId: l.product.id,
        name: l.product.name,
        qty: l.qty,
        price: l.product.price,
      })),
      total,
      deliveryMethod: delivery,
      returnWindowDays: 30,
      refundStatus: "Not requested",
    };

    addOrder(order);
    clearCart();
    setPlacing(false);
    void navigate({ to: "/order-confirmed/$orderId", params: { orderId: id } });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Checkout</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Prototype checkout — no real payment is processed and no card data is stored.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-6">
          <section className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold">Customer information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field
                id="fullName"
                label="Full Name"
                value={form.fullName}
                onChange={set("fullName")}
                error={errors["fullName"]}
                placeholder="Alex Johnson"
              />
              <Field
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={set("email")}
                error={errors["email"]}
                placeholder="you@example.com"
              />
              <Field
                id="phone"
                label="Phone"
                value={form.phone}
                onChange={set("phone")}
                error={errors["phone"]}
                placeholder="+27 82 000 0000"
              />
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold">Delivery address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  id="address"
                  label="Address"
                  value={form.address}
                  onChange={set("address")}
                  error={errors["address"]}
                  placeholder="24 Marine Drive, Apt 5"
                />
              </div>
              <Field
                id="city"
                label="City"
                value={form.city}
                onChange={set("city")}
                error={errors["city"]}
                placeholder="Cape Town"
              />
              <Field
                id="province"
                label="Province / Region"
                value={form.province}
                onChange={set("province")}
                error={errors["province"]}
                placeholder="Western Cape"
              />
              <Field
                id="postalCode"
                label="Postal Code"
                value={form.postalCode}
                onChange={set("postalCode")}
                error={errors["postalCode"]}
                placeholder="8001"
              />
            </div>
          </section>

          <section className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold">Delivery method</h2>
            <RadioGroup
              value={delivery}
              onValueChange={(v) => setDelivery(v as typeof delivery)}
              className="mt-4 grid gap-3 sm:grid-cols-2"
            >
              {[
                { value: "Standard Delivery", desc: "3–5 business days", price: subtotal >= 1000 ? "Free" : "R79" },
                { value: "Express Delivery", desc: "1–2 business days", price: "R149" },
              ].map((opt) => (
                <label
                  key={opt.value}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-xl border p-4",
                    delivery === opt.value ? "border-accent bg-accent/10" : "border-border",
                  )}
                >
                  <RadioGroupItem value={opt.value} className="mt-1" />
                  <span>
                    <span className="block text-sm font-semibold">{opt.value}</span>
                    <span className="block text-xs text-muted-foreground">{opt.desc}</span>
                    <span className="mt-1 block text-sm font-bold">{opt.price}</span>
                  </span>
                </label>
              ))}
            </RadioGroup>
          </section>

          <section className="surface-card p-6">
            <h2 className="font-display text-lg font-semibold">Payment</h2>
            <RadioGroup
              value={payment}
              onValueChange={setPayment}
              className="mt-4 grid gap-3 sm:grid-cols-3"
            >
              {[
                { value: "card", label: "Credit/Debit Card", Icon: CreditCard },
                { value: "eft", label: "EFT / Bank Transfer", Icon: Landmark },
                { value: "wallet", label: "Digital Wallet", Icon: Wallet },
              ].map(({ value, label, Icon }) => (
                <label
                  key={value}
                  className={cn(
                    "flex cursor-pointer items-center gap-3 rounded-xl border p-4",
                    payment === value ? "border-accent bg-accent/10" : "border-border",
                  )}
                >
                  <RadioGroupItem value={value} />
                  <Icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{label}</span>
                </label>
              ))}
            </RadioGroup>
            <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="h-3.5 w-3.5" /> Mock payment options only. No card details are
              requested, transmitted or stored in this prototype.
            </p>
          </section>
        </div>

        <aside className="surface-card h-fit p-6 lg:sticky lg:top-24">
          <h2 className="font-display text-lg font-semibold">Your order</h2>
          <div className="mt-4 space-y-3">
            {hydrated && cartLines.length === 0 && (
              <p className="text-sm text-muted-foreground">
                Your cart is empty.{" "}
                <Link to="/shop" className="font-semibold underline">
                  Add something first
                </Link>
                .
              </p>
            )}
            {cartLines.map((l) => (
              <div
                key={`${l.product.id}-${l.variant ?? "d"}`}
                className="flex justify-between gap-3 text-sm"
              >
                <span className="text-muted-foreground">
                  {l.qty} × {l.product.name}
                </span>
                <span className="font-medium">{formatPrice(l.product.price * l.qty)}</span>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Delivery</dt>
              <dd>{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</dd>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between text-base">
              <dt className="font-semibold">Total</dt>
              <dd className="font-display font-extrabold">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Button size="lg" className="mt-6 w-full" onClick={placeOrder} disabled={placing}>
            {placing ? "Placing your order…" : "Place Order"}
          </Button>
          <Button asChild variant="outline" className="mt-3 w-full">
            <Link to="/cart">Back to cart</Link>
          </Button>
        </aside>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string | undefined;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        aria-invalid={Boolean(error)}
        className="mt-1.5"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}
