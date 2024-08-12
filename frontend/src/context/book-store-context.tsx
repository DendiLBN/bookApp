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
  searchText: string;
  collapsed: boolean;
  bookList: TBookType[];
  searchTags: string[];
  filteredData: TBookType[];
  setSearchText: Dispatch<SetStateAction<string>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedTags: Dispatch<SetStateAction<string[]>>;
  setFilteredData: Dispatch<SetStateAction<TBookType[]>>;
};

export const BookFormContext = createContext<TBookFormContext | undefined>(
  undefined
);

export const BookFormContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [searchTags, setSelectedTags] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<TBookType[]>([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [bookList, setBookList] = useState<TBookType[]>([]);

  useEffect(() => {
    axios
      .get("/api/books", { params: { page: 1, perPage: 40 } })
      .then((res) => {
        setBookList(res.data.data);
      });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      searchText,
      searchTags,
      filteredData,
      collapsed,
      bookList,
      setSelectedTags,
      setBookList,
      setSearchText,
      setFilteredData,
      setCollapsed,
    }),
    [bookList, collapsed, filteredData, searchTags, searchText]
  );

  return (
    <BookFormContext.Provider value={memoizedValue}>
      {children}
    </BookFormContext.Provider>
  );
};
