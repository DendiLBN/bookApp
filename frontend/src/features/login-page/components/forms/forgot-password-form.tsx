import { type FormEvent, useCallback, useState } from "react";

import { Mail, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

import { useModalContext } from "@/common/contexts/hooks/use-modal-context";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import type { TForgotPasswordFormProps } from "@/features/login-page/types";
import { useForgotPasswordMutation } from "@/store/api/auth";

export const ForgotPasswordForm = ({ visible }: TForgotPasswordFormProps) => {
  const { openNotification } = useNotificationContext();

  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const { hideModal } = useModalContext();

  const [email, setEmail] = useState("");

  const handleSuccess = useCallback(() => {
    openNotification("topRight", "success", "Email has been sent. Follow the instructions.", true);
    hideModal();
    setEmail("");
  }, [hideModal, openNotification]);

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "Unable to send request. Probably too many requests have been sent in short time. Please check your email address and try again.",
      true,
    );
  }, [openNotification]);

  const handleCancelModal = useCallback(() => {
    hideModal();
    setEmail("");
  }, [hideModal]);

  const handleSendEmail = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      forgotPassword({
        data: { email },
        onSuccess: handleSuccess,
        onError: handleError,
      });
    },
    [email, forgotPassword, handleError, handleSuccess],
  );

  if (!visible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 px-s backdrop-blur-sm">
      <Card className="w-full max-w-120 p-s shadow-app-m">
        <div className="mb-s flex items-start justify-between gap-xs">
          <div>
            <p className="m-0 text-xs font-bold text-app-brand uppercase">Account recovery</p>
            <h2 className="mt-1 mb-0 text-xl font-extrabold text-app-text">Reset password</h2>
            <p className="mt-2 mb-0 text-sm text-app-text-muted">
              Enter your email and we will send password reset instructions.
            </p>
          </div>
          <Button
            aria-label="Close reset modal"
            onClick={handleCancelModal}
            size="icon"
            variant="ghost"
          >
            <X />
          </Button>
        </div>

        <form className="flex flex-col gap-s" onSubmit={handleSendEmail}>
          <label className="flex flex-col gap-2">
            <span className="text-sm font-semibold text-app-text">Email</span>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
              <Input
                autoComplete="email"
                className="h-11 pl-xl"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                required
                type="email"
                value={email}
              />
            </div>
          </label>
          <Button disabled={isLoading} type="submit">
            Send reset password link
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ForgotPasswordForm;
