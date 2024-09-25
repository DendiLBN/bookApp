import {
  useDeleteManyBooksMutation,
  useFetchBooksQuery,
} from "@/common/store/api/books";
import { useBooksFormContext } from "@/context/hooks/use-form-book-context";
import { useNotificationContext } from "@/context/hooks/use-notification-context";

import { useCallback } from "react";

export const UseFetchBodyBooks = () => {
  const { setLoading, openNotification } = useNotificationContext();
  const {
    selectedCategories,
    selectedBookRowKeys,
    bookSearchText,
    setFetchBookList,
    setSelectedBookRowKeys,
    currentPage,
    itemsPerPage,
  } = useBooksFormContext();

  const [deleteBooks] = useDeleteManyBooksMutation();

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

  const handleOnSuccesDelete = useCallback(() => {
    openNotification(
      "topRight",
      "success",
      "Book delete successfully!.",
      false
    );
    setSelectedBookRowKeys([]);
  }, [openNotification, setSelectedBookRowKeys]);

  const handleErrorDelete = useCallback(() => {
    openNotification(
      "topRight",
      "error",
      "An error occurred while deleting books! Please try again.",
      false
    );
  }, [openNotification]);

  const handleDeleteBooksAsArray = async () => {
    if (!selectedBookRowKeys.length) return;
    setLoading(true);
    try {
      await deleteBooks(selectedBookRowKeys).unwrap();
      handleOnSuccesDelete();
    } catch (error) {
      handleErrorDelete();
      setLoading(false);
    }
  };

  return {
    fetchBooksList,
    handleDeleteBooksAsArray,
    currentPage,
    itemsPerPage,
  };
};
