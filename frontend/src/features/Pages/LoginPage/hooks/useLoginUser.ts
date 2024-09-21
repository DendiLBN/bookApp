import { useCallback } from "react";

import { useLoginUserMutation } from "@/common/store/api/user";

import { useNotificationContext } from "@/context/hooks/use-notification-context";

import { TLoginUserRequestBody } from "@/types/types";

export const useLoginUser = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { openNotification } = useNotificationContext();

  const fetchBodyLoginUser = useCallback(
    async ({ email, password }: TLoginUserRequestBody) => {
      try {
        await loginUser({
          email,
          password,
        }).unwrap();

        openNotification(
          "top",
          "success",
          "You are logged in! Welcome back!",
          true
        );
      } catch (error) {
        openNotification(
          "top",
          "error",
          "Please provide correct email or password!",
          true
        );
      }
    },
    [openNotification, loginUser]
  );

  return { fetchBodyLoginUser, loading: isLoading };
};
