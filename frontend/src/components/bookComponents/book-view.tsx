// import { useEffect } from "react";

import axios from "axios";

import { SearchOutlined } from "@ant-design/icons";
import { Table, TableProps, Input, Button, Select } from "antd";

import { columns } from "@/components/bookComponents/states/book-header-columns";
import { categories } from "@/components/bookComponents/states/book-categories";

import { useBooksFormContext } from "@/context/hooks/use-form-context";

import { TBookType } from "types/types";
import { useEffect } from "react";

const { Option } = Select;

export const BookView: React.FC = () => {
  const {
    selectedCategories,
    selectedRowKeys,
    filteredData,
    searchText,
    bookList,
    setSearchText,
    setFilteredData,
    setSelectedCategories,
    setSelectedRowKeys,
  } = useBooksFormContext();

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    if (newSelectedRowKeys.length <= 10) {
      setSelectedRowKeys(newSelectedRowKeys);
    } else {
      console.log("Maximum you can select 10 books");
    }
  };

  const handleDeleteItems = () => {
    if (!selectedRowKeys.length) return;

    axios
      .post("/api/books/delete-multiple-id", { ids: selectedRowKeys })
      .then(() => {
        setFilteredData((prevData) =>
          prevData.filter((item) => !selectedRowKeys.includes(item._id))
        );
        setSelectedRowKeys([]);
      })
      .catch((error) => {
        console.error("Error during deleting selected items:", error);
      });
  };

  const handleCategoriesChange = (select: string[]) => {
    if (select.length <= 2) {
      setSelectedCategories(select);
    }
  };

  // TODO Add rate stars from antd

  useEffect(() => {
    const filtered = bookList.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) ||
        item.author.toLowerCase().includes(searchText.toLowerCase()) ||
        item.rate.toString().includes(searchText.toLowerCase())
    );

    if (selectedCategories.length > 0) {
      setFilteredData(
        filtered.filter((book) =>
          book.category.some((category) =>
            selectedCategories.includes(category)
          )
        )
      );
    } else {
      setFilteredData(filtered);
    }
  }, [searchText, selectedCategories, bookList, setFilteredData]);

  const onSearch = (value: string) => {
    setSearchText(value);
  };

  const rowSelection: TableProps<TBookType>["rowSelection"] = {
    selectedRowKeys,
    onChange: onSelectChange,
    selections: [Table.SELECTION_INVERT, Table.SELECTION_NONE],
  };

  return (
    <div>
      <Input
        placeholder="Search..."
        value={searchText}
        onChange={(e) => onSearch(e.target.value)}
        prefix={<SearchOutlined />}
        style={{ marginBottom: 30, width: "200px" }}
      />
      <Select
        mode="multiple"
        placeholder="Select Categories"
        onChange={handleCategoriesChange}
        value={selectedCategories}
        style={{ width: "260px" }}
      >
        {categories.map((category) => (
          <Option key={category} value={category}>
            {category}
          </Option>
        ))}
      </Select>
      <Button
        type="primary"
        danger
        onClick={handleDeleteItems}
        disabled={selectedRowKeys.length === 0}
      >
        Delete Selected: <div>{selectedRowKeys.length}</div>
      </Button>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData.map((book) => ({
          ...book,
          key: book._id,
        }))}
        pagination={{
          pageSize: 10,
          position: ["bottomCenter"],
          showSizeChanger: false,
        }}
      />
    </div>
  );
};
