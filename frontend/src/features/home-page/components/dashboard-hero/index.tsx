import { Link } from "react-router-dom";

import { ArrowRight, BookOpenCheck, LibraryBig, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

type TDashboardHeroProps = {
  catalogStatus: string;
};

export const DashboardHero = ({ catalogStatus }: TDashboardHeroProps) => (
  <section className="relative overflow-hidden rounded-l border border-app-border bg-[linear-gradient(135deg,var(--color-surface)_0%,color-mix(in_srgb,var(--color-brand-soft)_50%,var(--color-surface))_52%,color-mix(in_srgb,var(--color-accent-soft)_44%,var(--color-surface))_100%)] p-m text-app-text shadow-app-m lg:p-l">
    <div className="absolute top-0 right-0 hidden h-full w-1/2 bg-[radial-gradient(circle_at_78%_12%,color-mix(in_srgb,var(--color-brand)_16%,transparent),transparent_58%)] lg:block" />
    <div className="relative grid gap-l lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.42fr)] lg:items-end">
      <div className="max-w-190">
        <Badge className="mb-xs gap-2 rounded-m px-xs py-1" variant="default">
          <Sparkles className="size-3.5" />
          BookNest dashboard
        </Badge>
        <h1 className="m-0 text-[2rem] leading-tight font-extrabold md:text-[3rem]">
          Run your bookstore from one calm workspace
        </h1>
        <p className="mt-s mb-0 max-w-170 text-base leading-7 text-app-text-muted">
          Track catalog activity, surface strong shelves and keep customer actions close without
          jumping between disconnected screens.
        </p>
        <div className="mt-s flex flex-wrap items-center gap-xs">
          <Button asChild>
            <Link to="/book">
              Browse books
              <ArrowRight />
            </Link>
          </Button>
          <Badge className="rounded-m bg-app-surface px-xs py-2 shadow-app-s" variant="outline">
            {catalogStatus}
          </Badge>
        </div>
      </div>

      <Card className="grid gap-xs bg-app-surface/90 p-s shadow-app-m backdrop-blur">
        <div className="flex items-center justify-between gap-xs">
          <div>
            <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Today focus</p>
            <h2 className="mt-1 mb-0 text-xl font-extrabold text-app-text">Catalog flow</h2>
          </div>
          <LibraryBig className="size-7 text-app-brand" />
        </div>
        <div className="rounded-m border border-app-border bg-app-surface-muted p-xs">
          <BookOpenCheck className="mb-2 size-5 text-app-accent" />
          <p className="m-0 text-sm leading-6 text-app-text-muted">
            Review titles, categories and quick customer paths before shipping new inventory work.
          </p>
        </div>
      </Card>
    </div>
  </section>
);
