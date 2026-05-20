import { Card, CardContent } from "@/components/ui/Card";

import { formatPrice } from "@/common/utils/format-price";

type TCartSummaryProps = {
  totalPriceCents: number;
};

export const CartSummary = ({ totalPriceCents }: TCartSummaryProps) => (
  <Card>
    <CardContent className="flex flex-col gap-xs p-s sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="m-0 text-sm text-app-text-muted">Order total</p>
        <strong className="text-xl text-app-text">{formatPrice(totalPriceCents)}</strong>
      </div>
    </CardContent>
  </Card>
);
