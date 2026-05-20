import { Link } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { CartItemCard } from "@/features/cart-page/components/cart-item-card";
import { CartSummary } from "@/features/cart-page/components/cart-summary";
import { CheckoutAddressForm } from "@/features/cart-page/components/checkout-address-form";

import { useCartMutations } from "@/features/cart-page/hooks/useCartMutations";
import { useCartSummary } from "@/features/cart-page/hooks/useCartSummary";
import { useCheckout } from "@/features/cart-page/hooks/useCheckout";

type TCartViewProps = {
  compact?: boolean;
};

export const CartView = ({ compact = false }: TCartViewProps) => {
  const { handleRemoveItem, handleUpdateQuantity } = useCartMutations();
  const { resolvedCartItems, totalPriceCents } = useCartSummary();
  const { handleCheckout, isCreatingOrder } = useCheckout();

  if (resolvedCartItems.length === 0) {
    return (
      <Card>
        <CardContent className="grid place-items-center gap-xs p-l text-center">
          <div>
            <h2 className="m-0 text-lg font-bold text-app-text">Your cart is empty.</h2>
            <p className="mt-1 mb-0 text-app-text-muted">
              Browse the catalog and add books before checkout.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link to="/book">Browse books</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="cart-surface flex flex-col gap-s">
      {resolvedCartItems.map((cartItem) => (
        <CartItemCard
          cartItem={cartItem}
          compact={compact}
          key={cartItem.bookId}
          onRemove={handleRemoveItem}
          onUpdateQuantity={handleUpdateQuantity}
        />
      ))}
      {!compact && (
        <>
          <CartSummary totalPriceCents={totalPriceCents} />
          <CheckoutAddressForm isSubmitting={isCreatingOrder} onSubmit={handleCheckout} />
        </>
      )}
    </div>
  );
};
