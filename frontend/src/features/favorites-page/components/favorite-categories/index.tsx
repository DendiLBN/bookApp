import { Space, Tag } from "antd";

type TFavoriteCategoriesProps = {
  categories: string[];
};

export const FavoriteCategories = ({ categories }: TFavoriteCategoriesProps) => (
  <section className="rounded-m border border-app-border bg-[linear-gradient(180deg,var(--color-surface),var(--color-surface-muted))] p-s text-app-text shadow-app-s">
    <Space direction="vertical" size={8}>
      <strong>Saved categories</strong>
      <Space wrap>
        {categories.map((category) => (
          <Tag color="green" key={category}>
            {category}
          </Tag>
        ))}
      </Space>
    </Space>
  </section>
);
