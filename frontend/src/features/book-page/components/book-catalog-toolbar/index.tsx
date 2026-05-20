import type { Key } from "react";

import { SlidersHorizontal } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { DeleteBooksButton } from "@/features/book-page/components/delete-button";
import { BookSearch } from "@/features/book-page/components/filters/book-search";
import { CategorySelect } from "@/features/book-page/components/filters/category-select";
import { PriceFilters } from "@/features/book-page/components/filters/price-filters";

type TBookCatalogToolbarProps = {
  bookSearchText: string;
  isAdmin: boolean;
  isFetching: boolean;
  maxPriceCents?: number;
  minPriceCents?: number;
  selectedBookRowKeys: Key[];
  selectedCategories: string[];
  sortBy?: "priceAsc" | "priceDesc";
  handleDeleteArray: () => Promise<void>;
  setBookSearchText: (value: string) => void;
  setMaxPriceCents: (value?: number) => void;
  setMinPriceCents: (value?: number) => void;
  setSelectedCategories: (value: string[]) => void;
  setSortBy: (value?: "priceAsc" | "priceDesc") => void;
};

export const BookCatalogToolbar = ({
  bookSearchText,
  handleDeleteArray,
  isAdmin,
  isFetching,
  maxPriceCents,
  minPriceCents,
  selectedBookRowKeys,
  selectedCategories,
  sortBy,
  setBookSearchText,
  setMaxPriceCents,
  setMinPriceCents,
  setSelectedCategories,
  setSortBy,
}: TBookCatalogToolbarProps) => (
  <Card className="p-s shadow-app-m">
    <section className="grid gap-s xl:grid-cols-[minmax(240px,0.7fr)_minmax(280px,1fr)] 2xl:grid-cols-[minmax(260px,0.7fr)_minmax(340px,1fr)_minmax(360px,1fr)_auto]">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-bold text-app-text-muted uppercase">
          <SlidersHorizontal className="size-4 text-app-brand" />
          Search
        </div>
        <BookSearch bookSearchText={bookSearchText} onSearch={setBookSearchText} />
      </div>
      <CategorySelect
        selectedCategories={selectedCategories}
        onChangeCategories={setSelectedCategories}
      />
      <div className="flex flex-col gap-2">
        <span className="text-xs font-bold text-app-text-muted uppercase">Price controls</span>
        <PriceFilters
          maxPriceCents={maxPriceCents}
          minPriceCents={minPriceCents}
          sortBy={sortBy}
          onChangeMaxPrice={setMaxPriceCents}
          onChangeMinPrice={setMinPriceCents}
          onChangeSort={setSortBy}
        />
      </div>
      {isAdmin ? (
        <div className="flex items-end">
          <DeleteBooksButton
            selectedBookRowKeys={selectedBookRowKeys}
            loading={isFetching}
            onDelete={handleDeleteArray}
          />
        </div>
      ) : null}
    </section>
  </Card>
);
