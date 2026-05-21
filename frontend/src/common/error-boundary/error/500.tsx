import { Link } from "react-router-dom";

import { AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export const Error500 = () => {
  return (
    <main className="grid min-h-[calc(100vh-72px)] place-items-center px-s py-xl">
      <Card className="max-w-140 p-l text-center">
        <div className="mx-auto mb-s grid size-16 place-items-center rounded-full bg-app-danger/10 text-app-danger">
          <AlertTriangle className="size-8" />
        </div>
        <h1 className="m-0 text-3xl font-extrabold text-app-text">500</h1>
        <p className="mt-xs mb-s text-app-text-muted">Sorry, something went wrong.</p>
        <Button asChild>
          <Link to="/home">Back Home</Link>
        </Button>
      </Card>
    </main>
  );
};
