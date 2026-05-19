import { Card, CardContent } from "@/components/ui/Card";

type TDashboardFeedbackProps = {
  isError: boolean;
  isLoading: boolean;
};

export const DashboardFeedback = ({ isError, isLoading }: TDashboardFeedbackProps) => {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-s text-app-text-muted">Loading dashboard data...</CardContent>
      </Card>
    );
  }

  if (isError) {
    return (
      <Card>
        <CardContent className="p-s text-app-danger">
          Dashboard data could not be loaded. Try again in a moment.
        </CardContent>
      </Card>
    );
  }

  return null;
};
