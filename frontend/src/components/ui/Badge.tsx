import * as React from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/common/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent bg-app-brand-soft text-app-brand",
        destructive: "border-transparent bg-app-danger text-app-text-inverse",
        outline: "border-app-border text-app-text",
        secondary: "border-transparent bg-app-surface-muted text-app-text-muted",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type TBadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>;

const Badge = ({ className, variant, ...props }: TBadgeProps) => (
  <div className={cn(badgeVariants({ variant }), className)} {...props} />
);

export { Badge };
