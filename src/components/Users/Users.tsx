import React from "react";
import { Box, UnorderedList, ListItem, Spinner } from "@chakra-ui/react";
import { User } from "types/user";
import InfiniteScroll from "components/InfiniteScroll";

interface UsersProps {
  users: User[];
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

function Users(props: UsersProps) {
  const { loadMore, users, hasMore, isLoading } = props;

  return (
    <Box p={6}>
      <InfiniteScroll<User>
        as={UnorderedList}
        rowRenderer={({ item, ref }) => (
          <ListItem ref={ref} key={item.email} mb={12}>
            {item.name.first}
          </ListItem>
        )}
        loadingRenderer={() => <Spinner size="xl" />}
        items={users}
        hasMore={hasMore}
        loadMore={loadMore}
        isLoading={isLoading}
      ></InfiniteScroll>
    </Box>
  );
}

export default Users;
