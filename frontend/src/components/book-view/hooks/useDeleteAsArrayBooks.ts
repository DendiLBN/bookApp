import { useCallback } from "react";

import { useDeleteManyBooksMutation } from "@/common/store/api/books";

import { useBooksFormContext } from "@/context/hooks/use-form-book-context";

import { useNotificationContext } from "@/context/hooks/use-notification-context";

export const useDeleteAsArrayBooks = () => {
  const { setLoading, openNotification } = useNotificationContext();
  const { selectedBookRowKeys, setSelectedBookRowKeys } = useBooksFormContext();

  const [deleteBooks] = useDeleteManyBooksMutation();

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

  const handleDeleteArray = async () => {
    if (!selectedBookRowKeys.length) return;
    setLoading(true);
    try {
      await deleteBooks(selectedBookRowKeys).unwrap();
      handleOnSuccesDelete();
    } catch (error) {
      handleErrorDelete();
    } finally {
      setLoading(false);
    }
  };

  return {
    handleDeleteArray,
  };
};
