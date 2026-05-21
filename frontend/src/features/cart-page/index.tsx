import { ShoppingCart } from "lucide-react";

import { Card } from "@/components/ui/Card";
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
      <Card className="grid min-h-60 place-items-center p-l text-center">
        <div>
          <div className="mx-auto mb-xs grid size-14 place-items-center rounded-full bg-app-brand-soft text-app-brand">
            <ShoppingCart className="size-7" />
          </div>
          <h2 className="m-0 text-xl font-extrabold text-app-text">Your cart is empty</h2>
          <p className="mt-2 mb-0 text-app-text-muted">
            Add books from the catalog to start checkout.
          </p>
        </div>
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
