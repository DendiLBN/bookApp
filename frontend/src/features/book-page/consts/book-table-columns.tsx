import { Button, Rate, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import {
  FrownOutlined,
  MehOutlined,
  SmileOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import { TBookBody } from "@/types/types";

import avatar from "@/assets/images/avatar.jpg";
import { tagColors } from "@/features/book-page/consts/book-categories-colors";

// TODO avatars fix on backend images.
// TODO change icons smile for stars or numbers

const customIcons: { [key: number]: JSX.Element } = {
  1: <FrownOutlined />,
  2: <MehOutlined />,
  3: <SmileOutlined />,
};

export const columns: ColumnsType<TBookBody> = [
  {
    title: "",
    dataIndex: "avatar",
    width: 50,
    render: (_, record) => (
      <img
        src={avatar}
        alt={record.title}
        style={{ width: "90px", height: "auto", borderRadius: "4px" }}
      />
    ),
  },

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
  {
    title: "Action Buttons",
    dataIndex: "actions",
    key: "Actions",
    render: () => {
      return (
        <Space>
          <Button type="primary" icon={<ShoppingCartOutlined />}>
            Add to shopping cart
          </Button>
        </Space>
      );
    },
  },
];
