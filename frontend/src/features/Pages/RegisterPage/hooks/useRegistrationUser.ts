import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import { useRegisterUserMutation } from "@/common/store/api/user";

import { useNotificationContext } from "@/context/hooks/use-notification-context";

import { TRegisterUserRequestBody } from "@/types/types";
import { TRegisterUserResponse } from "@/types/api/user";

export const useRegistrationUser = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { openNotification } = useNotificationContext();

  const navigate = useNavigate();

  const handleSuccess = useCallback(
    (data: TRegisterUserResponse) => {
      openNotification(
        "topRight",
        "success",
        `Your account has been created successfully! ${data.email}. Welcome to our bookstore! ${data.firstName}! Please login now.`,
        false
      );
      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    },
    [navigate, openNotification]
  );

  // TODO - przenieść akcję do reduxa i zmieniać tekst po 3 sekundach na `undefined` lub `null`,
  // a same błędy obsłużyć w pliku `frontend/src/common/store/api/user/index.ts`
  // w `catch` w metodzie `onQueryStarted`
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
      try {
        const response = await registerUser({
          firstName,
          lastName,
          email,
          password,
        }).unwrap();

        if (!response) {
          return handleError();
        }

        handleSuccess(response);
      } catch (error) {
        handleError();
      }
    },
    [handleError, registerUser, handleSuccess]
  );

  return { fetchRegistrationUser, loading: isLoading };
};
