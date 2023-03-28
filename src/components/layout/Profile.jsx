import React from "react";
import Navbar from "./Navbar";
import { Box } from "@chakra-ui/react";

const Profile = () => {
  return (
    <>
      <Navbar />
      <Box
        w={{ base: "90%", md: "100%" }}
        p={"5"}
        h={"100vh"}
        bg="gray.200"
        mx="auto"
        my={10}
        rounded="md"
      ></Box>
    </>
  );
};

export default Profile;
