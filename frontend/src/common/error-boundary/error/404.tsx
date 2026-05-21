import { Link } from "react-router-dom";

import { SearchX } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const Error404 = () => {
  return (
    <main className="grid min-h-[calc(100vh-64px)] place-items-center bg-app-page px-s py-xl">
      <Card className="max-w-140 p-l text-center">
        <div className="mx-auto mb-s grid size-16 place-items-center rounded-full bg-app-brand-soft text-app-brand">
          <SearchX className="size-8" />
        </div>
        <h1 className="m-0 text-3xl font-extrabold text-app-text">404 Not Found</h1>
        <p className="mt-xs mb-s text-app-text-muted">
          Sorry, the page you visited does not exist.
        </p>
        <Button asChild>
          <Link to="/home">Back Home</Link>
        </Button>
      </Card>
    </main>
  );
};
