import { useCallback } from "react";

import { useLoginUserMutation } from "@/store/api/auth/index";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { TLoginUserRequestBody } from "@/types/types";

import useUser from "@/common/users/useUser";

export const useLoginUser = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const { user } = useUser();

  const { openNotification } = useNotificationContext();
  const handleSuccess = useCallback(() => {
    openNotification("topRight", "success", `You are logged in ${user}!`, true);
  }, [openNotification, user]);

  //  Fix issue with display login result is not correct "null" instead of user name, maybe it's because of the user is not updated on the store;

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while login!. Please check your password or email.",
      false
    );
  }, [openNotification]);

  const fetchBodyLoginUser = useCallback(
    async ({ email, password }: TLoginUserRequestBody) => {
      loginUser({
        data: { email, password },
        onSuccess: handleSuccess,
        onError: handleError,
      });
    },
    [handleError, handleSuccess, loginUser]
  );

  return { fetchBodyLoginUser, loading: isLoading };
};
