import { Input } from "antd";

import { SearchOutlined } from "@ant-design/icons";

import { TBookSearchProps } from "@/types/types";

export const BookSearch: React.FC<TBookSearchProps> = ({
  searchText,
  onSearch,
}) => (
  <Input
    placeholder="Search..."
    value={searchText}
    onChange={(e) => onSearch(e.target.value)}
    prefix={<SearchOutlined />}
    style={{ marginBottom: 30, width: "200px" }}
  />
);
