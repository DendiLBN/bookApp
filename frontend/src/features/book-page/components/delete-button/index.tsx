import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { TDeleteBooksButtonProps } from "@/features/book-page/types";

export const DeleteBooksButton: React.FC<TDeleteBooksButtonProps> = ({
  selectedBookRowKeys,
  loading,
  onDelete,
}) => (
  <Button
    disabled={!selectedBookRowKeys.length || loading}
    onClick={onDelete}
    type="button"
    variant="destructive"
  >
    <Trash2 />
    Delete selected
    <span className="rounded-full bg-app-surface/20 px-2 py-0.5 text-xs">
      {selectedBookRowKeys.length}
    </span>
  </Button>
);
