import { useMemo } from "react";

import { Spin } from "antd";

import "@/assets/layouts-styles/book-styles/book.css";

import { FavoriteCategories } from "@/features/favorites-page/components/favorite-categories";
import { FavoritesEmptyState } from "@/features/favorites-page/components/favorites-empty-state";
import { FavoritesHero } from "@/features/favorites-page/components/favorites-hero";
import { FavoritesTable } from "@/features/favorites-page/components/favorites-table";

import { useBookFavorites } from "@/features/book-page/hooks/useBookFavorites";
import { useFavoriteBooksSummary } from "@/features/favorites-page/hooks/useFavoriteBooksSummary";

import { FULL_CATALOG_PAGE_SIZE } from "@/features/book-page/consts/book-query";
import { createBookTableColumns } from "@/features/book-page/consts/book-table-columns";
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

  const columns = createBookTableColumns({
    favoriteBookIds,
    favoriteActionLoading,
    onToggleFavorite: handleToggleFavorite,
  });

  return (
    <div className="flex flex-col gap-xl">
      <FavoritesHero
        averageFavoriteRating={averageFavoriteRating}
        favoriteBooksCount={favoriteBooks.length}
      />

      {hasFavoriteBooks ? <FavoriteCategories categories={favoriteCategories} /> : null}

      <Spin tip="Loading..." size="large" spinning={isFetching}>
        {hasFavoriteBooks ? (
          <FavoritesTable books={favoriteBooks} columns={columns} />
        ) : (
          <FavoritesEmptyState />
        )}
      </Spin>
    </div>
  );
};
