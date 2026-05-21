import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";

import { BookOpen, Loader2, Lock, Mail, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Separator } from "@/components/ui/Separator";
import ForgotPasswordForm from "@/features/login-page/components/forms/forgot-password-form";

import { useLoginUser } from "@/features/login-page/hooks/useLoginUser";

import { useModalContext } from "@/common/contexts/hooks/use-modal-context";

import { AUTH_IMAGE_URLS } from "@/features/auth/consts/auth-images";

export const LoginPage = () => {
  const { isModalVisible, showModal } = useModalContext();
  const { submitLogin, loading } = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberAccount, setRememberAccount] = useState(true);

  const handleShowModal = () => {
    showModal();
  };

  const handleSubmitLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitLogin({ email, password });
  };

  return (
    <main className="grid min-h-[calc(100vh-64px)] place-items-center bg-app-page px-s py-xl sm:px-sm lg:px-l">
      <section className="grid w-full max-w-310 overflow-hidden rounded-l border border-app-border bg-app-surface shadow-app-m lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]">
        <div className="relative hidden min-h-170 overflow-hidden bg-app-surface-muted lg:block">
          <img
            alt="Library reading room"
            className="h-full w-full object-cover"
            src={AUTH_IMAGE_URLS.login}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--color-page)_88%,transparent))]" />
          <div className="absolute right-s bottom-s left-s rounded-l border border-app-border bg-app-surface/88 p-s shadow-app-m backdrop-blur">
            <div className="mb-xs inline-flex items-center gap-2 rounded-full bg-app-brand-soft px-xs py-1 text-xs font-bold text-app-brand">
              <Sparkles className="size-3.5" />
              Reader workspace
            </div>
            <h2 className="m-0 text-2xl leading-tight font-extrabold text-app-text">
              Keep your shelf, cart and favorite books in one quiet place.
            </h2>
          </div>
        </div>

        <Card className="rounded-none border-0 bg-app-surface p-m shadow-none sm:p-l">
          <div className="mb-l">
            <div className="mb-s grid size-12 place-items-center rounded-m bg-app-brand-soft text-app-brand">
              <BookOpen className="size-6" />
            </div>
            <p className="m-0 text-xs font-bold text-app-brand uppercase">Welcome back</p>
            <h1 className="mt-2 mb-0 text-3xl leading-tight font-extrabold text-app-text">
              Sign in to BookNest
            </h1>
            <p className="mt-xs mb-0 max-w-110 text-app-text-muted">
              Continue browsing curated titles, manage favorites and keep your cart ready.
            </p>
          </div>

          <form className="flex flex-col gap-s" onSubmit={handleSubmitLogin}>
            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-app-text">Email</span>
              <div className="relative">
                <Mail className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
                <Input
                  autoComplete="username"
                  className="h-11 pl-xl"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="test@gmail.com"
                  required
                  type="email"
                  value={email}
                />
              </div>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-semibold text-app-text">Password</span>
              <div className="relative">
                <Lock className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
                <Input
                  autoComplete="current-password"
                  className="h-11 pl-xl"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Your password"
                  required
                  type="password"
                  value={password}
                />
              </div>
            </label>

            <div className="flex flex-col gap-xs sm:flex-row sm:items-center sm:justify-between">
              <label className="inline-flex items-center gap-2 text-sm text-app-text-muted">
                <input
                  checked={rememberAccount}
                  className="size-4 accent-(--color-brand)"
                  onChange={(event) => setRememberAccount(event.target.checked)}
                  type="checkbox"
                />
                Remember me
              </label>
              <Button onClick={handleShowModal} type="button" variant="link">
                Forgot password?
              </Button>
            </div>

            <Button className="h-11" disabled={loading} type="submit">
              {loading ? <Loader2 className="animate-spin" /> : null}
              Log in
            </Button>
          </form>

          <Separator className="my-s" />

          <p className="m-0 text-center text-sm text-app-text-muted">
            New to BookNest?{" "}
            <Link
              className="font-bold text-app-brand no-underline hover:underline"
              to="/auth/register"
            >
              Create account
            </Link>
          </p>
        </Card>
      </section>
      <ForgotPasswordForm visible={isModalVisible} />
    </main>
  );
};
export default LoginPage;
