import { useMemo } from "react";

import { Spin } from "antd";

import "@/assets/layouts-styles/book-styles/book.css";

import { FavoriteCategories } from "@/features/favorites-page/components/favorite-categories";
import { FavoritesEmptyState } from "@/features/favorites-page/components/favorites-empty-state";
import { FavoritesHero } from "@/features/favorites-page/components/favorites-hero";
import { FavoritesTable } from "@/features/favorites-page/components/favorites-table";

import { useBookFavorites } from "@/features/book-page/hooks/useBookFavorites";
import { useFavoriteBooksSummary } from "@/features/favorites-page/hooks/useFavoriteBooksSummary";

import { formatPrice } from "@/common/utils/format-price";
import { FULL_CATALOG_PAGE_SIZE } from "@/features/book-page/consts/book-query";
import { useFetchBooksQuery } from "@/store/api/books";

export const FavoritesView = () => {
  const { favoriteBookIds, favoriteActionLoading, handleToggleFavorite } = useBookFavorites();
  const { data: booksResponse, isFetching } = useFetchBooksQuery({
    page: 1,
    perPage: FULL_CATALOG_PAGE_SIZE,
    searchString: "",
    category: [],
  });
  const books = useMemo(() => booksResponse?.data ?? [], [booksResponse]);
  const { averageFavoriteRating, favoriteBooks, favoriteCategories, hasFavoriteBooks } =
    useFavoriteBooksSummary({ books, favoriteBookIds });

  return (
    <div className="flex flex-col gap-xl">
      <FavoritesHero
        averageFavoriteRating={averageFavoriteRating}
        favoriteBooksCount={favoriteBooks.length}
      />

      {hasFavoriteBooks ? <FavoriteCategories categories={favoriteCategories} /> : null}

      <div className="relative">
        {isFetching ? (
          <div className="absolute inset-0 z-10 grid place-items-center rounded-l bg-app-surface/80 backdrop-blur-sm">
            <div className="flex items-center gap-2 rounded-full border border-app-border bg-app-surface px-s py-xs font-semibold text-app-text-muted shadow-app-m">
              <Loader2 className="size-4 animate-spin text-app-brand" />
              Loading favorites
            </div>
          </div>
        ) : null}
        {hasFavoriteBooks ? (
          <FavoritesTable books={favoriteBooks} columns={columns} />
        ) : (
          <FavoritesEmptyState />
        )}
      </div>
    </div>
  );
};
