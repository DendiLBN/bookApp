import { type FormEvent, useState } from "react";

import { Loader2, Lock, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/features/auth/consts/password-validation";
import type { TRegisterFormValues } from "@/features/register-page/types";

type TRegisterFormProps = {
  loading: boolean;
  onFinish: (values: TRegisterFormValues) => void;
};

const initialRegisterFormValues: TRegisterFormValues = {
  confirmPassword: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};

export const RegisterForm = ({ loading, onFinish }: TRegisterFormProps) => {
  const [values, setValues] = useState<TRegisterFormValues>(initialRegisterFormValues);
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleChangeValue = (fieldName: keyof TRegisterFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));

    if (fieldName === "password" || fieldName === "confirmPassword") {
      setPasswordMismatch(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.password !== values.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    onFinish(values);
  };

  return (
    <form className="grid gap-s" onSubmit={handleSubmit}>
      <label className="flex flex-col gap-2">
        <span className="text-sm font-semibold text-app-text">Email</span>
        <div className="relative">
          <Mail className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
          <Input
            autoComplete="username"
            className="h-11 pl-xl"
            onChange={(event) => handleChangeValue("email", event.target.value)}
            placeholder="you@example.com"
            required
            type="email"
            value={values.email}
          />
        </div>
      </label>

      <div className="grid gap-xs sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-app-text">First name</span>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
            <Input
              className="h-11 pl-xl"
              minLength={2}
              onChange={(event) => handleChangeValue("firstName", event.target.value)}
              placeholder="Name"
              required
              value={values.firstName}
            />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-app-text">Last name</span>
          <div className="relative">
            <User className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
            <Input
              className="h-11 pl-xl"
              minLength={2}
              onChange={(event) => handleChangeValue("lastName", event.target.value)}
              placeholder="Last name"
              required
              value={values.lastName}
            />
          </div>
        </label>
      </div>

      <div className="grid gap-xs sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-app-text">Password</span>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
            <Input
              autoComplete="new-password"
              className="h-11 pl-xl"
              maxLength={MAX_PASSWORD_LENGTH}
              minLength={MIN_PASSWORD_LENGTH}
              onChange={(event) => handleChangeValue("password", event.target.value)}
              placeholder="Min. 8 characters"
              required
              type="password"
              value={values.password}
            />
          </div>
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-semibold text-app-text">Confirm password</span>
          <div className="relative">
            <Lock className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
            <Input
              autoComplete="new-password"
              className="h-11 pl-xl"
              maxLength={MAX_PASSWORD_LENGTH}
              minLength={MIN_PASSWORD_LENGTH}
              onChange={(event) => handleChangeValue("confirmPassword", event.target.value)}
              placeholder="Repeat password"
              required
              type="password"
              value={values.confirmPassword}
            />
          </div>
        </label>
      </div>

      {passwordMismatch ? (
        <p className="m-0 rounded-m border border-app-danger/30 bg-app-danger/10 px-xs py-2 text-sm font-semibold text-app-danger">
          Passwords do not match.
        </p>
      ) : null}

      <Button className="h-11" disabled={loading} type="submit">
        {loading ? <Loader2 className="animate-spin" /> : null}
        Create account
      </Button>
    </form>
  );
};
