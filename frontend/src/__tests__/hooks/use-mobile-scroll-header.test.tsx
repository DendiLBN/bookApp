import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMobileScrollHeader } from "@/common/hooks/scroll/use-mobile-scroll-header";

const createMatchMedia = (matches: boolean) =>
  vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));

const setScrollY = (scrollY: number) => {
  Object.defineProperty(window, "scrollY", {
    configurable: true,
    value: scrollY,
  });
};

describe("useMobileScrollHeader", () => {
  beforeEach(() => {
    setScrollY(0);
  });

  it("hides the header on mobile after scrolling down past the threshold", () => {
    window.matchMedia = createMatchMedia(true);
    const { result } = renderHook(() => useMobileScrollHeader());

    act(() => {
      setScrollY(80);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.isHeaderVisible).toBe(false);
  });

  it("shows the header again when scrolling up", () => {
    window.matchMedia = createMatchMedia(true);
    const { result } = renderHook(() => useMobileScrollHeader());

    act(() => {
      setScrollY(90);
      window.dispatchEvent(new Event("scroll"));
    });

    act(() => {
      setScrollY(70);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.isHeaderVisible).toBe(true);
  });

  it("keeps the header visible on desktop", () => {
    window.matchMedia = createMatchMedia(false);
    const { result } = renderHook(() => useMobileScrollHeader());

    act(() => {
      setScrollY(200);
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current.isHeaderVisible).toBe(true);
  });
});
