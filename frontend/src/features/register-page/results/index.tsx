import { useLocation, useNavigate } from "react-router-dom";

import { CheckCircle2, Info } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import type { TRegistrationSuccessState } from "@/features/register-page/types";

export const OnSuccessRegister = () => {
  const navigate = useNavigate();

  const location = useLocation();

  const registrationState = location.state as TRegistrationSuccessState | null;

  if (!registrationState) {
    return (
      <RegistrationResult
        description="You can now log in with your account."
        icon="info"
        title="Registration completed"
        onLoginRedirect={() => navigate("/auth/login", { replace: true })}
      />
    );
  }

  const { firstName, email } = registrationState;

  const handleLoginRedirect = () => {
    navigate("/auth/login", { replace: true });
  };

  return (
    <RegistrationResult
      description={`Welcome ${firstName}! You can now log in.`}
      icon="success"
      title={`Your account has been created successfully! This is your email: ${email}`}
      onLoginRedirect={handleLoginRedirect}
    />
  );
};

export default OnSuccessRegister;

type TRegistrationResultProps = {
  description: string;
  icon: "info" | "success";
  title: string;
  onLoginRedirect: () => void;
};

const RegistrationResult = ({
  description,
  icon,
  onLoginRedirect,
  title,
}: TRegistrationResultProps) => {
  const Icon = icon === "success" ? CheckCircle2 : Info;

  return (
    <main className="grid min-h-[calc(100vh-72px)] place-items-center px-s py-xl">
      <Card className="max-w-150 p-l text-center">
        <div className="mx-auto mb-s grid size-16 place-items-center rounded-full bg-app-brand-soft text-app-brand">
          <Icon className="size-8" />
        </div>
        <h1 className="m-0 text-2xl font-extrabold text-app-text">{title}</h1>
        <p className="mt-xs mb-s text-app-text-muted">{description}</p>
        <Button onClick={onLoginRedirect} type="button">
          Go to login page
        </Button>
      </Card>
    </main>
  );
};
