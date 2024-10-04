import { useCallback } from "react";

import { TRegisterUserRequestBody } from "@/types/types";

import { useRegisterUserMutation } from "@/store/api/auth/index";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { useNavigate } from "react-router-dom";

import { TRegisterUserResponse } from "@/types/api/auth-user";

export const useRegistrationUser = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { openNotification } = useNotificationContext();

  const navigate = useNavigate();

  const handleSuccess = useCallback(
    (data: TRegisterUserResponse) => {
      navigate("/success", {
        state: { firstName: data.firstName, email: data.email },
      });
    },
    [navigate]
  );

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while registering user. Please try again later.",
      false
    );
  }, [openNotification]);

  const RegistrationUserData = useCallback(
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
      }).unwrap();
    },
    [handleError, registerUser, handleSuccess]
  );

  return { RegistrationUserData, loading: isLoading };
};
