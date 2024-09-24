import React, {
  useState,
  createContext,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
  Key,
} from "react";

import { TBookBody } from "@/types/types";

export type TBookFormContext = {
  bookSearchText: string;
  isSidebarCollapsed: boolean;
  selectedBookRowKeys: Key[];
  fetchBookList: TBookBody[];
  filteredBookList: TBookBody[];
  selectedCategories: string[];
  setBookSearchText: Dispatch<SetStateAction<string>>;
  setIsSidebarCollapsed: Dispatch<SetStateAction<boolean>>;
  setFetchBookList: Dispatch<SetStateAction<TBookBody[]>>;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  setFilteredBookList: Dispatch<SetStateAction<TBookBody[]>>;
  setSelectedBookRowKeys: Dispatch<SetStateAction<Key[]>>;
};

export const BookFormContext = createContext<TBookFormContext | undefined>(
  undefined
);

export const BookFormContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookSearchText, setBookSearchText] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredBookList, setFilteredBookList] = useState<TBookBody[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState<boolean>(false);
  const [fetchBookList, setFetchBookList] = useState<TBookBody[]>([]);
  const [selectedBookRowKeys, setSelectedBookRowKeys] = useState<Key[]>([]);

  const memoizedValue = useMemo(
    () => ({
      selectedBookRowKeys,
      bookSearchText,
      selectedCategories,
      filteredBookList,
      isSidebarCollapsed,
      fetchBookList,
      setSelectedCategories,
      setFetchBookList,
      setBookSearchText,
      setFilteredBookList,
      setIsSidebarCollapsed,
      setSelectedBookRowKeys,
    }),
    [
      selectedBookRowKeys,
      bookSearchText,
      selectedCategories,
      filteredBookList,
      isSidebarCollapsed,
      fetchBookList,
    ]
  );

  return (
    <BookFormContext.Provider value={memoizedValue}>
      {children}
    </BookFormContext.Provider>
  );
};
