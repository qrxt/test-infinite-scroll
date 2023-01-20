import React from "react";
import { Box, ListItem, Spinner, List, Center } from "@chakra-ui/react";
import { User as UserType } from "types/user";
import InfiniteScroll from "components/InfiniteScroll";
import User from "components/User";

interface UsersProps {
  users: UserType[];
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

function Users(props: UsersProps) {
  const { loadMore, users, hasMore, isLoading } = props;

  return (
    <Box p={6}>
      <InfiniteScroll<UserType, typeof List>
        as={List}
        columns="2"
        spacing="15"
        rowRenderer={({ item: user, ref }) => (
          <ListItem ref={ref} key={user.email} mb={6}>
            <User user={user} />
          </ListItem>
        )}
        loadingRenderer={() => (
          <Center w="100%">
            <Spinner size="xl" />
          </Center>
        )}
        items={users}
        hasMore={hasMore}
        loadMore={loadMore}
        isLoading={isLoading}
      />
    </Box>
  );
}

export default Users;
