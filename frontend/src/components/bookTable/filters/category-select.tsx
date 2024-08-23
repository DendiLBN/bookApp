import { Select } from "antd";

import { categories } from "@/components/bookTable/states/book-categories";

import { TCategorySelectProps } from "@/types/types";

const { Option } = Select;

export const CategorySelect: React.FC<TCategorySelectProps> = ({
  selectedCategories,
  onChange,
}) => (
  <Select
    mode="multiple"
    placeholder="Select Categories"
    onChange={onChange}
    value={selectedCategories}
    style={{ width: "260px" }}
  >
    {categories.map((category) => (
      <Option key={category} value={category}>
        {category}
      </Option>
    ))}
  </Select>
);
