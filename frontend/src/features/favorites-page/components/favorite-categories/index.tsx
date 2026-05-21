import { Badge } from "@/components/ui/Badge";

type TFavoriteCategoriesProps = {
  categories: string[];
};

export const FavoriteCategories = ({ categories }: TFavoriteCategoriesProps) => (
  <section className="rounded-m border border-app-border bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))] p-s text-app-text shadow-app-s">
    <strong>Saved categories</strong>
    <div className="mt-xs flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge key={category} variant="secondary">
          {category}
        </Badge>
      ))}
    </div>
  </section>
);
