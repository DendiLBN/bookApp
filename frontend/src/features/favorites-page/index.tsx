import { useMemo } from "react";
import { Link } from "react-router-dom";

import { BookOpen, Heart, Loader2, Star } from "lucide-react";

import "@/assets/layouts-styles/book-styles/book.css";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

import { useBookFavorites } from "@/features/book-page/hooks/useBookFavorites";

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

  const favoriteBooks = books.filter((book) => favoriteBookIds.includes(book._id));
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
      return "0.0";
    }

    const ratingSum = favoriteBooks.reduce((sum, book) => sum + book.rate, 0);

    return (ratingSum / favoriteBooks.length).toFixed(1);
  }, [favoriteBooks, hasFavoriteBooks]);

  return (
    <div className="flex flex-col gap-xl">
      <section className="relative grid overflow-hidden rounded-m border border-app-border bg-[linear-gradient(135deg,var(--color-brand-soft),var(--color-accent-soft))] p-sm text-app-text shadow-app-m md:grid-cols-[minmax(0,1fr)_auto] md:p-l">
        <div>
          <p className="mb-1 text-xs font-bold text-app-brand uppercase">Saved collection</p>
          <h1 className="m-0 text-[1.55rem] leading-tight font-bold">Favorite books</h1>
          <p className="mt-xs mb-0 max-w-160 leading-6 text-app-text-muted">
            Keep books you want to revisit, compare, or add to your cart later.
          </p>
        </div>
        <div className="mt-sm grid grid-cols-2 gap-xs self-stretch md:mt-0">
          <div className="flex min-w-28 flex-col justify-center rounded-m border border-app-border bg-app-surface p-xs">
            <span className="text-xl font-bold text-app-brand">{favoriteBooks.length}</span>
            <p className="m-0 text-app-text-muted">Saved books</p>
          </div>
          <div className="flex min-w-28 flex-col justify-center rounded-m border border-app-border bg-app-surface p-xs">
            <span className="text-xl font-bold text-app-brand">{averageFavoriteRating}</span>
            <p className="m-0 text-app-text-muted">Average rating</p>
          </div>
        </div>
      </section>

      {hasFavoriteBooks ? (
        <section className="rounded-m border border-app-border bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))] p-s text-app-text shadow-app-s">
          <strong>Saved categories</strong>
          <div className="mt-xs flex flex-wrap gap-2">
            {favoriteCategories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
        </section>
      ) : null}

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
          <section className="grid gap-s md:grid-cols-2 xl:grid-cols-3">
            {favoriteBooks.map((book) => (
              <Card className="overflow-hidden" key={book._id}>
                <div className="grid grid-cols-[96px_minmax(0,1fr)] gap-s p-s">
                  <Link to={`/book/${book._id}`}>
                    <img
                      alt={book.title}
                      className="aspect-2/3 w-full rounded-m object-cover shadow-app-s"
                      src={book.coverImageUrl || book.avatar || "/book.png"}
                    />
                  </Link>
                  <CardContent className="flex flex-col gap-xs p-0">
                    <div>
                      <Link className="text-app-text no-underline" to={`/book/${book._id}`}>
                        <h2 className="m-0 line-clamp-2 text-lg font-extrabold">{book.title}</h2>
                      </Link>
                      <p className="mt-1 mb-0 text-sm text-app-text-muted">{book.author}</p>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {book.category.slice(0, 2).map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-xs">
                      <span className="inline-flex items-center gap-1 font-bold text-app-warning">
                        <Star className="size-4 fill-current" />
                        {book.rate}
                      </span>
                      <span className="font-bold text-app-accent">
                        {formatPrice(book.priceCents)}
                      </span>
                    </div>
                    <Button
                      disabled={favoriteActionLoading}
                      onClick={() => handleToggleFavorite(book._id)}
                      type="button"
                      variant="outline"
                    >
                      <Heart className="fill-current" />
                      Remove favorite
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </section>
        ) : (
          <Card className="grid min-h-70 place-items-center p-l text-center">
            <div>
              <div className="mx-auto mb-xs grid size-14 place-items-center rounded-full bg-app-brand-soft text-app-brand">
                <BookOpen className="size-7" />
              </div>
              <h2 className="m-0 text-xl font-extrabold text-app-text">No favorite books yet</h2>
              <p className="mt-2 mb-s text-app-text-muted">
                Save books from the catalog to build your reading shortlist.
              </p>
              <Button asChild>
                <Link to="/book">Browse books</Link>
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};
