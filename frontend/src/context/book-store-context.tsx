import React, {
  useState,
  createContext,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
  Key,
  useCallback,
} from "react";
import axios from "axios";

import { notification } from "antd";

import {
  IconType,
  NotificationPlacement,
} from "antd/es/notification/interface";

import { TBookType, TFetchBodyRegister } from "@/types/types";

export type TBookFormContext = {
  searchText: string;
  collapsed: boolean;
  loading: boolean;
  selectedRowKeys: Key[];
  bookList: TBookType[];
  filteredBooks: TBookType[];
  error: string | null;
  selectedCategories: string[];
  user: TFetchBodyRegister | null;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  setFilteredBooks: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
  setUser: Dispatch<SetStateAction<TFetchBodyRegister | null>>;
};

export const BookFormContext = createContext<TBookFormContext | undefined>(
  undefined
);

export const BookFormContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<TBookType[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [bookList, setBookList] = useState<TBookType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<TFetchBodyRegister | null>(null);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/books", {
        params: {
          page: 1,
          perPage: 100,
          searchString: searchText,
          categories: selectedCategories,
        },
      });
      setBookList(res.data.data);
    } catch (error) {
      setError("An error occurred while fetching books.");
    } finally {
      setLoading(false);
    }
  }, [searchText, selectedCategories]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const openNotification = useCallback(
    (placement: NotificationPlacement, type: IconType, message: string) => {
      if (isNotificationOpen) {
        return;
      }
      setIsNotificationOpen(true);

      api.open({
        type,
        message,
        placement,
        onClick: () => {
          setIsNotificationOpen(false);
        },
        onClose: () => {
          setIsNotificationOpen(false);
        },
      });

      setTimeout(() => {
        setIsNotificationOpen(false);
      }, 3000);
    },
    [isNotificationOpen, api]
  );

  const memoizedValue = useMemo(
    () => ({
      error,
      loading,
      selectedRowKeys,
      searchText,
      selectedCategories,
      filteredBooks,
      collapsed,
      bookList,
      user,
      setLoading,
      setError,
      setSelectedCategories,
      setBookList,
      setSearchText,
      setFilteredBooks,
      setCollapsed,
      openNotification,
      setSelectedRowKeys,
      setUser,
    }),
    [
      error,
      loading,
      selectedRowKeys,
      searchText,
      selectedCategories,
      filteredBooks,
      collapsed,
      bookList,
      user,
      openNotification,
    ]
  );

  return (
    <BookFormContext.Provider value={memoizedValue}>
      {contextHolder}
      {children}
    </BookFormContext.Provider>
  );
};
