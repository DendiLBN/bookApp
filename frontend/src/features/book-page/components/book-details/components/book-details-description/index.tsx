import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";

import type { TBook } from "@/features/book-page/types";

type TBookDetailsDescriptionProps = {
  book: TBook;
};

export const BookDetailsDescription = ({ book }: TBookDetailsDescriptionProps) => (
  <Card>
    <CardHeader>
      <CardTitle>Catalog details</CardTitle>
    </CardHeader>
    <CardContent className="grid gap-xs">
      <BookDetailRow label="Title" value={book.title} />
      <BookDetailRow label="Author" value={book.author} />
      <BookDetailRow label="Rating" value={`${book.rate}/5`} />
      <BookDetailRow label="Categories" value={book.category?.join(", ") || "None"} />
    </CardContent>
  </Card>
);

type TBookDetailRowProps = {
  label: string;
  value: string;
};

const BookDetailRow = ({ label, value }: TBookDetailRowProps) => (
  <div className="grid gap-1 rounded-m border border-app-border bg-app-surface-muted p-xs sm:grid-cols-[160px_minmax(0,1fr)]">
    <span className="text-sm font-bold text-app-text">{label}</span>
    <span className="min-w-0 text-sm text-app-text-muted">{value}</span>
  </div>
);
