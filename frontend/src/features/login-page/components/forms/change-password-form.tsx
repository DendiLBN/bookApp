import { type FormEvent, useState } from "react";

import { Loader2, Lock } from "lucide-react";

import "@/assets/layouts-styles/login-styles/change-password-styles/password.css";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import {
  MAX_PASSWORD_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "@/features/auth/consts/password-validation";
import type { TChangePasswordRequestBody } from "@/features/auth/types";
import { useChangePasswordMutation } from "@/store/api/auth";

type TChangePasswordFormProps = {
  embedded?: boolean;
};

type TChangePasswordFormValues = TChangePasswordRequestBody & {
  confirmPassword: string;
};

const ChangePasswordForm = ({ embedded = false }: TChangePasswordFormProps) => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();
  const { openNotification } = useNotificationContext();
  const [values, setValues] = useState<TChangePasswordFormValues>({
    confirmPassword: "",
    newPassword: "",
    oldPassword: "",
  });
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSuccess = () => {
    setValues({
      confirmPassword: "",
      newPassword: "",
      oldPassword: "",
    });
    openNotification("topRight", "success", "Password changed successfully.", false);
  };

  const handleError = () => {
    openNotification("topRight", "error", "Could not change password.", false);
  };

  const handleChangeValue = (fieldName: keyof TChangePasswordFormValues, value: string) => {
    setValues((currentValues) => ({
      ...currentValues,
      [fieldName]: value,
    }));
    setPasswordMismatch(false);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (values.newPassword !== values.confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    changePassword({
      data: {
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      },
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  const formContent = (
    <>
      {embedded ? (
        <h2 className="mt-0 mb-xs text-lg font-bold text-app-text">Change password</h2>
      ) : (
        <h1 className="password__title">Change password</h1>
      )}
      <p className={embedded ? "mt-0 text-app-text-muted" : "password__subtitle"}>
        Use at least 8 characters and confirm your new password below.
      </p>
      <form className="grid gap-s" onSubmit={handleSubmit}>
        <PasswordField
          label="Old password"
          name="oldPassword"
          placeholder="Enter old password"
          value={values.oldPassword}
          onChange={handleChangeValue}
        />
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
        <div className={embedded ? "mb-0" : "password__button-wrap"}>
          <Button className="w-full" disabled={isLoading} type="submit">
            {isLoading ? <Loader2 className="animate-spin" /> : null}
            Save new password
          </Button>
        </div>
      </form>
    </>
  );

  return embedded ? (
    formContent
  ) : (
    <div className="password__container">
      <div className="password__container-form">{formContent}</div>
    </div>
  );
};

export default ChangePasswordForm;

type TPasswordFieldProps = {
  label: string;
  name: keyof TChangePasswordFormValues;
  placeholder: string;
  value: string;
  onChange: (fieldName: keyof TChangePasswordFormValues, value: string) => void;
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
