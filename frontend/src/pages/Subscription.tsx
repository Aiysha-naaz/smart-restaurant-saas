import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free Plan",
    price: "₹0",
    period: "/month",
    description: "Perfect for small restaurants getting started.",
    features: ["Basic Dashboard", "Manual Inventory", "Basic Order Tracking", "Up to 10 Tables", "Email Support"],
    cta: "Current Plan",
    active: true,
    highlighted: false,
  },
  {
    name: "Premium Plan",
    price: "₹100",
    period: "/month",
    description: "Everything you need to run a smart restaurant.",
    features: [
      "AI Insights & Recommendations",
      "Advanced Analytics",
      "Smart Inventory Alerts",
      "Unlimited Tables",
      "QR Code Ordering",
      "Multi-Restaurant Support",
      "Priority Support",
      "Custom Reports",
    ],
    cta: "Upgrade to Premium",
    active: false,
    highlighted: true,
  },
];

export default function Subscription() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Subscription</h1>
        <p className="text-sm text-muted-foreground mt-1">Choose the plan that fits your restaurant.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "rounded-xl border bg-card p-6 flex flex-col",
              plan.highlighted ? "border-primary shadow-sm ring-1 ring-primary/20" : "border-border"
            )}
          >
            {plan.highlighted && (
              <span className="inline-flex self-start rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary mb-3">
                Recommended
              </span>
            )}
            <h3 className="text-lg font-semibold">{plan.name}</h3>
            <div className="mt-2 flex items-baseline gap-1">
              <span className="text-3xl font-semibold">{plan.price}</span>
              <span className="text-sm text-muted-foreground">{plan.period}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>

            <ul className="mt-6 space-y-3 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm">
                  <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <button
              className={cn(
                "mt-6 w-full rounded-lg py-2.5 text-sm font-medium transition-colors",
                plan.highlighted
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "border border-border bg-muted text-muted-foreground cursor-default"
              )}
              disabled={plan.active}
            >
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
