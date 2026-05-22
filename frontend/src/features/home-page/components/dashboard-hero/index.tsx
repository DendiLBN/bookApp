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
        <h1 className="m-0 max-w-210 text-[1.75rem] leading-tight font-extrabold sm:text-[2.2rem] md:text-[3.4rem]">
          Your modern reading commerce dashboard
        </h1>
        <p className="mt-s mb-0 max-w-170 text-base leading-7 text-app-text-muted">
          Browse the catalog, surface strong shelves, follow carts and keep customer actions close
          without jumping between disconnected screens.
        </p>
        <Badge className="mt-5 rounded-m bg-app-surface px-xs py-2 shadow-app-s" variant="outline">
          {catalogStatus}
        </Badge>
      </div>
      <Button
        asChild
        className="shrink-0 border border-app-border bg-app-surface text-app-brand shadow-app-s hover:border-app-accent hover:bg-app-accent-soft hover:text-app-accent"
        variant="outline"
      >
        <Link to="/book">Browse books</Link>
      </Button>
    </CardContent>
  </Card>
);
