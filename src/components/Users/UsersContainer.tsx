import React, { useCallback, useEffect, useState } from "react";
import { Spinner } from "@chakra-ui/react";
import { User, UserResponse } from "types/user";
import Users from "./Users";

function UsersContainer() {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=10&seed=abc&page=${page}`)
      .then((r) => r.json())
      .then((data: UserResponse) => {
        const newUsers = [...users, ...data.results];

        setUsers(newUsers);
        setHasMore(newUsers.length < 90);
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const loadMore = useCallback(() => {
    setPage((prev) => prev + 1);
    setIsLoading(true);
  }, []);

  if (!users && isLoading) {
    return <Spinner size="lg" />;
  }

  return (
    <Users
      users={users}
      hasMore={hasMore}
      loadMore={loadMore}
      isLoading={isLoading}
    />
  );
}

export default UsersContainer;
