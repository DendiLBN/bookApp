import { BookFormContextProvider } from "@/features/book-page/contexts/book-store-context";

import { BookView } from "@/features/book-page/Book";

export const Book = () => (
  <>
    <BookFormContextProvider>
      <BookView />
    </BookFormContextProvider>
  </>
);
