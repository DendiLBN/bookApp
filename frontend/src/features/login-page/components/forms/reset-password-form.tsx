import { type FormEvent, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { Loader2, Lock } from "lucide-react";

import "@/assets/layouts-styles/login-styles/change-password-styles/password.css";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/features/auth/consts/password-validation";
import type { TResetPasswordRequestBody } from "@/features/auth/types";
import { useResetPasswordMutation } from "@/store/api/auth";

type TResetPasswordFormValues = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPasswordForm = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { openNotification } = useNotificationContext();
  const [values, setValues] = useState<TResetPasswordFormValues>({
    confirmPassword: "",
    newPassword: "",
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const token = searchParams.get("token");

  const handleSuccess = () => {
    setValues({
      confirmPassword: "",
      newPassword: "",
    });
    openNotification("topRight", "success", "Password reset successfully.", false);
    navigate("/auth/login");
  };

  const handleError = () => {
    openNotification("topRight", "error", "Could not reset password.", false);
  };

  const handleChangeValue = (fieldName: keyof TResetPasswordFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));
    setPasswordMismatch(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!token) {
      openNotification("topRight", "error", "Reset token is missing.", false);
      return;
    }

    if (values.newPassword !== values.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    const data: TResetPasswordRequestBody = {
      token,
      newPassword: values.newPassword,
    };

    resetPassword({
      data,
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  return (
    <div className="password__container">
      <div className="password__container-form">
        <h1 className="password__title">Reset password</h1>
        <p className="password__subtitle">Choose a new password for your account.</p>
        <form className="grid gap-s" onSubmit={handleSubmit}>
          <PasswordField
            label="New password"
            name="newPassword"
            placeholder="Enter new password"
            value={values.newPassword}
            onChange={handleChangeValue}
          />
          <PasswordField
            label="Confirm new password"
            name="confirmPassword"
            placeholder="Repeat new password"
            value={values.confirmPassword}
            onChange={handleChangeValue}
          />
          {passwordMismatch ? (
            <p className="m-0 rounded-m border border-app-danger/30 bg-app-danger/10 px-xs py-2 text-sm font-semibold text-app-danger">
              The two passwords do not match.
            </p>
          ) : null}
          <div className="password__button-wrap">
            <Button className="w-full" disabled={isLoading} type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : null}
              Reset password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;

type TPasswordFieldProps = {
  label: string;
  name: keyof TResetPasswordFormValues;
  placeholder: string;
  value: string;
  onChange: (fieldName: keyof TResetPasswordFormValues, value: string) => void;
};

const PasswordField = ({ label, name, onChange, placeholder, value }: TPasswordFieldProps) => (
  <label className="flex flex-col gap-2">
    <span className="text-sm font-semibold text-app-text">{label}</span>
    <div className="relative">
      <Lock className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
      <Input
        autoComplete="new-password"
        className="h-11 pl-xl"
        maxLength={MAX_PASSWORD_LENGTH}
        minLength={MIN_PASSWORD_LENGTH}
        onChange={(event) => onChange(name, event.target.value)}
        placeholder={placeholder}
        required
        type="password"
        value={value}
      />
    </div>
  </label>
);
