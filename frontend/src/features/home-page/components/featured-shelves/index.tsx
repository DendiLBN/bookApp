import { Link } from "react-router-dom";

import { BookOpen, Star } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { TFeaturedShelvesProps } from "@/features/home-page/types";

export const FeaturedShelves = ({ books, hasBooks }: TFeaturedShelvesProps) => (
  <Card className="overflow-hidden lg:row-span-2">
    <CardHeader className="flex-row items-start justify-between gap-xs border-b border-app-border bg-app-surface-muted p-4.5">
      <div>
        <p className="m-0 text-xs font-bold text-app-text-muted uppercase">Featured shelves</p>
        <CardTitle className="mt-1">Worth reading this week</CardTitle>
      </div>
      <BookOpen className="size-5 text-app-accent" />
    </CardHeader>

    <CardContent className="grid gap-xs p-4.5">
      {books.length > 0 ? (
        books.map((book) => (
          <Link
            className="grid grid-cols-[58px_minmax(0,1fr)] items-center gap-xs rounded-l border border-app-border bg-app-surface p-xs text-inherit no-underline shadow-app-s transition hover:-translate-y-0.5 hover:border-app-accent hover:shadow-app-m sm:grid-cols-[58px_minmax(0,1fr)_auto]"
            key={book._id}
            to={`/book/${book._id}`}
          >
            <div className="grid h-16 w-13 place-items-center overflow-hidden rounded-m bg-app-accent-soft text-app-accent">
              {book.coverImageUrl ? (
                <img
                  alt={book.title}
                  className="h-full w-full object-cover"
                  src={book.coverImageUrl}
                />
              ) : (
                <BookOpen className="size-5" />
              )}
            </div>
            <div className="min-w-0">
              <h3 className="m-0 truncate text-base font-bold text-app-text">{book.title}</h3>
              <p className="m-0 truncate text-app-text-muted">{book.author}</p>
            </div>
            <Badge
              className="col-start-2 gap-1 text-app-warning sm:col-start-auto"
              variant="outline"
            >
              <Star className="size-3.5 fill-current" />
              {book.rate}
            </Badge>
          </Link>
        ))
      ) : hasBooks ? (
        <p className="m-0 text-app-text-muted">
          No featured titles are available for the current preview.
        </p>
      ) : (
        <p className="m-0 text-app-text-muted">
          Add books to the catalog to start building featured shelves.
        </p>
      )}
    </CardContent>
  </Card>
);
