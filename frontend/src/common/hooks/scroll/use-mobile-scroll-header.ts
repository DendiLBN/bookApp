import { useEffect, useState } from "react";

import {
  MOBILE_HEADER_SCROLL_THRESHOLD,
  MOBILE_MEDIA_QUERY,
} from "@/common/hooks/scroll/consts/mobile-scroll-header";

export const useMobileScrollHeader = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
    let lastScrollY = window.scrollY;

    const syncDesktopHeader = () => {
      if (!mediaQuery.matches) {
        setIsHeaderVisible(true);
      }
    };

    const handleScroll = () => {
      if (!mediaQuery.matches) {
        setIsHeaderVisible(true);
        lastScrollY = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const isPastThreshold = currentScrollY > MOBILE_HEADER_SCROLL_THRESHOLD;
      const isScrollingDown = currentScrollY > lastScrollY;

      setIsHeaderVisible(!isPastThreshold || !isScrollingDown);
      lastScrollY = currentScrollY;
    };

    syncDesktopHeader();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    mediaQuery.addEventListener("change", syncDesktopHeader);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      mediaQuery.removeEventListener("change", syncDesktopHeader);
    };
  }, []);

  return {
    isHeaderVisible,
  };
};
