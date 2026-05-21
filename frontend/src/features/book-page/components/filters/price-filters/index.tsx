import { ArrowDownAZ, ArrowUpAZ } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { cn } from "@/common/utils/cn";

type TPriceFiltersProps = {
  maxPriceCents?: number;
  minPriceCents?: number;
  sortBy?: "priceAsc" | "priceDesc";
  onChangeMaxPrice: (value?: number) => void;
  onChangeMinPrice: (value?: number) => void;
  onChangeSort: (value?: "priceAsc" | "priceDesc") => void;
};

export const PriceFilters = ({
  maxPriceCents,
  minPriceCents,
  sortBy,
  onChangeMaxPrice,
  onChangeMinPrice,
  onChangeSort,
}: TPriceFiltersProps) => (
  <div className="grid w-full gap-xs lg:grid-cols-[minmax(112px,1fr)_minmax(112px,1fr)_auto]">
    <Input
      min={0}
      onChange={(event) =>
        onChangeMinPrice(event.target.value ? Number(event.target.value) * 100 : undefined)
      }
      placeholder="Min PLN"
      type="number"
      value={minPriceCents ? minPriceCents / 100 : ""}
    />
    <Input
      min={0}
      onChange={(event) =>
        onChangeMaxPrice(event.target.value ? Number(event.target.value) * 100 : undefined)
      }
      placeholder="Max PLN"
      type="number"
      value={maxPriceCents ? maxPriceCents / 100 : ""}
    />
    <div className="flex gap-2">
      <Button
        aria-pressed={sortBy === "priceAsc"}
        className={cn(
          "flex-1 lg:flex-none",
          sortBy === "priceAsc" ? "bg-app-brand-soft" : undefined,
        )}
        onClick={() => onChangeSort(sortBy === "priceAsc" ? undefined : "priceAsc")}
        type="button"
        variant="outline"
      >
        <ArrowUpAZ />
        Price
      </Button>
      <Button
        aria-pressed={sortBy === "priceDesc"}
        className={cn(
          "flex-1 lg:flex-none",
          sortBy === "priceDesc" ? "bg-app-brand-soft" : undefined,
        )}
        onClick={() => onChangeSort(sortBy === "priceDesc" ? undefined : "priceDesc")}
        type="button"
        variant="outline"
      >
        <ArrowDownAZ />
        Price
      </Button>
    </div>
  </div>
);
