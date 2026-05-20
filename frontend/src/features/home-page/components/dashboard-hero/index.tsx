import { Link } from "react-router-dom";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

type TDashboardHeroProps = {
  catalogStatus: string;
};

export const DashboardHero = ({ catalogStatus }: TDashboardHeroProps) => (
  <Card className="relative overflow-hidden bg-[linear-gradient(135deg,var(--color-surface),color-mix(in_srgb,var(--color-brand-soft)_72%,var(--color-surface)),color-mix(in_srgb,var(--color-accent-soft)_62%,var(--color-surface)))] shadow-app-m">
    <div className="absolute top-0 right-0 hidden h-full w-1/3 bg-[radial-gradient(circle_at_top_right,color-mix(in_srgb,var(--color-brand)_14%,transparent),transparent_68%)] lg:block" />
    <CardContent className="relative flex flex-col items-start justify-between gap-6 p-m lg:flex-row lg:items-center lg:p-l">
      <div>
        <p className="mb-xs font-semibold tracking-normal text-app-brand uppercase">
          BookNest dashboard
        </p>
        <h1 className="m-0 text-[1.55rem] leading-tight font-bold md:text-[2.1rem]">
          Your BookNest command center
        </h1>
        <p className="mt-3 max-w-190 text-base text-app-text-muted">
          Track catalog activity, review featured shelves, and keep the store ready for readers.
        </p>
        <Badge className="mt-5" variant="outline">
          {catalogStatus}
        </Badge>
      </div>
      <Button asChild className="shrink-0" variant="outline">
        <Link to="/book">Browse books</Link>
      </Button>
    </CardContent>
  </Card>
);
