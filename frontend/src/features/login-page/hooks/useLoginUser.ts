import { useCallback } from "react";

import { useLoginUserMutation } from "@/store/api/auth/index";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { TLoginUserRequestBody } from "@/types/types";

import { useFetchUsersQuery } from "@/store/api/users";

export const useLoginUser = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const { refetch } = useFetchUsersQuery(undefined, { skip: true });

  const { openNotification } = useNotificationContext();

  const handleSuccess = useCallback(() => {
    openNotification(
      "topRight",
      "success",
      `You are logged in successfully! `,
      true
    );
  }, [openNotification]);

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

  return { fetchBodyLoginUser, refetch, loading: isLoading };
};
