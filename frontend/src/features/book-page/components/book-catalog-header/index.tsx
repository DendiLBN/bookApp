import type { Key } from "react";

import { BookOpen, Heart, LibraryBig, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

import type { TBook } from "@/features/book-page/types";

type TBookCatalogHeaderProps = {
  bookList: TBook[];
  favoriteBookIds: string[];
  isAdmin: boolean;
  selectedBookRowKeys: Key[];
};

export const BookCatalogHeader = ({
  bookList,
  favoriteBookIds,
  isAdmin,
  selectedBookRowKeys,
}: TBookCatalogHeaderProps) => (
  <section className="relative overflow-hidden rounded-l border border-app-border bg-[linear-gradient(135deg,var(--color-surface)_0%,color-mix(in_srgb,var(--color-brand-soft)_58%,var(--color-surface))_48%,color-mix(in_srgb,var(--color-accent-soft)_42%,var(--color-surface))_100%)] p-sm text-app-text shadow-app-m md:p-l">
    <div className="absolute top-0 right-0 hidden h-full w-1/2 bg-[radial-gradient(circle_at_75%_20%,color-mix(in_srgb,var(--color-accent)_14%,transparent),transparent_58%)] lg:block" />
    <div className="relative grid gap-m lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
      <div className="max-w-190">
        <Badge className="mb-xs gap-2 rounded-m px-xs py-1" variant="default">
          <Sparkles className="size-3.5" />
          Book catalog
        </Badge>
        <h1 className="m-0 text-[1.55rem] leading-tight font-extrabold text-app-text sm:text-[1.8rem] md:text-[2.45rem]">
          Discover, curate and manage your shelves
        </h1>
        <p className="mt-xs mb-0 max-w-165 text-base leading-7 text-app-text-muted">
          A cleaner catalog workspace for browsing books, filtering stock and preparing store
          updates without losing context.
        </p>
      </div>
      <div className="grid gap-xs sm:grid-cols-3 lg:min-w-125">
        <Card className="bg-app-surface/90 p-xs shadow-app-s">
          <div className="flex items-center justify-between gap-xs">
            <LibraryBig className="size-5 text-app-brand" />
            <span className="text-2xl font-extrabold text-app-text">{bookList.length}</span>
          </div>
          <p className="mt-2 mb-0 text-xs font-semibold text-app-text-muted uppercase">
            Visible books
          </p>
        </Card>
        <Card className="bg-app-surface/90 p-xs shadow-app-s">
          <div className="flex items-center justify-between gap-xs">
            <Heart className="size-5 text-app-accent" />
            <span className="text-2xl font-extrabold text-app-text">
              {isAdmin ? selectedBookRowKeys.length : favoriteBookIds.length}
            </span>
          </div>
          <p className="mt-2 mb-0 text-xs font-semibold text-app-text-muted uppercase">
            {isAdmin ? "Selected" : "Favorites"}
          </p>
        </Card>
        <Card className="bg-app-surface/90 p-xs shadow-app-s">
          <div className="flex items-center justify-between gap-xs">
            <BookOpen className="size-5 text-app-warning" />
            <span className="text-2xl font-extrabold text-app-text">
              {isAdmin ? "Admin" : "Shop"}
            </span>
          </div>
          <p className="mt-2 mb-0 text-xs font-semibold text-app-text-muted uppercase">
            Catalog mode
          </p>
        </Card>
      </div>
    </div>
  </section>
);
