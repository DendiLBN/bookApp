import { Card, CardContent } from "@/components/ui/card";

import type { TDashboardStat } from "@/features/home-page/types";

type TDashboardStatsProps = {
  dashboardStats: TDashboardStat[];
};

export const DashboardStats = ({ dashboardStats }: TDashboardStatsProps) => (
  <section aria-label="BookNest overview" className="grid grid-cols-1 gap-s md:grid-cols-3">
    {dashboardStats.map((stat) => (
      <Card
        className="bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))]"
        key={stat.label}
      >
        <CardContent className="p-s">
          <span className="block text-3xl leading-none font-extrabold text-app-accent">
            {stat.value}
          </span>
          <h2 className="mt-xs mb-1 text-sm font-bold text-app-text">{stat.label}</h2>
          <p className="m-0 text-app-text-muted">{stat.helper}</p>
        </CardContent>
      </Card>
    ))}
  </section>
);
