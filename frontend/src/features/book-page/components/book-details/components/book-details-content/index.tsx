import { Link } from "react-router-dom";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { BookDetailsDescription } from "@/features/book-page/components/book-details/components/book-details-description";
import { BookDetailsSummary } from "@/features/book-page/components/book-details/components/book-details-summary";
import type { useBookDetails } from "@/features/book-page/components/book-details/hooks/useBookDetails";

import type { TBook } from "@/features/book-page/types";

type TBookDetailsContentProps = ReturnType<typeof useBookDetails> & {
  book: TBook;
};

export const BookDetailsContent = ({
  book,
  cooldownBookIds,
  favoriteActionLoading,
  favoriteBookIds,
  fileInputRef,
  handleAddToCart,
  handleCoverChange,
  handleToggleFavorite,
  isUpdatingCart,
  isUploadingCover,
  openCoverPicker,
  user,
}: TBookDetailsContentProps) => (
  <div className="flex max-w-280 flex-col gap-xl">
    <Button asChild className="w-fit" variant="outline">
      <Link to="/book">
        <ArrowLeft />
        Back to books
      </Link>
    </Button>

    <BookDetailsSummary
      book={book}
      cooldownBookIds={cooldownBookIds}
      favoriteActionLoading={favoriteActionLoading}
      favoriteBookIds={favoriteBookIds}
      fileInputRef={fileInputRef}
      handleAddToCart={handleAddToCart}
      handleCoverChange={handleCoverChange}
      handleToggleFavorite={handleToggleFavorite}
      isUpdatingCart={isUpdatingCart}
      isUploadingCover={isUploadingCover}
      openCoverPicker={openCoverPicker}
      user={user}
    />
    <BookDetailsDescription book={book} />
  </div>
);
