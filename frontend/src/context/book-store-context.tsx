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

import { TBookType } from "@/types/types";

import axios from "axios";

export type TBookFormContext = {
  searchText: string;
  collapsed: boolean;
  loading: boolean;
  selectedRowKeys: Key[];
  bookList: TBookType[];
  filteredBooks: TBookType[];
  error: string | null;
  selectedCategories: string[];
  user: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  setFilteredBooks: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
  setUser: Dispatch<SetStateAction<string | null>>;
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
  const [user, setUser] = useState<string | null>(null);

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
    ]
  );

  return (
    <BookFormContext.Provider value={memoizedValue}>
      {children}
    </BookFormContext.Provider>
  );
};
