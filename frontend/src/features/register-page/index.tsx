import { BookMarked, ShieldCheck, Sparkles } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { RegisterForm } from "@/features/register-page/components/register-form";

import { useRegistrationUser } from "@/features/register-page/hooks/useRegistrationUser";

import { AUTH_IMAGE_URLS } from "@/features/auth/consts/auth-images";
import type { TRegisterUserRequestBody } from "@/features/auth/types";
import type { TRegisterFormValues } from "@/features/register-page/types";

export const RegisterPage = () => {
  const registrationUser = useRegistrationUser();

  if (!registrationUser) {
    return null;
  }

  const { loading, submitRegistration } = registrationUser;

  const handleSubmitRegister = ({ email, firstName, lastName, password }: TRegisterFormValues) => {
    const requestBody: TRegisterUserRequestBody = {
      email,
      firstName,
      lastName,
      password,
    };

    submitRegistration(requestBody);
  };

  return (
    <main className="grid min-h-[calc(100vh-72px)] place-items-center px-s py-xl sm:px-sm lg:px-l">
      <section className="grid w-full max-w-320 overflow-hidden rounded-l border border-app-border bg-app-surface shadow-app-m lg:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)]">
        <Card className="rounded-none border-0 bg-app-surface p-m shadow-none sm:p-l">
          <div className="mb-l">
            <div className="mb-s grid size-12 place-items-center rounded-m bg-app-accent-soft text-app-accent">
              <BookMarked className="size-6" />
            </div>
            <p className="m-0 text-xs font-bold text-app-accent uppercase">Join BookNest</p>
            <h1 className="mt-2 mb-0 text-3xl leading-tight font-extrabold text-app-text">
              Build your reading account
            </h1>
            <p className="mt-xs mb-0 max-w-115 text-app-text-muted">
              Create a profile for favorites, carts and a cleaner bookstore experience.
            </p>
          </div>
          <RegisterForm loading={loading} onFinish={handleSubmitRegister} />
        </Card>

        <div className="relative hidden min-h-190 overflow-hidden bg-app-surface-muted lg:block">
          <img
            alt="Books on a shelf"
            className="h-full w-full object-cover"
            src={AUTH_IMAGE_URLS.register}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--color-page)_86%,transparent))]" />
          <div className="absolute right-s bottom-s left-s rounded-l border border-app-border bg-app-surface/88 p-s shadow-app-m backdrop-blur">
            <div className="mb-xs inline-flex items-center gap-2 rounded-full bg-app-accent-soft px-xs py-1 text-xs font-bold text-app-accent">
              <Sparkles className="size-3.5" />
              Curated shelves
            </div>
            <h2 className="m-0 text-2xl leading-tight font-extrabold text-app-text">
              Start with a secure account and keep your library decisions saved.
            </h2>
            <div className="mt-xs flex items-center gap-2 text-sm font-semibold text-app-text-muted">
              <ShieldCheck className="size-4 text-app-brand" />
              Secure authentication and protected account actions.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default RegisterPage;
