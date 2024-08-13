import React, {
  useState,
  createContext,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { TBookType } from "../types/types";

import axios from "axios";

export type TBookFormContext = {
  selectedRowKeys: React.Key[];
  searchText: string;
  searchCategory: string[];
  collapsed: boolean;
  bookList: TBookType[];
  filteredData: TBookType[];
  setSearchText: Dispatch<SetStateAction<string>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  setFilteredData: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
};

export const BookFormContext = createContext<TBookFormContext | undefined>(
  undefined
);

export const BookFormContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchCategory, setSelectedCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<TBookType[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [bookList, setBookList] = useState<TBookType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    axios
      .get("/api/books", {
        params: { page: 1, perPage: 40 },
      })
      .then((res) => {
        setBookList(res.data.data);
      });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      selectedRowKeys,
      searchText,
      searchCategory,
      filteredData,
      collapsed,
      bookList,
      setSelectedCategories,
      setBookList,
      setSearchText,
      setFilteredData,
      setCollapsed,
      setSelectedRowKeys,
    }),
    [
      bookList,
      collapsed,
      filteredData,
      searchCategory,
      searchText,
      selectedRowKeys,
    ]
  );

  return (
    <BookFormContext.Provider value={memoizedValue}>
      {children}
    </BookFormContext.Provider>
  );
};
