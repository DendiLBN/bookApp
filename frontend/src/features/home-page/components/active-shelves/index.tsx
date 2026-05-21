import { Tags } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Separator } from "@/components/ui/Separator";

import type { TActiveShelvesProps } from "@/features/home-page/types";

export const ActiveShelves = ({ categories }: TActiveShelvesProps) => (
  <Card>
    <CardHeader className="flex-row items-start justify-between gap-xs p-4.5 pb-s">
      <div>
        <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Categories</p>
        <CardTitle className="mt-1">Active shelves</CardTitle>
      </div>
      <Tags className="size-5 text-app-accent" />
    </CardHeader>
    <CardContent className="flex flex-col gap-xs p-4.5 pt-0">
      {categories.length > 0 ? (
        categories.map(([category, count]) => (
          <div className="flex flex-col gap-xs" key={category}>
            <div className="flex items-center justify-between gap-xs">
              <span className="text-app-text">{category}</span>
              <Badge>{count}</Badge>
            </div>
            <Separator />
          </div>
        ))
      ) : (
        <p className="m-0 text-app-text-muted">Categories will appear after books load.</p>
      )}
    </CardContent>
  </Card>
);
