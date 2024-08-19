import { Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import { TBookType } from "types/types";
import { tagColors } from "./book-categories-colors";

export const columns: ColumnsType<TBookType> = [
  {
    title: "Title",
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
  // {
  //   title: "Action Buttons",
  //   key: "action-buttons",
  //   render: (_, record) => (
  //     <Space size="middle">
  //       <Button onClick={() => handleEdit(record.key)}>Edit</Button>
  //       <Button onClick={() => handleDelete(record.key)} danger>
  //         Delete
  //       </Button>
  //     </Space>
  //   ),
  // },
];
