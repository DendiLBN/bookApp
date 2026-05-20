import { Check } from "lucide-react";

import { Button } from "@/components/ui/Button";

import { cn } from "@/common/utils/cn";
import { categories } from "@/features/book-page/consts/book-categories";
import { TCategorySelectProps } from "@/features/book-page/types";

const MAX_SELECTED_CATEGORIES = 2;

export const CategorySelect: React.FC<TCategorySelectProps> = ({
  selectedCategories,
  onChangeCategories,
}) => {
  const handleToggleCategory = (category: string) => {
    const isSelected = selectedCategories.includes(category);

    if (isSelected) {
      onChangeCategories(
        selectedCategories.filter((selectedCategory) => selectedCategory !== category),
      );
      return;
    }

    if (selectedCategories.length < MAX_SELECTED_CATEGORIES) {
      onChangeCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-2">
      <div className="flex items-center justify-between gap-xs">
        <span className="text-xs font-bold text-app-text-muted uppercase">Shelves</span>
        <span className="text-xs text-app-text-muted">
          {selectedCategories.length}/{MAX_SELECTED_CATEGORIES}
        </span>
      </div>
      <div className="flex max-h-22 flex-wrap gap-2 overflow-y-auto pr-1">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);

          return (
            <Button
              className={cn(
                "h-8 rounded-full px-xs text-xs",
                isSelected ? "border-app-brand bg-app-brand text-app-text-inverse" : undefined,
              )}
              key={category}
              onClick={() => handleToggleCategory(category)}
              type="button"
              variant={isSelected ? "default" : "outline"}
            >
              {isSelected ? <Check className="size-3" /> : null}
              {category}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
