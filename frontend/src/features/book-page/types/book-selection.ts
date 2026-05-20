import type { Key } from "react";

export type TBookRowSelection = {
  selectedRowKeys: Key[];
  onChange: (selectedBookRowKeys: Key[]) => void;
};
