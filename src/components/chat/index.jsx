import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Navbar from "../layout/Navbar";
import ChatUsers from "./ChatUsers";

export default function Chat() {
  return (
    <div>
      <Navbar />
      <Box w="90%" h="100vh" bg="gray.100" mx={"auto"}>
        <ChatUsers />
      </Box>
    </div>
  );
}
