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
      <div className="absolute inset-0 z-10 grid place-items-center rounded-l bg-app-surface/70 font-semibold text-app-text">
        Loading...
      </div>
    ) : null}
    {isAdmin ? (
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
