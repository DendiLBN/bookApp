import { useNavigate } from "react-router-dom";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import type { TRegisterUserRequestBody, TRegisterUserResponse } from "@/features/auth/types";
import { useRegisterUserMutation } from "@/store/api/auth";

export const useRegistrationUser = () => {
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const { openNotification } = useNotificationContext();

  const navigate = useNavigate();

  const handleSuccess = (data: TRegisterUserResponse) => {
    navigate("/success", {
      state: { firstName: data.firstName, email: data.email },
    });
  };

  const handleError = () => {
    openNotification(
      "top",
      "error",
      "Could not create account. Check the form and try again.",
      false,
    );
  };

  const submitRegistration = ({
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
  };

  return { submitRegistration, loading: isLoading };
};
