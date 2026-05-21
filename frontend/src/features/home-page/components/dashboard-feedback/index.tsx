import { AlertCircle, Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/Card";

type TDashboardFeedbackProps = {
  isError: boolean;
  isLoading: boolean;
};

export const DashboardFeedback = ({ isError, isLoading }: TDashboardFeedbackProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center gap-2 p-s text-app-text-muted">
          <Loader2 className="size-4 animate-spin text-app-brand" />
          Loading dashboard data...
        </CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="flex items-center gap-2 p-s text-app-danger">
          <AlertCircle className="size-4" />
          Dashboard data could not be loaded. Try again in a moment.
        </CardContent>
      </Card>
    );
  }

  return null;
};
