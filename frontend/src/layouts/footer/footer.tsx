import { type FC, type FormEvent, useContext } from "react";

import { BookOpenCheck, Mail, Sparkles } from "lucide-react";

import { ThemeContext } from "@/common/contexts/theme-context";

const footerStats = [
  { label: "Catalog", value: "100+" },
  { label: "Shelves", value: "12" },
  { label: "Favorites", value: "Saved" },
];

export const LandingPageFooter: FC = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    return null;
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <footer className="border-t border-app-border bg-[linear-gradient(180deg,transparent,color-mix(in_srgb,var(--color-surface)_78%,transparent))]">
      <div className="mx-auto grid w-full max-w-content gap-l px-s py-l sm:px-sm lg:grid-cols-[1fr_1.15fr] lg:px-l 3xl:px-22">
        <section
          aria-label="BookNest footer summary"
          className="rounded-l border border-app-border bg-[linear-gradient(135deg,var(--color-surface-raised),var(--color-surface-muted))] p-sm shadow-app-m"
        >
          <div className="mb-xs inline-flex items-center gap-2 rounded-full bg-app-brand-soft px-xs py-1 text-xs font-bold text-app-brand">
            <Sparkles className="size-3.5" />
            BookNest
          </div>
          <h2 className="m-0 max-w-105 text-2xl leading-tight font-bold">
            Build your shelf, track favorites, and keep reading organized.
          </h2>
          <p className="app-muted-text m-0 max-w-130 text-sm leading-6">
            A practical bookstore dashboard for browsing books, managing your account, and keeping
            personal reading picks close.
          </p>
          <div className="mt-sm grid grid-cols-3 gap-xs">
            {footerStats.map((stat) => (
              <div
                className="rounded-m border border-app-border bg-app-surface px-xs py-xs"
                key={stat.label}
              >
                <strong className="block text-base text-app-brand">{stat.value}</strong>
                <span className="app-muted-text text-xs">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        <section
          aria-label="BookNest newsletter"
          className="flex flex-col justify-between gap-m rounded-l border border-app-border bg-app-surface p-sm shadow-app-m"
        >
          <div>
            <div className="mb-xs grid size-10 place-items-center rounded-m bg-app-accent-soft text-app-accent">
              <BookOpenCheck className="size-5" />
            </div>
            <p className="m-0 text-sm font-semibold text-app-text">Stay in the loop</p>
            <p className="app-muted-text mt-1 mb-4 text-sm">
              Get catalog notes and account updates in one place.
            </p>
          </div>

          <form className="flex w-full flex-col gap-xs sm:flex-row" onSubmit={handleSubmit}>
            <label className="sr-only" htmlFor="footer-newsletter-email">
              Newsletter email
            </label>
            <div className="relative flex-1">
              <Mail className="pointer-events-none absolute top-1/2 left-xs size-4 -translate-y-1/2 text-app-text-muted" />
              <input
                className="min-h-11 w-full rounded-m border border-app-border bg-app-surface px-s pl-xl text-sm text-app-text outline-none transition placeholder:text-app-text-muted focus:border-app-brand focus:ring-2 focus:ring-app-brand/20"
                id="footer-newsletter-email"
                placeholder="Enter your email"
                type="email"
              />
            </div>
            <button
              className="min-h-11 rounded-m bg-app-brand px-sm text-sm font-semibold text-app-text-inverse transition hover:bg-app-brand-strong focus:ring-2 focus:ring-app-brand/30 focus:outline-none"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        </section>
      </div>

      <div className="app-muted-text mx-auto flex w-full max-w-content flex-col gap-xs border-t border-app-border px-s py-s text-xs sm:flex-row sm:items-center sm:justify-between sm:px-sm lg:px-l 3xl:px-22">
        <span>Copyright 2024 BookNest. All rights reserved.</span>
        <span>Designed for readers and bookstore workflows.</span>
      </div>
    </footer>
  );
};

export default LandingPageFooter;
