import { BookFormContextProvider } from "@/context/book-store-context";

import { BookView } from "@/components/bookComponents/book-view";

export const Book = () => (
  <>
    <BookFormContextProvider>
      <BookView />
    </BookFormContextProvider>
  </>
);
