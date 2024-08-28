import { useEffect } from "react";

import { TUseFilteredBooksProps } from "@/types/types";

export const useFilteredBooks = ({
  searchText,
  selectedCategories,
  bookList,
  setFilteredBooks,
}: TUseFilteredBooksProps) => {
  useEffect(() => {
    const lowerSearchText = searchText.toLowerCase();
    const filtered = bookList.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerSearchText) ||
        item.author.toLowerCase().includes(lowerSearchText) ||
        item.rate.toString().includes(lowerSearchText)
    );

    const result = selectedCategories.length
      ? filtered.filter((book) =>
          book.category.some((category) =>
            selectedCategories.includes(category)
          )
        )
      : filtered;

    setFilteredBooks(result);
  }, [searchText, selectedCategories, bookList, setFilteredBooks]);
};
