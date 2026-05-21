import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

import { BOOK_PAGE_SIZE_OPTIONS } from "@/features/book-page/consts/book-pagination";

type TBookCatalogPaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  onChangePagination: (page: number, pageSize: number) => void;
};

export const BookCatalogPagination = ({
  currentPage,
  itemsPerPage,
  onChangePagination,
  totalItems,
}: TBookCatalogPaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;

  return (
    <Card className="flex flex-col items-center justify-between gap-xs p-xs shadow-app-s sm:flex-row">
      <div>
        <p className="m-0 text-sm font-bold text-app-text">
          Page {currentPage} of {totalPages}
        </p>
        <p className="m-0 text-xs text-app-text-muted">{totalItems} books in this result</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-xs">
        <label className="flex items-center gap-2 text-sm text-app-text-muted">
          Per page
          <select
            className="h-10 rounded-m border border-app-border bg-app-surface px-xs text-app-text"
            onChange={(event) => onChangePagination(1, Number(event.target.value))}
            value={itemsPerPage}
          >
            {BOOK_PAGE_SIZE_OPTIONS.map((pageSizeOption) => (
              <option key={pageSizeOption} value={pageSizeOption}>
                {pageSizeOption}
              </option>
            ))}
          </select>
        </label>
        <Button
          disabled={isFirstPage}
          onClick={() => onChangePagination(currentPage - 1, itemsPerPage)}
          type="button"
          variant="outline"
        >
          <ChevronLeft />
          Previous
        </Button>
        <Button
          disabled={isLastPage}
          onClick={() => onChangePagination(currentPage + 1, itemsPerPage)}
          type="button"
          variant="outline"
        >
          Next
          <ChevronRight />
        </Button>
      </div>
    </Card>
  );
};
