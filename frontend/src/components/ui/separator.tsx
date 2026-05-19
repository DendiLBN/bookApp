import * as React from "react";

import { cn } from "@/common/utils/cn";

type TSeparatorProps = React.HTMLAttributes<HTMLDivElement> & {
  orientation?: "horizontal" | "vertical";
};

const Separator = React.forwardRef<HTMLDivElement, TSeparatorProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      className={cn(
        "shrink-0 bg-app-border",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className,
      )}
      ref={ref}
      role="separator"
      {...props}
    />
  ),
);
Separator.displayName = "Separator";

export { Separator };
