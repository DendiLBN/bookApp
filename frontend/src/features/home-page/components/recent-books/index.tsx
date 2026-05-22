import { Link } from "react-router-dom";

import { BookOpen, Clock3 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { TBook } from "@/features/book-page/types";

type TRecentBooksProps = {
  books: TBook[];
};

export const RecentBooks = ({ books }: TRecentBooksProps) => (
  <Card className="overflow-hidden">
    <CardHeader className="flex-row items-start justify-between gap-xs border-b border-app-border bg-app-surface-muted p-4.5 pb-s">
      <div>
        <p className="m-0 text-xs font-bold text-app-text-muted uppercase">New arrivals</p>
        <CardTitle className="mt-1">Recently added books</CardTitle>
      </div>
      <Clock3 className="size-5 text-app-accent" />
    </CardHeader>
    <CardContent className="grid gap-xs p-4.5">
      {books.length > 0 ? (
        books.map((book) => (
          <Link
            className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-xs rounded-m border border-app-border bg-app-surface-muted p-xs text-inherit no-underline transition hover:border-app-accent hover:bg-app-accent-soft"
            key={book._id}
            to={`/book/${book._id}`}
          >
            <div className="grid aspect-2/3 w-11 place-items-center overflow-hidden rounded-s bg-app-accent-soft text-app-accent">
              {book.coverImageUrl ? (
                <img
                  alt={book.title}
                  className="h-full w-full object-cover"
                  src={book.coverImageUrl}
                />
              ) : (
                <BookOpen className="size-4" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="m-0 truncate text-sm font-bold text-app-text">{book.title}</h3>
              <p className="m-0 truncate text-sm text-app-text-muted">{book.author}</p>
            </div>
          </Link>
        ))
      ) : (
        <p className="m-0 text-app-text-muted">Newest books will appear after catalog sync.</p>
      )}
    </CardContent>
  </Card>
);
