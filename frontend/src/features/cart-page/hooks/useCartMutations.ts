import { useState } from "react";

import { useDispatch } from "react-redux";

import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { getApiErrorMessage } from "@/common/utils/get-api-error-message";
import { useRemoveCartItemMutation, useUpdateCartItemMutation } from "@/store/api/users";
import { setIsLoggedIn } from "@/store/reducers/auth";

export const useCartMutations = () => {
  const dispatch = useDispatch();
  const { openNotification } = useNotificationContext();
  const [pendingCartItemId, setPendingCartItemId] = useState<string>();
  const [updateCartItem] = useUpdateCartItemMutation();
  const [removeCartItem] = useRemoveCartItemMutation();

  const handleUpdateQuantity = async (bookId: string, quantity: number) => {
    setPendingCartItemId(bookId);

    try {
      const updatedUser = await updateCartItem({ bookId, quantity }).unwrap();
      dispatch(setIsLoggedIn({ isLoggedIn: true, user: updatedUser }));
    } catch (error) {
      openNotification(
        "top",
        "error",
        getApiErrorMessage(error, "Could not update cart item."),
        false,
      );
    } finally {
      setPendingCartItemId(undefined);
    }
  };

  const handleRemoveItem = async (bookId: string) => {
    setPendingCartItemId(bookId);

    try {
      const updatedUser = await removeCartItem(bookId).unwrap();
      dispatch(setIsLoggedIn({ isLoggedIn: true, user: updatedUser }));
      openNotification("top", "success", "Cart item removed.", false);
    } catch (error) {
      openNotification(
        "top",
        "error",
        getApiErrorMessage(error, "Could not remove cart item."),
        false,
      );
    } finally {
      setPendingCartItemId(undefined);
    }
  };

  return {
    handleRemoveItem,
    handleUpdateQuantity,
    pendingCartItemId,
  };
};
