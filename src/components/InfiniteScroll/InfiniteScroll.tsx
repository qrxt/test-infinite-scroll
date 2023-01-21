import React, { ComponentProps, ElementType, useCallback } from "react";
import useInfiniteScroll from "lib/useInfiniteScroll";

export type RowRendererParams<DataType> = {
  item: DataType;
  ref?: (node: HTMLElement | null) => void;
  index?: number;
};

export interface InfiniteScrollOwnProps<
  DataType,
  E extends ElementType = ElementType
> {
  items: DataType[];
  as?: E;
  children: ElementType;
  loadingRenderer?: () => React.ReactNode;
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
}

const defaultElement = "div";

export type InfiniteScrollProps<
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
    hasMore,
    loadMore,
    isLoading,
    loadingRenderer = () => null,
    children,
    ...rest
  } = props;
  const TagName = as || defaultElement;
  const { ref } = useInfiniteScroll({
    hasMore,
    loadMore,
  });

  const Row = children || defaultElement;
  const loadingRendererCallback = useCallback(loadingRenderer, [
    loadingRenderer,
  ]);

  return (
    <TagName {...rest}>
      {items.map((item, index) =>
        index === items.length - 1 ? (
          <Row key={index} ref={ref} item={item} />
        ) : (
          <Row key={index} item={item} />
        )
      )}
      {isLoading && loadingRendererCallback()}
    </TagName>
  );
}

export default InfiniteScroll;
