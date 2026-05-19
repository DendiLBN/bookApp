import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

export const HomeInfoCards = () => (
  <section className="grid grid-cols-1 gap-s lg:grid-cols-3">
    <Card>
      <CardHeader>
        <CardTitle>For customers</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="m-0 leading-6 text-app-text-muted">
          Browse featured titles, compare categories, and keep favorite books close.
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>For store owners</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="m-0 leading-6 text-app-text-muted">
          Keep inventory readable, review ratings, and prepare catalog updates quickly.
        </p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Account security</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="m-0 leading-6 text-app-text-muted">
          Refresh your password regularly and avoid reusing the same one.
        </p>
        <Button asChild className="mt-xs" variant="link">
          <Link to="/auth/change-password">Change password</Link>
        </Button>
      </CardContent>
    </Card>
  </section>
);
