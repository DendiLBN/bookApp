import { useFetchBooksQuery } from "@/common/store/api/books";
import { useBooksFormContext } from "@/context/hooks/use-form-book-context";
import { useNotificationContext } from "@/context/hooks/use-notification-context";
import axios from "axios";
import { useCallback } from "react";

export const UseFetchBodyBooks = () => {
  const { setLoading, setError } = useNotificationContext();
  const {
    selectedCategories,
    selectedBookRowKeys,
    bookSearchText,
    setFetchBookList,
    setSelectedBookRowKeys,
  } = useBooksFormContext();

  const { data: fetchedBookList = [] } = useFetchBooksQuery({
    page: 1,
    perPage: 100,
    searchString: bookSearchText,
    category: selectedCategories,
  });

  // TODO ADD ERRORR HANDLER & LOADING SPINNER

  const fetchBooksList = useCallback(async () => {
    setLoading(true);
    try {
      setFetchBookList(fetchedBookList);
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("An error occurred while fetching books.");
    } finally {
      setLoading(false);
    }
  }, [setLoading, setFetchBookList, fetchedBookList, setError]);

  const handleDeleteBooksAsArray = async () => {
    if (!selectedBookRowKeys.length) return;

    setLoading(true);

    try {
      await axios.post("/api/books/delete-multiple-id", {
        ids: selectedBookRowKeys,
      });

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

  return { fetchBooksList, handleDeleteBooksAsArray };
};
