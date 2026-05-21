import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

import { ShoppingCart, X } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { useCartDrawerContext } from "@/common/contexts/hooks/use-cart-drawer-context";

import useUser from "@/common/users/useUser";
import { CartView } from "@/features/cart-page";

export const CartDrawer = () => {
  const { user } = useUser();
  const { closeCartDrawer, isCartDrawerOpen, openCartDrawer } = useCartDrawerContext();
  const cartItemsCount = (user?.cartItems ?? []).reduce((total, item) => total + item.quantity, 0);
  const cartDrawer = isCartDrawerOpen
    ? createPortal(
        <div className="fixed inset-0 z-50 flex justify-end bg-black/35 backdrop-blur-sm">
          <aside className="h-dvh w-full max-w-110 overflow-y-auto border-l border-app-border bg-app-surface p-s shadow-app-m">
            <div className="mb-s flex items-center justify-between gap-xs">
              <div>
                <p className="m-0 text-xs font-bold text-app-brand uppercase">Basket</p>
                <h2 className="m-0 text-xl font-extrabold text-app-text">Cart</h2>
              </div>
              <div className="flex items-center gap-2">
                <Link
                  className="font-semibold text-app-accent no-underline hover:underline"
                  to="/cart"
                >
                  Open full cart
                </Link>
                <Button
                  aria-label="Close cart"
                  onClick={closeCartDrawer}
                  size="icon"
                  type="button"
                  variant="ghost"
                >
                  <X />
                </Button>
              </div>
            </div>
            <CartView compact />
          </aside>
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div className="relative">
        <Button
          aria-label="Open cart"
          onClick={openCartDrawer}
          size="icon"
          type="button"
          variant="outline"
        >
          <ShoppingCart />
        </Button>
        {cartItemsCount > 0 ? (
          <span className="absolute -top-1 -right-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-app-brand px-1 text-xs font-bold text-app-text-inverse">
            {cartItemsCount}
          </span>
        ) : null}
      </div>

      {cartDrawer}
    </>
  );
};
