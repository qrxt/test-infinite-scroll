import React, { ElementType } from "react";
import useInfiniteScroll from "lib/useInfiniteScroll";

type RowRendererParams<T> = {
  item: T;
  ref?: (node: HTMLElement | null) => void;
  index?: number;
};

interface InfiniteScrollProps<T> {
  items: T[];
  as?: ElementType;
  rowRenderer: (params: RowRendererParams<T>) => React.ReactNode;
  loadingRenderer?: () => React.ReactNode;
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
}

function InfiniteScroll<T>(props: InfiniteScrollProps<T>) {
  const {
    items,
    as,
    rowRenderer,
    hasMore,
    loadMore,
    isLoading,
    loadingRenderer = () => null,
  } = props;
  const TagName = as || "div";
  const { ref } = useInfiniteScroll({
    hasMore,
    loadMore,
  });

  return (
    <TagName>
      {items.map((item, index) => {
        if (index === items.length - 1) {
          return rowRenderer({ item, index, ref });
        }

        return rowRenderer({ item, index });
      })}
      {isLoading && loadingRenderer()}
    </TagName>
  );
}

export default InfiniteScroll;
