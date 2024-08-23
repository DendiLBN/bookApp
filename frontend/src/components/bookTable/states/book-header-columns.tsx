import { Rate, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { TBookType } from "types/types";
import { tagColors } from "./book-categories-colors";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";

// TODO Filter authors by names

const customIcons: { [key: number]: JSX.Element } = {
  1: <FrownOutlined />,
  2: <MehOutlined />,
  3: <SmileOutlined />,
  4: <SmileOutlined />,
};

export const columns: ColumnsType<TBookType> = [
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.rate - b.rate,
    render: (_, record) => (
      <Rate
        defaultValue={record.rate}
        character={({ index = 0 }) => customIcons[index + 1]}
      />
    ),
  },
  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Category",
    dataIndex: "category",
    key: "category",
    render: (_, { category }) => {
      if (!category) return null;
      return (
        <>
          {category.map((cat) => {
            const color = tagColors[cat] || "geekblue";
            return (
              <Tag color={color} key={cat}>
                {cat}
              </Tag>
            );
          })}
        </>
      );
    },
  },
];
