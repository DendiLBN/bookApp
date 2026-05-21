import { useMemo } from "react";

import type { TBook } from "@/features/book-page/types";
import { EMPTY_FAVORITE_RATING } from "@/features/favorites-page/consts/favorites-display";

type TUseFavoriteBooksSummaryParams = {
  books: TBook[];
  favoriteBookIds: string[];
};

export const useFavoriteBooksSummary = ({
  books,
  favoriteBookIds,
}: TUseFavoriteBooksSummaryParams) => {
  const favoriteBooks = useMemo(
    () => books.filter((book) => favoriteBookIds.includes(book._id)),
    [books, favoriteBookIds],
  );
  const hasFavoriteBooks = favoriteBooks.length > 0;

  const favoriteCategories = useMemo(
    () =>
      Array.from(new Set(favoriteBooks.flatMap((book) => book.category))).filter(
        (category) => category.length > 0,
      ),
    [favoriteBooks],
  );

  const averageFavoriteRating = useMemo(() => {
    if (!hasFavoriteBooks) {
      return EMPTY_FAVORITE_RATING;
    }

    const ratingSum = favoriteBooks.reduce((sum, book) => sum + book.rate, 0);

    return (ratingSum / favoriteBooks.length).toFixed(1);
  }, [favoriteBooks, hasFavoriteBooks]);

  return {
    averageFavoriteRating,
    favoriteBooks,
    favoriteCategories,
    hasFavoriteBooks,
  };
};
