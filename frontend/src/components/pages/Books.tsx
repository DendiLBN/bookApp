import { BookFormContextProvider } from "../context/book-store-context";
import { BookList } from "@/api/book-related/books-API";

export const Book = () => (
  <>
    <BookFormContextProvider>
      <BookList />
    </BookFormContextProvider>
  </>
);
