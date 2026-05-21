import { Link } from "react-router-dom";

import { Crown, HeartHandshake, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

const homeInfoCards = [
  {
    description: "Browse featured titles, compare categories, and keep favorite books close.",
    icon: HeartHandshake,
    title: "For customers",
  },
  {
    description: "Keep inventory readable, review ratings, and prepare catalog updates quickly.",
    icon: Crown,
    title: "For store owners",
  },
  {
    description: "Refresh your password regularly and avoid reusing the same one.",
    icon: ShieldCheck,
    title: "Account security",
  },
];

export const HomeInfoCards = () => (
  <section className="grid grid-cols-1 gap-s lg:grid-cols-3">
    {homeInfoCards.map((card) => (
      <Card className="transition hover:-translate-y-0.5 hover:shadow-app-m" key={card.title}>
        <CardHeader className="gap-xs">
          <div className="grid size-10 place-items-center rounded-m bg-app-brand-soft text-app-brand">
            <card.icon className="size-5" />
          </div>
          <CardTitle>{card.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="m-0 leading-6 text-app-text-muted">{card.description}</p>
          {card.title === "Account security" ? (
            <Button asChild className="mt-xs" variant="link">
              <Link to="/auth/change-password">Change password</Link>
            </Button>
          ) : null}
        </CardContent>
      </Card>
    ))}
  </section>
);
