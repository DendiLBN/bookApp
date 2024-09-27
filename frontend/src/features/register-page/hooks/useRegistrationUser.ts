import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import { TRegisterUserRequestBody } from "@/types/types";

import { TRegisterUserResponse } from "@/types/api/auth-user";

import { useRegisterUserMutation } from "@/store/api/auth/index";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

export const useRegistrationUser = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { openNotification } = useNotificationContext();

  const navigate = useNavigate();

  const handleSuccess = useCallback(
    (data: TRegisterUserResponse) => {
      openNotification(
        "topRight",
        "success",
        `Your account has been created successfully! ${data.email}, ${data.firstName}.`,
        false
      );

      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    },
    [navigate, openNotification]
  );

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while registering user!. Please try again later.",
      false
    );
  }, [openNotification]);

  const fetchRegistrationUser = useCallback(
    async ({
      email,
      password,
      firstName,
      lastName,
    }: TRegisterUserRequestBody) => {
      registerUser({
        data: {
          firstName,
          lastName,
          email,
          password,
        },
        onSuccess: handleSuccess,
        onError: handleError,
      });
    },
    [handleError, registerUser, handleSuccess]
  );

  return { fetchRegistrationUser, loading: isLoading };
};
