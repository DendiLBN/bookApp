import { Key } from "react";

import axios from "axios";

import { Spin, Table, TableProps } from "antd";

import { columns } from "@/components/bookTable/states/book-table-columns";

import { useBooksFormContext } from "@/context/hooks/use-form-context";

import { BookSearch } from "@/components/bookTable/filters/book-search";

import { CategorySelect } from "@/components/bookTable/filters/category-select";

import { DeleteBooksButton } from "@/components/bookTable/buttons/delete-books-button";

import { useFilteredBooks } from "@/components/bookTable/hooks/useFilteredBooks";

import { TBookType } from "@/types/types";

export const BookView: React.FC = () => {
  const {
    loading,
    selectedCategories,
    selectedRowKeys,
    filteredBooks,
    searchText,
    bookList,
    setLoading,
    setSearchText,
    setFilteredBooks,
    setSelectedCategories,
    setSelectedRowKeys,
  } = useBooksFormContext();

  useFilteredBooks({
    searchText,
    selectedCategories,
    bookList,
    setFilteredBooks,
  });

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    if (newSelectedRowKeys.length <= 20) {
      setSelectedRowKeys(newSelectedRowKeys);
    } else {
      console.log("Maximum you can select 20 books");
    }
  };

  const handleDeleteBooksAsArray = async () => {
    if (!selectedRowKeys.length) return;

    setLoading(true);

    try {
      await axios.post("/api/books/delete-multiple-id", {
        ids: selectedRowKeys,
      });

      setFilteredBooks((prevData) =>
        prevData.filter((item) => !selectedRowKeys.includes(item._id))
      );
      setSelectedRowKeys([]);
    } catch (error) {
      console.error("Error during deleting selected items:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1300);
    }
  };

  const handleCategoriesLimit = (select: string[]) => {
    if (select.length <= 2) {
      setSelectedCategories(select);
    }
  };

  const rowSelection: TableProps<TBookType>["rowSelection"] = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          gap: 15,
        }}
      >
        <BookSearch searchText={searchText} onSearch={setSearchText} />
        <CategorySelect
          selectedCategories={selectedCategories}
          onChangeCategories={handleCategoriesLimit}
        />
        <div style={{ marginLeft: "auto" }}>
          <DeleteBooksButton
            selectedRowKeys={selectedRowKeys}
            loading={loading}
            onDelete={handleDeleteBooksAsArray}
          />
        </div>
      </div>

      <Spin tip="Loading..." size="large" spinning={loading}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredBooks.map((book) => ({
            ...book,
            key: book._id,
          }))}
          pagination={{
            position: ["bottomCenter"],
            showSizeChanger: true,
            defaultPageSize: 20,
          }}
        />
      </Spin>
    </div>
  );
};
