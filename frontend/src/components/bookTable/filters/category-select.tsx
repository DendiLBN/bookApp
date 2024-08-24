import { Select } from "antd";

import { categories } from "@/components/bookTable/states/book-categories";

import { TCategorySelectProps } from "@/types/types";

const { Option } = Select;

export const CategorySelect: React.FC<TCategorySelectProps> = ({
  selectedCategories,
  onChangeCategories,
}) => (
  <Select
    mode="multiple"
    placeholder="Select Categories"
    onChange={onChangeCategories}
    value={selectedCategories}
    style={{ width: "300px", height: 32 }}
    size="small"
  >
    {categories.map((category) => (
      <Option key={category} value={category}>
        {category}
      </Option>
    ))}
  </Select>
);
