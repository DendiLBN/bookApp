import { useEffect } from "react";

import axios from "axios";

import { SearchOutlined } from "@ant-design/icons";
import { Table, TableProps, Input, Button, Select } from "antd";

import { columns } from "@/components/bookComponents/states/book-header-columns";

import { categories } from "@/components/bookComponents/states/book-categories";

import { useBooksFormContext } from "@/context/hooks/use-form-context";

import { TBookType } from "types/types";

const { Option } = Select;

const allCategories = categories;

export const BookView: React.FC = () => {
  const {
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
    console.log(newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleDeleteItems = () => {
    const deleteRequests = selectedRowKeys.map((id) =>
      axios.delete(`/api/books/${id}`)
    );

    // TODO array request instead each element!
    // TODO add stars to rate 1-5

    Promise.all(deleteRequests)
      .then(() => {
        setFilteredData((prevData) =>
          prevData.filter((item) => !selectedRowKeys.includes(item._id))
        );

        setSelectedRowKeys([]);
      })
      .catch((error) => {
        console.error("Error during deleted selected:", error);
      });
  };

  useEffect(() => {
    setFilteredData(bookList);
  }, [bookList, setFilteredData]);

  const handleCategoriesChange = (selectedCategories: string[]) => {
    setSelectedCategories(selectedCategories);
    onSearch(searchText);
  };

  const showSelectedCountDelete = selectedRowKeys.length;

  const onSearch = (value: string) => {
    setSearchText(value);
    const filtered = bookList.filter(
      (item) =>
        item.title.toLowerCase().includes(value.toLowerCase()) ||
        item.author.toLowerCase().includes(value.toLowerCase()) ||
        item.category[0].toLowerCase().includes(value.toLowerCase())
    );
    console.log("result", filtered);
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
      <>
        <Select
          mode="multiple"
          placeholder="Select Categories"
          onChange={handleCategoriesChange}
          style={{ width: "250px", margin: 15 }}
        >
          {allCategories.map((categories) => (
            <Option key={categories} value={categories}>
              {categories}
            </Option>
          ))}
        </Select>
      </>
      <Button
        type="primary"
        danger
        onClick={handleDeleteItems}
        disabled={selectedRowKeys.length === 0}
      >
        Delete Selected: <div>{showSelectedCountDelete}</div>
      </Button>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filteredData.map((book) => ({
          ...book,
          key: book._id,
        }))}
        pagination={{ pageSize: 20, position: ["bottomCenter"] }}
      />
    </div>
  );
};
