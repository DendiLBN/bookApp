type TFavoritesHeroProps = {
  averageFavoriteRating: string;
  favoriteBooksCount: number;
};

export const FavoritesHero = ({
  averageFavoriteRating,
  favoriteBooksCount,
}: TFavoritesHeroProps) => (
  <section className="relative grid overflow-hidden rounded-m border border-app-border bg-[linear-gradient(135deg,var(--color-brand-soft),var(--color-accent-soft))] p-sm text-app-text shadow-app-m md:grid-cols-[minmax(0,1fr)_auto] md:p-l">
    <div>
      <p className="mb-1 text-xs font-bold text-app-brand uppercase">Saved collection</p>
      <h1 className="m-0 text-[1.55rem] leading-tight font-bold">Favorite books</h1>
      <p className="mt-xs mb-0 max-w-160 leading-6 text-app-text-muted">
        Keep books you want to revisit, compare, or add to your cart later.
      </p>
    </div>
    <div className="mt-sm grid grid-cols-2 gap-xs self-stretch md:mt-0">
      <div className="flex min-w-28 flex-col justify-center rounded-m border border-app-border bg-app-surface p-xs">
        <span className="text-xl font-bold text-app-brand">{favoriteBooksCount}</span>
        <p className="m-0 text-app-text-muted">Saved books</p>
      </div>
      <div className="flex min-w-28 flex-col justify-center rounded-m border border-app-border bg-app-surface p-xs">
        <span className="text-xl font-bold text-app-brand">{averageFavoriteRating}</span>
        <p className="m-0 text-app-text-muted">Average rating</p>
      </div>
    </div>
  </section>
);
