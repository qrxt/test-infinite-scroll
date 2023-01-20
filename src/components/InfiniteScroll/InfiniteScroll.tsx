import React, { ComponentProps, ElementType } from "react";
import useInfiniteScroll from "lib/useInfiniteScroll";

type RowRendererParams<DataType> = {
  item: DataType;
  ref?: (node: HTMLElement | null) => void;
  index?: number;
};

interface InfiniteScrollOwnProps<
  DataType,
  E extends ElementType = ElementType
> {
  items: DataType[];
  as?: E;
  rowRenderer: (params: RowRendererParams<DataType>) => React.ReactNode;
  loadingRenderer?: () => React.ReactNode;
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
}

const defaultElement = "div";

type InfiniteScrollProps<
  DataType,
  E extends ElementType
> = InfiniteScrollOwnProps<DataType, E> &
  Omit<ComponentProps<E>, keyof InfiniteScrollOwnProps<DataType>>;

function InfiniteScroll<
  DataType,
  E extends ElementType = typeof defaultElement
>(props: InfiniteScrollProps<DataType, E>) {
  const {
    items,
    as,
    rowRenderer,
    hasMore,
    loadMore,
    isLoading,
    loadingRenderer = () => null,
    ...rest
  } = props;
  const TagName = as || defaultElement;
  const { ref } = useInfiniteScroll({
    hasMore,
    loadMore,
  });

  return (
    <TagName {...rest}>
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
