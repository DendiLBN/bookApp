import { BookFormContextProvider } from "@/context/book-store-context";

import { BookView } from "@/components/book-view/book-view";

export const Book = () => (
  <>
    <BookFormContextProvider>
      <BookView />
    </BookFormContextProvider>
  </>
);
