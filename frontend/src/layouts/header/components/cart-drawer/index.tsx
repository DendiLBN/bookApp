import { Link } from "react-router-dom";

import { ShoppingCart, X } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import { useCartDrawerContext } from "@/common/contexts/hooks/use-cart-drawer-context";

import useUser from "@/common/users/useUser";
import { CartView } from "@/features/cart-page";

export const CartDrawer = () => {
  const { user } = useUser();
  const { closeCartDrawer, isCartDrawerOpen, openCartDrawer } = useCartDrawerContext();
  const cartItemsCount = (user?.cartItems ?? []).reduce((total, item) => total + item.quantity, 0);

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
          <span className="-top-1 -right-1 absolute grid min-h-5 min-w-5 place-items-center rounded-full bg-app-brand px-1 text-xs font-bold text-app-text-inverse">
            {cartItemsCount}
          </span>
        ) : null}
      </div>

      {isCartDrawerOpen ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/20" onClick={closeCartDrawer}>
          <Card
            className="h-full w-[min(440px,100vw)] overflow-hidden rounded-none border-y-0 border-r-0 shadow-app-m"
            onClick={(event) => event.stopPropagation()}
          >
            <CardHeader className="flex-row items-center justify-between gap-xs border-b border-app-border">
              <div>
                <CardTitle>Cart</CardTitle>
                <Link
                  className="mt-1 inline-block text-sm font-semibold text-app-accent no-underline hover:underline"
                  to="/cart"
                  onClick={closeCartDrawer}
                >
                  Open full cart
                </Link>
              </div>
              <Button
                aria-label="Close cart"
                onClick={closeCartDrawer}
                size="icon"
                type="button"
                variant="ghost"
              >
                <X />
              </Button>
            </CardHeader>
            <CardContent className="h-[calc(100%-88px)] overflow-y-auto p-s">
              <CartView compact />
            </CardContent>
          </Card>
        </div>
      ) : null}
    </>
  );
};
