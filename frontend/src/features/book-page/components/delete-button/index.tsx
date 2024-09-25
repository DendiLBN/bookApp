import { Button } from "antd";

import { TDeleteBooksButtonProps } from "@/types/types";

export const DeleteBooksButton: React.FC<TDeleteBooksButtonProps> = ({
  selectedBookRowKeys,
  loading,
  onDelete,
}) => (
  <Button
    type="primary"
    danger
    onClick={onDelete}
    disabled={!selectedBookRowKeys.length || loading}
    loading={loading}
  >
    Delete Selected: <div>{selectedBookRowKeys.length}</div>
  </Button>
);
