import { Key, useEffect } from "react";

import { Spin, Table, TableProps } from "antd";

import { DeleteBooksButton } from "@/features/book-page/components/delete-button/index";

import { UseFetchBodyBooks } from "./hooks/useFetchBooksList";

import { useDeleteAsArrayBooks } from "./hooks/useDeleteAsArrayBooks";
import { useFilteredBooks } from "./hooks/useFilteredBooks";

import { useBooksFormContext } from "./contexts/hooks/use-form-book-context";
import { useNotificationContext } from "@/common/contexts/hooks/use-notification-context";

import { TBookBody } from "@/types/types";

import { BookSearch } from "./components/filters/book-search";

import { CategorySelect } from "@/features/book-page/components/filters/category-select";

import { columns } from "@/features/book-page/consts/book-table-columns";
import { UsePagination } from "@/common/hooks/pagination/usePagination";

export const BookView: React.FC = () => {
  const { loading, openNotification } = useNotificationContext();

  const { fetchBooksList } = UseFetchBodyBooks();

  const { handleDeleteArray } = useDeleteAsArrayBooks();

  const { handleChangePagination, currentPage, itemsPerPage } = UsePagination();

  const {
    selectedCategories,
    selectedBookRowKeys,
    bookList,
    bookSearchText,
    fetchBookList,
    setBookSearchText,
    setBookList,
    setSelectedCategories,
    setSelectedBookRowKeys,
  } = useBooksFormContext();

  useFilteredBooks({
    bookSearchText,
    selectedCategories,
    fetchBookList,
    setBookList,
  });

  const onSelectChange = (newSelectedRowKeys: Key[]) => {
    if (newSelectedRowKeys.length <= 20) {
      setSelectedBookRowKeys(newSelectedRowKeys);
    } else {
      openNotification(
        "topRight",
        "error",
        "An error occurred while selecting books. You can select up to 20 books.",
        true
      );
    }
  };

  useEffect(() => {
    fetchBooksList();
  }, [fetchBooksList, currentPage, itemsPerPage]);

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
            onDelete={handleDeleteArray}
          />
        </div>
      </div>

      <Spin tip="Loading..." size="large" spinning={loading}>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={bookList.map((book) => ({
            ...book,
            key: book._id,
          }))}
          pagination={{
            position: ["bottomCenter"],
            showSizeChanger: true,
            defaultPageSize: 10,
            pageSizeOptions: [10, 20],
            current: currentPage,
            pageSize: itemsPerPage,
            onChange: handleChangePagination,
          }}
        />
      </Spin>
    </div>
  );
};
