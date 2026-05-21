import { BookOpen, Loader2 } from "lucide-react";

import { Card } from "@/components/ui/Card";
import { BookAdminTable } from "@/features/book-page/components/book-admin-table";
import { BookCatalogGrid } from "@/features/book-page/components/book-catalog-grid";
import { BookCatalogPagination } from "@/features/book-page/components/book-catalog-pagination";

import type { TBookRowSelection } from "@/features/book-page/types/book-selection";

import type { TBook } from "@/features/book-page/types";

type TBookCatalogContentProps = {
  bookList: TBook[];
  cooldownBookIds: string[];
  currentPage: number;
  favoriteActionLoading: boolean;
  favoriteBookIds: string[];
  isAdmin: boolean;
  isFetching: boolean;
  isUpdatingCart: boolean;
  itemsPerPage: number;
  rowSelection: TBookRowSelection;
  totalItems: number;
  handleAddToCart: (bookId: string) => Promise<void>;
  handleChangePagination: (page: number, pageSize: number) => void;
  handleToggleFavorite: (bookId: string) => Promise<void>;
};

export const BookCatalogContent = ({
  bookList,
  cooldownBookIds,
  currentPage,
  favoriteActionLoading,
  favoriteBookIds,
  handleAddToCart,
  handleChangePagination,
  handleToggleFavorite,
  isAdmin,
  isFetching,
  isUpdatingCart,
  itemsPerPage,
  rowSelection,
  totalItems,
}: TBookCatalogContentProps) => (
  <div className="relative">
    {isFetching ? (
      <div className="absolute inset-0 z-10 grid place-items-center rounded-l bg-app-surface/80 font-semibold text-app-text backdrop-blur-sm">
        <div className="flex items-center gap-2 rounded-full border border-app-border bg-app-surface px-s py-xs shadow-app-m">
          <Loader2 className="size-4 animate-spin text-app-brand" />
          Loading catalog
        </div>
      </div>
    ) : null}
    {bookList.length === 0 && !isFetching ? (
      <Card className="grid min-h-75 place-items-center p-l text-center">
        <div className="max-w-105">
          <div className="mx-auto grid size-14 place-items-center rounded-full bg-app-brand-soft text-app-brand">
            <BookOpen className="size-7" />
          </div>
          <h2 className="mt-s mb-1 text-xl font-extrabold text-app-text">No books found</h2>
          <p className="m-0 text-app-text-muted">
            Adjust search, shelves or price filters to bring matching titles back into view.
          </p>
        </div>
      </Card>
    ) : isAdmin ? (
      <div className="flex flex-col gap-s">
        <BookAdminTable
          books={bookList}
          favoriteActionLoading={favoriteActionLoading}
          favoriteBookIds={favoriteBookIds}
          selectedBookRowKeys={rowSelection.selectedRowKeys}
          onAddToCart={handleAddToCart}
          onChangeSelection={rowSelection.onChange}
          onToggleFavorite={handleToggleFavorite}
        />
        <BookCatalogPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onChangePagination={handleChangePagination}
        />
      </div>
    ) : (
      <div className="flex flex-col gap-s">
        <BookCatalogGrid
          books={bookList}
          cartActionLoading={isUpdatingCart}
          favoriteCooldownBookIds={cooldownBookIds}
          favoriteBookIds={favoriteBookIds}
          favoriteActionLoading={favoriteActionLoading}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
        />
        <BookCatalogPagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onChangePagination={handleChangePagination}
        />
      </div>
    )}
  </div>
);
