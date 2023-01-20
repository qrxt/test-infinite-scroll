import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { UsersContainer } from "components/Users";

function App() {
  return (
    <Center>
      <Box w="500px">
        <UsersContainer />
      </Box>
    </Center>
  );
}

export default App;
