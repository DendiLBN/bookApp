import type { ReactNode } from "react";

import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useCartMutations } from "@/features/cart-page/hooks/useCartMutations";

import type { TUser } from "@/features/users/types";
import { authReducer } from "@/store/reducers/auth";

const openNotification = vi.fn();
const removeCartItem = vi.fn();
const updateCartItem = vi.fn();

vi.mock("@/common/contexts/hooks/use-notification-context", () => ({
  useNotificationContext: () => ({ openNotification }),
}));

vi.mock("@/store/api/users", () => ({
  useRemoveCartItemMutation: () => [removeCartItem],
  useUpdateCartItemMutation: () => [updateCartItem],
}));

const user: TUser = {
  _id: "user-1",
  email: "reader@booknest.dev",
  firstName: "Reader",
  lastName: "Booker",
  cartItems: [
    {
      bookId: "book-1",
      quantity: 2,
    },
  ],
  favoriteBookIds: [],
  role: "customer",
};

const createWrapper = () => {
  const store = configureStore({
    reducer: {
      authReducer: authReducer.reducer,
    },
    preloadedState: {
      authReducer: {
        isLoggedIn: true,
        user,
      },
    },
  });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    wrapper,
  };
};

describe("useCartMutations", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("syncs the authenticated user after removing a cart item", async () => {
    const updatedUser = {
      ...user,
      cartItems: [],
    };
    removeCartItem.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(updatedUser),
    });
    const { store, wrapper } = createWrapper();
    const { result } = renderHook(() => useCartMutations(), { wrapper });

    await act(async () => {
      await result.current.handleRemoveItem("book-1");
    });

    expect(removeCartItem).toHaveBeenCalledWith("book-1");
    expect(store.getState().authReducer.user).toEqual(updatedUser);
    expect(openNotification).toHaveBeenCalledWith("top", "success", "Cart item removed.", false);
  });

  it("syncs the authenticated user after updating cart quantity", async () => {
    const updatedUser = {
      ...user,
      cartItems: [
        {
          bookId: "book-1",
          quantity: 3,
        },
      ],
    };
    updateCartItem.mockReturnValue({
      unwrap: vi.fn().mockResolvedValue(updatedUser),
    });
    const { store, wrapper } = createWrapper();
    const { result } = renderHook(() => useCartMutations(), { wrapper });

    await act(async () => {
      await result.current.handleUpdateQuantity("book-1", 3);
    });

    expect(updateCartItem).toHaveBeenCalledWith({
      bookId: "book-1",
      quantity: 3,
    });
    expect(store.getState().authReducer.user).toEqual(updatedUser);
  });

  it("marks the changed cart item as pending while the mutation runs", async () => {
    const updatedUser = {
      ...user,
      cartItems: [],
    };
    let resolveRemoveCartItem: (value: TUser) => void = () => {};
    const pendingRemoveCartItem = new Promise<TUser>((resolve) => {
      resolveRemoveCartItem = resolve;
    });
    removeCartItem.mockReturnValue({
      unwrap: vi.fn().mockReturnValue(pendingRemoveCartItem),
    });
    const { wrapper } = createWrapper();
    const { result } = renderHook(() => useCartMutations(), { wrapper });

    let removePromise: Promise<void> = Promise.resolve();

    act(() => {
      removePromise = result.current.handleRemoveItem("book-1");
    });

    expect(result.current.pendingCartItemId).toBe("book-1");

    await act(async () => {
      resolveRemoveCartItem(updatedUser);
      await removePromise;
    });

    expect(result.current.pendingCartItemId).toBeUndefined();
  });
});
