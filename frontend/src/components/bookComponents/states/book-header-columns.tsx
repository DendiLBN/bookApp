import { ColumnsType } from "antd/es/table";
import { TBookType } from "types/types";
import { tagColors } from "./book-categories-colors";
import { Tag } from "antd";

export const columns: ColumnsType<TBookType> = [
  {
    title: "Book Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Rate",
    dataIndex: "rate",
    key: "rate",
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
      if (!category) {
        return;
      }
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
  {
    title: "Action Buttons",
    key: "action buttons",
    // render: (_, record) => (
    //   <Space size="middle">
    //     <button>Edit</button>
    //     <button>Delete</button>
    //   </Space>
    // render:
    // TODO add edit/delete buttons
    // ),
  },
];
