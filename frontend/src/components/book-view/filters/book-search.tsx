import { Input } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import { TBookSearchProps } from "@/types/types";

export const BookSearch: React.FC<TBookSearchProps> = ({
  bookSearchText,
  onSearch,
}) => (
  <Input
    placeholder="Search..."
    value={bookSearchText}
    onChange={(e) => onSearch(e.target.value)}
    prefix={<SearchOutlined />}
    style={{ marginBottom: 30, width: "200px" }}
  />
);
