import { Button } from "antd";

import { TDeleteBooksButtonProps } from "@/types/types";

export const DeleteBooksButton: React.FC<TDeleteBooksButtonProps> = ({
  selectedRowKeys,
  loading,
  onDelete,
}) => (
  <Button
    type="primary"
    danger
    onClick={onDelete}
    disabled={!selectedRowKeys.length || loading}
    loading={loading}
  >
    Delete Selected: <div>{selectedRowKeys.length}</div>
  </Button>
);
