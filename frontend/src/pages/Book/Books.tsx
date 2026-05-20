import { BookFormContextProvider } from "@/common/contexts/book-store-context";

import { BookView } from "@/features/book-page/index";

export const Book = () => (
  <>
    <BookFormContextProvider>
      <BookView />
    </BookFormContextProvider>
  </>
);
