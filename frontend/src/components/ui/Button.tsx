import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/common/utils/cn";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-m text-sm font-semibold transition duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,var(--color-brand),var(--color-brand-strong))] text-app-text-inverse shadow-app-s hover:-translate-y-0.5 hover:shadow-app-m focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-brand",
        destructive:
          "bg-app-danger text-app-text-inverse shadow-app-s hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-app-danger",
        ghost: "text-app-text hover:bg-app-surface-muted hover:text-app-brand",
        link: "h-auto p-0 text-app-accent underline-offset-4 hover:underline",
        outline:
          "border border-app-border bg-app-surface/90 text-app-text shadow-app-s hover:-translate-y-0.5 hover:border-app-brand hover:bg-app-brand-soft hover:text-app-brand",
        secondary:
          "bg-app-surface-muted text-app-text shadow-app-s hover:-translate-y-0.5 hover:bg-app-brand-soft hover:text-app-brand",
      },
      size: {
        default: "h-10 px-s py-2",
        icon: "size-10",
        lg: "h-11 px-sm",
        sm: "h-9 rounded-s px-xs",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  },
);

export type TButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, TButtonProps>(
  ({ asChild = false, className, size, variant, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp className={cn(buttonVariants({ className, size, variant }))} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export { Button };
