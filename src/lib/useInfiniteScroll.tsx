import { useCallback, useEffect, useState } from "react";

interface InfiniteScrollHookParams extends IntersectionObserverInit {
  hasMore: boolean;
  loadMore: () => void;
}

export type UseInfiniteScrollResult = ReturnType<typeof useInfiniteScroll>;

/**
 * Custom React hook that allows to handle infinite scroll logic
 * for paginated data using Intersection Observer.
 * The hook will load new data using loadMore function.
 * The hook will load new data as long as hasMore param is true.
 * @param {InfiniteScrollHookParams} params
 * @returns {UseInfiniteScrollResult}
 */
function useInfiniteScroll(params: InfiniteScrollHookParams) {
  const {
    root = null,
    rootMargin = "0px",
    threshold = 0,
    loadMore,
    hasMore,
  } = params || {};
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    if (hasMore && isIntersecting) {
      loadMore();
      observer?.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isIntersecting, loadMore]);

  const ref = (node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [first] = entries;

        setIsIntersecting(first.isIntersecting);
      },
      { root, rootMargin, threshold }
    );

    observer.observe(node);
    setObserver(observer);
  };
  const refCallback = useCallback(ref, [root, rootMargin, threshold]);

  return { ref: refCallback, isIntersecting, observer };
}

export default useInfiniteScroll;
