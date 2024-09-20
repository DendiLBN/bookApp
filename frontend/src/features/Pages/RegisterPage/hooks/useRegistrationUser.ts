import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

import { useRegisterUserMutation } from "@/common/store/api/user";

import { useAuthFormContext } from "@/context/hooks/use-form-auth-context";

import { TFetchBodyRegister } from "@/types/types";
import { TRegisterUserResponse } from "@/types/api/user";

export const useRegistrationUser = () => {
  const [registerUser] = useRegisterUserMutation();

  const { setLoading, setError, setUser, openNotification } =
    useAuthFormContext();

  const navigate = useNavigate();

  const handleSuccess = useCallback(
    (data: TRegisterUserResponse) => {
      openNotification(
        "topRight",
        "success",
        `Your account has been created successfully! ${data.email}. Welcome to our bookstore! ${data.firstName}! Please login now.`,
        false
      );

      setUser(null);

      setTimeout(() => {
        navigate("/auth/login");
      }, 3000);
    },
    [navigate, openNotification, setUser]
  );

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while registering user!. Please try again later.",
      false
    );

    setError("An error occurred while registering user.");
  }, [openNotification, setError]);

  const fetchRegistrationUser = useCallback(
    async ({ email, password, firstName, lastName }: TFetchBodyRegister) => {
      setLoading(true);
      setError(null);

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
      } finally {
        setLoading(false);
      }
    },
    [handleError, registerUser, setError, setLoading, handleSuccess]
  );

  return { fetchRegistrationUser };
};
