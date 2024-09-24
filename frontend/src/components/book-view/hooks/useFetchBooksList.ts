import { useFetchBooksQuery } from "@/common/store/api/books";
import { useBooksFormContext } from "@/context/hooks/use-form-book-context";
import { useNotificationContext } from "@/context/hooks/use-notification-context";
import axios from "axios";
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
      "An error occurred while fetch books!. Please refresh page.",
      false
    );
  }, [openNotification]);

  const fetchBooksList = useCallback(async () => {
    setLoading(true);
    try {
      setFetchBookList(fetchedBookList);
    } catch {
      handleError();
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFetchBookList, fetchedBookList, handleError]);

  const handleDeleteBooksAsArray = async () => {
    if (!selectedBookRowKeys.length) return;

    setLoading(true);

    try {
      await axios.post("/api/books/delete-multiple-id", {
        ids: selectedBookRowKeys,
      });
      console.log("Deleted books:", selectedBookRowKeys);
      setFetchBookList((prevData) =>
        prevData.filter((item) => !selectedBookRowKeys.includes(item._id))
      );
      setSelectedBookRowKeys([]);
    } catch (error) {
      console.error("Error during deleting selected items:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1300);
    }
  };

  return {
    fetchBooksList,
    handleDeleteBooksAsArray,
    currentPage,
    itemsPerPage,
  };
};
