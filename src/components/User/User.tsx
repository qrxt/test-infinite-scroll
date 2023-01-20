import React from "react";
import { Avatar, Box, Heading, Stack } from "@chakra-ui/react";
import { User as UserType } from "types/user";

interface UserProps {
  user: UserType;
}

function User(props: UserProps) {
  const { user } = props;
  const fullName = `${user.name.first} ${user.name.last}`;

  return (
    <Box shadow="xl" border="1px" borderColor="blackAlpha.300" p="6">
      <Stack display="flex" alignItems="center">
        <Box mb={3}>
          <Avatar size="md" src={user.picture.medium} />
        </Box>
        <Stack>
          <Heading>{fullName}</Heading>
        </Stack>
      </Stack>
    </Box>
  );
}

export default User;
