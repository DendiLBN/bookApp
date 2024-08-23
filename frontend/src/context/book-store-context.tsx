import React, {
  useState,
  createContext,
  useMemo,
  FC,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

import { TBookType } from "@/types/types";

import axios from "axios";

export type TBookFormContext = {
  searchText: string;
  searchCategory: string[];
  collapsed: boolean;
  loading: boolean;
  selectedRowKeys: React.Key[];
  bookList: TBookType[];
  filteredBooks: TBookType[];
  error: string | null;
  setError: Dispatch<SetStateAction<string | null>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setSearchText: Dispatch<SetStateAction<string>>;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
  setBookList: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedCategories: Dispatch<SetStateAction<string[]>>;
  setFilteredBooks: Dispatch<SetStateAction<TBookType[]>>;
  setSelectedRowKeys: Dispatch<SetStateAction<React.Key[]>>;
};

export const BookFormContext = createContext<TBookFormContext | undefined>(
  undefined
);

export const BookFormContextProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [searchText, setSearchText] = useState<string>("");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
  const [searchCategory, setSelectedCategories] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<TBookType[]>([]);
=======
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<TBookType[]>([]);
>>>>>>> Stashed changes
=======
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<TBookType[]>([]);
>>>>>>> Stashed changes
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [bookList, setBookList] = useState<TBookType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
<<<<<<< Updated upstream
<<<<<<< Updated upstream
    axios
      .get("/api/books", {
        params: { page: 1, perPage: 40 },
      })
      .then((res) => {
=======
=======
>>>>>>> Stashed changes
    const fetchBooks = async () => {
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
<<<<<<< Updated upstream
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        setBookList(res.data.data);
      } catch (error) {
        setError("An error occurred while fetching books.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [searchText, selectedCategories]);

  const memoizedValue = useMemo(
    () => ({
      error,
      loading,
      selectedRowKeys,
      searchText,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      searchCategory,
      filteredData,
=======
      selectedCategories,
      filteredBooks,
>>>>>>> Stashed changes
=======
      selectedCategories,
      filteredBooks,
>>>>>>> Stashed changes
      collapsed,
      bookList,
      setLoading,
      setError,
      setSelectedCategories,
      setBookList,
      setSearchText,
      setFilteredBooks,
      setCollapsed,
      setSelectedRowKeys,
    }),
    [
      error,
      loading,
      bookList,
      collapsed,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
      filteredData,
      searchCategory,
=======
=======
>>>>>>> Stashed changes
      filteredBooks,
      selectedCategories,
>>>>>>> Stashed changes
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
