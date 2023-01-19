import { useCallback, useState } from "react";

interface InfiniteScrollHookParams extends IntersectionObserverInit {
  hasMore: boolean;
}

function useInfiniteScroll(params: InfiniteScrollHookParams) {
  const { root = null, rootMargin = "0px", threshold = 0 } = params || {};
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  const ref = (node: Element) => {
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
