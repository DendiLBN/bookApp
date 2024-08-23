export type TBookType = {
  _id: string;
  category: string[];
  key: string;
  title: string;
  rate: number;
  author: string;
  tags: string[];
};

export type IBookSearchProps = {
  searchText: string;
  value: string;
};

export type TDeleteBooksButtonProps = {
  selectedRowKeys: React.Key[];
  loading: boolean;
  onDelete: () => void;
};

export type TUseFilteredBooksProps = {
  searchText: string;
  selectedCategories: string[];
  bookList: TBookType[];
  setFilteredBooks: (filteredBooks: TBookType[]) => void;
};

export type TCategorySelectProps = {
  selectedCategories: string[];
  onChange: (select: string[]) => void;
};

export type TBookSearchProps = {
  searchText: string;
  onSearch: (value: string) => void;
};
