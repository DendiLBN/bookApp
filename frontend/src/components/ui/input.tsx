import * as React from "react";

import { cn } from "@/common/utils/cn";

export type TInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, TInputProps>(
  ({ className, type, ...props }, ref) => (
    <input
      className={cn(
        "flex h-10 w-full rounded-m border border-app-border bg-app-surface px-xs py-2 text-sm text-app-text shadow-app-s transition placeholder:text-app-text-muted focus-visible:border-app-brand focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      type={type}
      {...props}
    />
  ),
);
Input.displayName = "Input";

export { Input };
