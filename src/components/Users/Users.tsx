import React from "react";
import {
  Box,
  ListItem,
  Spinner,
  List,
  Center,
  forwardRef,
} from "@chakra-ui/react";
import { User as UserType } from "types/user";
import InfiniteScroll from "components/InfiniteScroll";
import User from "components/User";
import { RowRendererParams } from "components/InfiniteScroll/InfiniteScroll";

interface UsersProps {
  users: UserType[];
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

const Row = forwardRef((props: RowRendererParams<UserType>, ref) => {
  const { item: user } = props;

  return (
    <ListItem ref={ref} key={user.email} mb={6}>
      <User user={user} />
    </ListItem>
  );
});
Row.displayName = "Row";
const RowMemoized = React.memo(Row);

function Users(props: UsersProps) {
  const { loadMore, users, hasMore, isLoading } = props;

  return (
    <Box p={6}>
      <InfiniteScroll<UserType, typeof List>
        as={List}
        columns="2"
        spacing="15"
        loadingRenderer={() => (
          <Center w="100%">
            <Spinner size="xl" />
          </Center>
        )}
        items={users}
        hasMore={hasMore}
        loadMore={loadMore}
        isLoading={isLoading}
      >
        {RowMemoized}
      </InfiniteScroll>
    </Box>
  );
}

export default Users;
