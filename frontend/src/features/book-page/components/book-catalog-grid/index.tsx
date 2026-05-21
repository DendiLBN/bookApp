import { BookCatalogCard } from "@/features/book-page/components/book-catalog-card";

import { BOOK_CATALOG_GRID_CLASS_NAME } from "@/features/book-page/consts/book-card";
import type { TBook } from "@/features/book-page/types";

const fallbackCoverImage = "/book.png";

type TBookCatalogGridProps = {
  books: TBook[];
  favoriteBookIds: string[];
  favoriteCooldownBookIds: string[];
  favoriteActionLoading: boolean;
  cartActionLoading: boolean;
  onToggleFavorite: (bookId: string) => void;
  onAddToCart: (bookId: string) => void;
};

export const BookCatalogGrid = ({
  books,
  cartActionLoading,
  favoriteCooldownBookIds,
  favoriteBookIds,
  favoriteActionLoading,
  onAddToCart,
  onToggleFavorite,
}: TBookCatalogGridProps) => (
  <section className={BOOK_CATALOG_GRID_CLASS_NAME}>
    {books.map((book) => {
      const isFavorite = favoriteBookIds.includes(book._id);
      const isFavoriteDisabled =
        favoriteActionLoading || favoriteCooldownBookIds.includes(book._id);

      return (
        <BookCatalogCard
          book={book}
          cartActionLoading={cartActionLoading}
          favoriteActionLoading={favoriteActionLoading}
          isFavorite={isFavorite}
          isFavoriteCoolingDown={favoriteCooldownBookIds.includes(book._id)}
          key={book._id}
          onAddToCart={onAddToCart}
          onToggleFavorite={onToggleFavorite}
        />
      );
    })}
  </section>
);
