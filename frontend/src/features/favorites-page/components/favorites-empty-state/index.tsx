import { Link } from "react-router-dom";

import { BookOpen } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const FavoritesEmptyState = () => (
  <Card className="grid min-h-70 place-items-center p-l text-center">
    <div>
      <div className="mx-auto mb-xs grid size-14 place-items-center rounded-full bg-app-brand-soft text-app-brand">
        <BookOpen className="size-7" />
      </div>
      <h2 className="m-0 text-xl font-extrabold text-app-text">No favorite books yet</h2>
      <p className="mt-2 mb-s text-app-text-muted">
        Save books from the catalog to build your reading shortlist.
      </p>
      <Button asChild>
        <Link to="/book">Browse books</Link>
      </Button>
    </div>
  </Card>
);
