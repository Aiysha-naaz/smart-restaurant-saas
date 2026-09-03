import { cn } from "@/lib/utils";

export type BadgeVariant = "preparing" | "ready" | "served" | "healthy" | "low" | "out" | "available" | "occupied" | "cleaning" | "default";

const variantStyles: Record<BadgeVariant, string> = {
  preparing: "bg-warning/10 text-warning",
  ready: "bg-primary/10 text-primary",
  served: "bg-success/10 text-success",
  healthy: "bg-success/10 text-success",
  low: "bg-warning/10 text-warning",
  out: "bg-destructive/10 text-destructive",
  available: "bg-success/10 text-success",
  occupied: "bg-primary/10 text-primary",
  cleaning: "bg-warning/10 text-warning",
  default: "bg-muted text-muted-foreground",
};

interface StatusBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

export function StatusBadge({ variant, children }: StatusBadgeProps) {
  return (
    <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium", variantStyles[variant])}>
      {children}
    </span>
  );
}
