import { useEffect } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/Input";

import { useControledDebounce } from "@/common/hooks/debounce/useControledDebounce";

import { TBookSearchProps } from "@/features/book-page/types";

export const BookSearch: React.FC<TBookSearchProps> = ({ onSearch }) => {
  const { value, debouncedValue, handleDebouncedValue } = useControledDebounce();

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  return (
    <label className="relative w-full md:max-w-80">
      <span className="sr-only">Search books</span>
      <Search className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
      <Input
        className="h-11 pl-xl"
        placeholder="Search title or author"
        value={value}
        onChange={(event) => handleDebouncedValue(event.target.value)}
      />
    </label>
  );
};
