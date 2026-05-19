import { Table, type TableProps } from "antd";

import type { TBook } from "@/features/book-page/types";

type TFavoritesTableProps = {
  books: TBook[];
  columns: TableProps<TBook>["columns"];
};

export const FavoritesTable = ({ books, columns }: TFavoritesTableProps) => (
  <Table
    className="book-page__table"
    columns={columns}
    dataSource={books.map((book) => ({
      ...book,
      key: book._id,
    }))}
    pagination={false}
    scroll={{ x: 900 }}
  />
);
