import { Key, useEffect } from "react";
import { Spin, Table, TableProps } from "antd";

import { columns } from "@/components/book-view/states/book-table-columns";
import { useBooksFormContext } from "@/context/hooks/use-form-book-context";
import { BookSearch } from "@/components/book-view/filters/book-search";
import { CategorySelect } from "@/components/book-view/filters/category-select";
import { DeleteBooksButton } from "@/components/book-view/buttons/delete-books-button";
import { useFilteredBooks } from "@/components/book-view/hooks/useFilteredBooks";
import { TBookBody } from "@/types/types";
import { useNotificationContext } from "@/context/hooks/use-notification-context";
import { UseFetchBodyBooks } from "./hooks/useFetchBooksList";

export const BookView: React.FC = () => {
  const { loading, openNotification } = useNotificationContext();

  const {
    fetchBooksList,
    handleDeleteBooksAsArray,
    currentPage,
    itemsPerPage,
  } = UseFetchBodyBooks();

  const {
    selectedCategories,
    selectedBookRowKeys,
    filteredBookList,
    bookSearchText,
    fetchBookList,
    setBookSearchText,
    setFilteredBookList,
    setSelectedCategories,
    setSelectedBookRowKeys,
    setItemsPerPage,
    setCurrentPage,
  } = useBooksFormContext();

  useFilteredBooks({
    bookSearchText,
    selectedCategories,
    fetchBookList,
    setFilteredBookList,
  });

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    if (newSelectedRowKeys.length <= 20) {
      setSelectedBookRowKeys(newSelectedRowKeys);
    } else {
      openNotification(
        "topRight",
        "error",
        "Cannot select more than 20 books.",
        true
      );
    }
  };

  useEffect(() => {
    fetchBooksList();
  }, [fetchBooksList, currentPage, itemsPerPage]);

  const handleChangePagination = (page: number, pageSize: number) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
  };

  const rowSelection: TableProps<TBookBody>["rowSelection"] = {
    selectedRowKeys: selectedBookRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 15 }}>
        <BookSearch
          bookSearchText={bookSearchText}
          onSearch={setBookSearchText}
        />
        <CategorySelect
          selectedCategories={selectedCategories}
          onChangeCategories={setSelectedCategories}
        />
        <div style={{ marginLeft: "auto" }}>
          <DeleteBooksButton
            selectedBookRowKeys={selectedBookRowKeys}
            loading={loading}
            onDelete={handleDeleteBooksAsArray}
          />
        </div>
      </div>

      <Spin tip="Loading..." size="large" spinning={loading}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={filteredBookList.map((book) => ({
            ...book,
            key: book._id,
          }))}
          pagination={{
            position: ["bottomCenter"],
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: [10, 20, 30, 40],
            current: currentPage,
            pageSize: itemsPerPage,
            onChange: handleChangePagination,
          }}
        />
      </Spin>
    </div>
  );
};
