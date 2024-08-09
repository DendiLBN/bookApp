import React, { useState } from "react";

import { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Space, TableProps, Input, Button, Select, Tag } from "antd";

import { TBookType } from "@/landing-page/types/index";

import { tags } from "@/landing-page/states/book-tags";
import { tagColors } from "@/landing-page/states/book-tags-colors";

const { Option } = Select;

const allTags = Object.values(tags).flat();

const columns: ColumnsType<TBookType> = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },

  {
    title: "Author",
    dataIndex: "author",
    key: "author",
  },
  {
    title: "Tags",
    dataIndex: "tags",
    key: "tags",
    render: (tags: string[]) => (
      <>
        {tags.map((tag) => (
          <Tag color={tagColors[tag] || "default"} key={tag}>
            {tag}
          </Tag>
        ))}
      </>
    ),
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Space size="middle">
        <Button type="primary">Edit</Button>
        <Button type="primary">Delete</Button>
      </Space>
    ),
  },
];

const initialData: TBookType[] = [
  {
    key: "1",
    name: "Teodor",
    rate: 10,
    author: "Kowalski Janusz",
    tags: ["Historical Fiction", "Romance"],
  },
];

export const Books: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [searchText, setSearchText] = useState<string>("");
  const [searchTags, setSelectedTags] = useState<string[]>([]);
  const [filteredData, setFilteredData] = useState<TBookType[]>(initialData);

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDeleteItems = () => {
    setFilteredData((prevData) =>
      prevData.filter((item) => !selectedRowKeys.includes(item.key))
    );
    setSelectedRowKeys([]);
  };

  const handleTagChange = (tags: string[]) => {
    setSelectedTags(tags);
    onSearch(searchText, tags);
  };

  const onSearch = (value: string, tags: string[] = searchTags) => {
    setSearchText(value);
    let filtered = initialData.filter(
      (item) =>
        item.name.toLowerCase().includes(value.toLowerCase()) ||
        item.author.toLowerCase().includes(value.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(value.toLowerCase()))
    );

    if (tags.length > 0) {
      filtered = filtered.filter((item) =>
        tags.every((tag) => item.tags.includes(tag))
      );
    }
    setFilteredData(filtered);
  };

  const rowSelection: TableProps<TBookType>["rowSelection"] = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changeableRowKeys: React.Key[]) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 === 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changeableRowKeys: React.Key[]) => {
          const newSelectedRowKeys = changeableRowKeys.filter(
            (_, index) => index % 2 !== 0
          );
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <div>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 30, width: "250px" }}
      />
      <Select
        mode="multiple"
        placeholder="Select Tags"
        onChange={handleTagChange}
        style={{ width: "250px", marginBottom: 30 }}
      >
        {allTags.map((tag) => (
          <Option key={tag} value={tag}>
            {tag}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        danger
        onClick={handleDeleteItems}
        style={{ margin: "20px " }}
        disabled={selectedRowKeys.length === 0}
      >
        Delete Selected
      </Button>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5, position: ["bottomCenter"] }}
      />
    </div>
  );
};
