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
  children: ElementType;
  hasMore: boolean;
  loadMore: () => void;
  isLoading: boolean;
  as?: E;
  loadingRenderer?: () => React.ReactNode;
}

const defaultElement = "div";

export type InfiniteScrollProps<
  DataType,
  E extends ElementType
> = InfiniteScrollOwnProps<DataType, E> &
  Omit<ComponentProps<E>, keyof InfiniteScrollOwnProps<DataType>>;

export type InfiniteScrollResult = ReturnType<typeof InfiniteScroll>;

/**
 * Infinite scroll wrapper component
 * Component will call loadMore function when last element of list
 * is on the screen.
 * * You should pass items list
 * * You should pass hasMore parameter to prevent the component from trying to load new data when all the data has already been loaded
 * * You should pass loadMore function that will cause new data to be loaded
 * * You should pass generic parameter of your data list to Infinite Scroll (<InfiniteScroll<MyData> ...>...</InfiniteScroll>)
 * * You should pass row render component as child
 * * You should pass the isLoading parameter to help the component detect when the data is being loaded in order to render a loading indicator
 * * You can render InfiniteScroll as any another html element or React component
 * * You can customize loading component using loadingRenderer prop
 *
 * The component does not memoize the string component, so you may need to do it yourself
 *
 * @param {InfiniteScrollProps<DataType, E>} props
 * @returns {InfiniteScrollResult}
 */
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
