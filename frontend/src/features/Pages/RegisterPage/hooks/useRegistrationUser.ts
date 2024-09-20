import { useCallback } from "react";
import axios from "axios";
import { TFetchBodyRegister } from "@/types/types";
import { useAuthFormContext } from "@/context/hooks/use-form-auth-context";
import { useNavigate } from "react-router-dom";

export const useRegistrationUser = () => {
  const { setLoading, setError, setUser, openNotification } =
    useAuthFormContext();
  const navigate = useNavigate();

  const fetchRegistrationUser = useCallback(
    async ({ email, password, firstName, lastName }: TFetchBodyRegister) => {
      setLoading(true);
      setError(null);

      try {
        const res = await axios.post("/api/auth/register", {
          firstName,
          lastName,
          email,
          password,
        });

        console.log(res.data);
        openNotification(
          "topRight",
          "success",
          `Your account has been created successfully! ${res.data.email}. Welcome to our bookstore! ${res.data.firstName}! Please login now.`,
          false
        );

        setUser(res.data.data);

        setTimeout(() => {
          navigate("/auth/login");
        }, 3000);
      } catch (error) {
        openNotification(
          "topRight",
          "error",
          "An error occurred while registering user!. Please try again later.",
          false
        );

        setError("An error occurred while registering user.");
      } finally {
        setLoading(false);
      }
    },
    [navigate, openNotification, setError, setLoading, setUser]
  );

  return { fetchRegistrationUser };
};
