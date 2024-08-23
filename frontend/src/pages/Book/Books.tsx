import { BookFormContextProvider } from "@/context/book-store-context";

import { BookView } from "@/components/bookTable/book-view";

export const Book = () => (
  <>
    <BookFormContextProvider>
      <BookView />
    </BookFormContextProvider>
  </>
);
