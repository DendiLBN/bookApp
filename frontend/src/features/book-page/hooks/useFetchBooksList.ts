import { useCallback } from "react";

import { useFetchBooksQuery } from "@/store/api/books";

import { useBooksFormContext } from "../contexts/hooks/use-form-book-context";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";
import { UsePagination } from "@/common/hooks/pagination/usePagination";

export const UseFetchBodyBooks = () => {
  const { setLoading, openNotification } = useNotificationContext();

  const { currentPage, itemsPerPage } = UsePagination();

  const { selectedCategories, bookSearchText, setFetchBookList } =
    useBooksFormContext();

  const { data: fetchedBookList = [] } = useFetchBooksQuery({
    page: currentPage,
    perPage: itemsPerPage,
    searchString: bookSearchText,
    category: selectedCategories,
  });

  const handleError = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while fetching books! Please refresh the page.",
      false
    );
  }, [openNotification]);

  const fetchBooksList = useCallback(async () => {
    setLoading(true);
    try {
      setFetchBookList(fetchedBookList);
      setLoading(false);
    } catch {
      handleError();
    }
  }, [setLoading, setFetchBookList, fetchedBookList, handleError]);

  return {
    fetchBooksList,
    currentPage,
    itemsPerPage,
  };
};
