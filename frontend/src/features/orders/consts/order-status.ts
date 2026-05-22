export const ORDER_STATUS_LABELS = {
  cancelled: "Cancelled",
  completed: "Completed",
  paid: "Paid",
  pending: "Pending",
} as const;

export const ORDER_STATUS_BADGE_CLASSES = {
  cancelled: "border-app-danger/30 bg-app-danger/10 text-app-danger",
  completed: "border-app-brand/30 bg-app-brand-soft text-app-brand",
  paid: "border-app-accent/30 bg-app-accent-soft text-app-accent",
  pending: "border-app-warning/30 bg-app-warning/10 text-app-warning",
} as const;
