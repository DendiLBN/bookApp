import { BarChart3, Layers3, Star } from "lucide-react";

import { Card, CardContent } from "@/components/ui/Card";

import type { TDashboardStat } from "@/features/home-page/types";

type TDashboardStatsProps = {
  dashboardStats: TDashboardStat[];
};

const statIcons = [BarChart3, Layers3, Star];

export const DashboardStats = ({ dashboardStats }: TDashboardStatsProps) => (
  <section aria-label="BookNest overview" className="grid grid-cols-1 gap-s md:grid-cols-3">
    {dashboardStats.map((stat, index) => {
      const StatIcon = statIcons[index] ?? BarChart3;

      return (
        <Card
          className="bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))]"
          key={stat.label}
        >
          <CardContent className="flex items-start justify-between gap-xs p-s">
            <div>
              <span className="block text-3xl leading-none font-extrabold text-app-accent">
                {stat.value}
              </span>
              <h2 className="mt-xs mb-1 text-sm font-bold text-app-text">{stat.label}</h2>
              <p className="m-0 text-app-text-muted">{stat.helper}</p>
            </div>
            <div className="grid size-10 place-items-center rounded-m bg-app-accent-soft text-app-accent">
              <StatIcon className="size-5" />
            </div>
          </CardContent>
        </Card>
      );
    })}
  </section>
);
