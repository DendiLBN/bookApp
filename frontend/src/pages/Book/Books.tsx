import { BookFormContextProvider } from "@/context/book-store-context";
import { BookList } from "@/components/bookComponents/book";

export const Book = () => (
  <>
    <BookFormContextProvider>
      <BookList />
    </BookFormContextProvider>
  </>
);
