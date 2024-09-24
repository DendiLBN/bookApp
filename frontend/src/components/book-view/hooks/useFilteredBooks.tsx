import { useEffect } from "react";

import { TUseFilteredBooksProps } from "@/types/types";

export const useFilteredBooks = ({
  bookSearchText,
  selectedCategories,
  fetchBookList,
  setFilteredBookList,
}: TUseFilteredBooksProps) => {
  useEffect(() => {
    const lowerSearchText = bookSearchText.toLowerCase();

    const filteredBySearch = fetchBookList.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerSearchText) ||
        item.author.toLowerCase().includes(lowerSearchText) ||
        item.rate.toString().includes(lowerSearchText)
    );

    const filteredByCategories = selectedCategories.length
      ? filteredBySearch.filter((book) =>
          book.category.some((category) =>
            selectedCategories.includes(category)
          )
        )
      : filteredBySearch;

    // Ustawienie przefiltrowanej listy książek
    setFilteredBookList(filteredByCategories);
  }, [bookSearchText, selectedCategories, setFilteredBookList, fetchBookList]);
};
