import { Key } from "react";
import { TLoginUserResponse, TRegisterUserResponse } from "./api/user";

export type TBookBody = {
  _id: string;
  category: string[];
  key: string;
  title: string;
  rate: number;
  author: string;
  tags: string[];
  avatar: string;
};

export type IBookSearchProps = {
  searchText: string;
  value: string;
};

export type TDeleteBooksButtonProps = {
  selectedRowKeys: Key[];
  loading: boolean;
  onDelete: () => void;
};

export type TUseFilteredBooksProps = {
  searchText: string;
  selectedCategories: string[];
  bookList: TBookBody[];
  setFilteredBooks: (filteredBooks: TBookBody[]) => void;
};

export type TCategorySelectProps = {
  selectedCategories: string[];
  onChangeCategories: (select: string[]) => void;
};

export type TBookSearchProps = {
  searchText: string;
  onSearch: (value: string) => void;
};

export type TRegisterUserRequestBody = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

export type TRegisterUserParams = {
  data: TRegisterUserRequestBody;
  onSuccess: (data: TRegisterUserResponse) => void;
  onError: () => void;
};

export type TLoginUserRequestBody = {
  email: string;
  password: string;
};

export type TLoginUserParams = {
  data: TLoginUserRequestBody;
  onSuccess: (data: TLoginUserResponse) => void;
  onError: () => void;
};

export type TTokens = {
  accessToken: string;
};
