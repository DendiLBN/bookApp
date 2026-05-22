import { Link } from "react-router-dom";

import { BookOpen, Boxes, PlusCircle, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import useUser from "@/common/users/useUser";

const quickActions = [
  {
    icon: BookOpen,
    label: "Manage catalog",
    to: "/book",
  },
  {
    adminOnly: true,
    icon: PlusCircle,
    label: "Prepare new title",
    to: "/book",
  },
  {
    adminOnly: true,
    icon: ShoppingCart,
    label: "Review baskets",
    to: "/admin/orders",
  },
];

export const QuickActions = () => <QuickActionsContent />;

const QuickActionsContent = () => {
  const { user } = useUser();
  const visibleQuickActions = quickActions.filter(
    (action) => !action.adminOnly || user?.role === "admin",
  );

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex-row items-start justify-between gap-xs border-b border-app-border bg-app-surface-muted p-4.5 pb-s">
        <div>
          <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Inventory</p>
          <CardTitle className="mt-1">Quick actions</CardTitle>
        </div>
        <Boxes className="size-5 text-app-accent" />
      </CardHeader>
      <CardContent className="flex flex-col gap-xs p-4.5">
        {visibleQuickActions.map((action) => (
          <Button asChild className="justify-start" key={action.label} variant="secondary">
            <Link to={action.to}>
              <action.icon />
              {action.label}
            </Link>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
};
