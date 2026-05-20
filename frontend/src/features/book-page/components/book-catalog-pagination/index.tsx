import { Button } from "@/components/ui/Button";

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
    <div className="flex flex-col items-center justify-between gap-xs rounded-l border border-app-border bg-app-surface p-xs shadow-app-s sm:flex-row">
      <p className="m-0 text-sm text-app-text-muted">
        Page {currentPage} of {totalPages}
      </p>
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
          Previous
        </Button>
        <Button
          disabled={isLastPage}
          onClick={() => onChangePagination(currentPage + 1, itemsPerPage)}
          type="button"
          variant="outline"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
