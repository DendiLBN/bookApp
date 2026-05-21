import type { Key } from "react";
import { Link } from "react-router-dom";

import { BookOpen, Heart, ShoppingCart, Star } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { formatPrice } from "@/common/utils/format-price";
import type { TBook } from "@/features/book-page/types";

const fallbackCoverImage = "/book.png";

type TBookAdminTableProps = {
  books: TBook[];
  favoriteActionLoading: boolean;
  favoriteBookIds: string[];
  selectedBookRowKeys: Key[];
  onAddToCart: (bookId: string) => Promise<void>;
  onChangeSelection: (selectedBookRowKeys: Key[]) => void;
  onToggleFavorite: (bookId: string) => Promise<void>;
};

export const BookAdminTable = ({
  books,
  favoriteActionLoading,
  favoriteBookIds,
  onAddToCart,
  onChangeSelection,
  onToggleFavorite,
  selectedBookRowKeys,
}: TBookAdminTableProps) => {
  const handleToggleSelection = (bookId: string, checked: boolean) => {
    const nextSelectedBookRowKeys = checked
      ? [...selectedBookRowKeys, bookId]
      : selectedBookRowKeys.filter((selectedBookRowKey) => selectedBookRowKey !== bookId);

    onChangeSelection(nextSelectedBookRowKeys);
  };

  return (
    <Card className="overflow-hidden shadow-app-m">
      <div className="flex flex-col gap-2 border-b border-app-border bg-app-surface-muted px-s py-xs sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Admin inventory</p>
          <h2 className="m-0 text-lg font-extrabold text-app-text">Catalog control table</h2>
        </div>
        <Badge variant="default">{selectedBookRowKeys.length} selected</Badge>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-230 border-collapse text-left">
          <thead className="bg-app-surface text-xs text-app-text-muted uppercase">
            <tr>
              <th className="w-20 px-s py-xs text-center font-bold">Select</th>
              <th className="p-xs font-bold">Cover</th>
              <th className="p-xs font-bold">Book</th>
              <th className="p-xs font-bold">Rating</th>
              <th className="p-xs font-bold">Price</th>
              <th className="p-xs font-bold">Category</th>
              <th className="p-xs font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => {
              const isFavorite = favoriteBookIds.includes(book._id);
              const isSelected = selectedBookRowKeys.includes(book._id);

              return (
                <tr
                  className="border-t border-app-border transition hover:bg-app-surface-muted"
                  key={book._id}
                >
                  <td className="px-s py-xs text-center align-middle">
                    <input
                      aria-label={`Select ${book.title}`}
                      checked={isSelected}
                      className="mx-auto block size-4 accent-(--color-brand)"
                      onChange={(event) => handleToggleSelection(book._id, event.target.checked)}
                      type="checkbox"
                    />
                  </td>
                  <td className="p-xs">
                    <img
                      alt={book.title}
                      className="h-20 w-14 rounded-m border border-app-border object-cover shadow-app-s"
                      src={book.coverImageUrl || book.avatar || fallbackCoverImage}
                    />
                  </td>
                  <td className="p-xs">
                    <Link
                      className="inline-flex items-center gap-2 font-bold text-app-text no-underline hover:text-app-brand"
                      to={`/book/${book._id}`}
                    >
                      <BookOpen className="size-4 text-app-brand" />
                      {book.title}
                    </Link>
                    <p className="mt-1 mb-0 text-sm text-app-text-muted">{book.author}</p>
                  </td>
                  <td className="p-xs">
                    <span className="inline-flex items-center gap-1 font-semibold text-app-warning">
                      <Star className="size-4 fill-current" />
                      {book.rate.toFixed(1)}
                    </span>
                  </td>
                  <td className="p-xs font-semibold text-app-accent">
                    {formatPrice(book.priceCents)}
                  </td>
                  <td className="p-xs">
                    <div className="flex flex-wrap gap-1">
                      {book.category.map((category) => (
                        <Badge key={category} variant="secondary">
                          {category}
                        </Badge>
                      ))}
                    </div>
                  </td>
                  <td className="p-xs">
                    <div className="flex flex-wrap gap-xs">
                      <Button
                        disabled={favoriteActionLoading}
                        onClick={() => onToggleFavorite(book._id)}
                        type="button"
                        variant={isFavorite ? "default" : "outline"}
                      >
                        <Heart className={isFavorite ? "fill-current" : undefined} />
                        {isFavorite ? "Saved" : "Save"}
                      </Button>
                      <Button onClick={() => onAddToCart(book._id)} type="button" variant="outline">
                        <ShoppingCart />
                        Add to cart
                      </Button>
                      <Button asChild variant="ghost">
                        <Link to={`/book/${book._id}`}>Details</Link>
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Card>
  );
};
