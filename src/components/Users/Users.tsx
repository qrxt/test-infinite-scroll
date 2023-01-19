import React, { useEffect } from "react";
import {
  Box,
  Button,
  UnorderedList,
  ListItem,
  Spinner,
} from "@chakra-ui/react";
import useInfiniteScroll from "lib/useInfiniteScroll";
import { User } from "types/user";

interface UsersProps {
  users: User[];
  loadMore: () => void;
  isLoading: boolean;
  hasMore: boolean;
}

function Users(props: UsersProps) {
  const { loadMore, users, hasMore, isLoading } = props;

  const { ref, isIntersecting, observer } = useInfiniteScroll({
    hasMore: true,
  });

  useEffect(() => {
    if (hasMore && isIntersecting) {
      loadMore();
      observer?.disconnect();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isIntersecting, loadMore]);

  return (
    <Box>
      <Button
        onClick={() => {
          loadMore();
        }}
      >
        Load more
      </Button>
      <UnorderedList>
        {users.map((user, idx) => {
          if (idx === users.length - 1) {
            return (
              <ListItem key={user.email} bg="tomato" fontSize="xl">
                <p ref={ref}>{user.name.first}</p>
              </ListItem>
            );
          }

          return (
            <ListItem key={user.email} fontSize="xl" mb="8">
              {user.name.first}
            </ListItem>
          );
        })}
      </UnorderedList>
      {isLoading && <Spinner size="lg" />}
    </Box>
  );
}

export default Users;
