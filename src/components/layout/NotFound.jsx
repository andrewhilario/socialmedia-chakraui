import { Box, Center, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box h="100vh" w="100vw" bg="teal.400">
      <Center h="100vh">
        <Flex direction="column" alignItems="center" justifyContent="center">
          <Heading fontSize="5rem" fontWeight="extrabold" textAlign={"center"}>
            404 not Found
          </Heading>
          <Text fontSize="2rem" fontWeight="semibold" textAlign={"center"}>
            The page you are looking for does not exist
          </Text>
          <Link to="/">
            <Text
              mt={10}
              fontSize="1rem"
              fontWeight="semibold"
              textAlign={"center"}
              _hover={{ textDecoration: "underline" }}
              transition="all 0.2s ease-in-out"
            >
              Go back to home
            </Text>
          </Link>
        </Flex>
      </Center>
    </Box>
  );
};

export default NotFound;
