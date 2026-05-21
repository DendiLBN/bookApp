import { Link, useParams } from "react-router-dom";

import { ArrowLeft, BookOpen, Loader2 } from "lucide-react";

import "@/assets/layouts-styles/book-styles/book.css";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BookDetailsContent } from "@/features/book-page/components/book-details/components/book-details-content";
import { useBookDetails } from "@/features/book-page/components/book-details/hooks/useBookDetails";

export const BookDetails = () => {
  const { bookId = "" } = useParams();
  const bookDetails = useBookDetails(bookId);

  if (bookDetails.isFetching) {
    return (
      <Card className="grid min-h-90 place-items-center gap-s p-l">
        <div className="flex items-center gap-2 font-semibold text-app-text-muted">
          <Loader2 className="size-5 animate-spin text-app-brand" />
          Loading book details...
        </div>
      </Card>
    );
  }

  if (bookDetails.isError || !bookDetails.book) {
    return (
      <Card className="grid min-h-90 place-items-center gap-s p-l text-center">
        <div>
          <div className="mx-auto mb-xs grid size-14 place-items-center rounded-full bg-app-brand-soft text-app-brand">
            <BookOpen className="size-7" />
          </div>
          <p className="m-0 text-app-text-muted">Book details could not be loaded.</p>
        </div>
        <Button asChild variant="outline">
          <Link to="/book">
            <ArrowLeft />
            Back to books
          </Link>
        </Button>
      </Card>
    );
  }

  return <BookDetailsContent {...bookDetails} book={bookDetails.book} />;
};
