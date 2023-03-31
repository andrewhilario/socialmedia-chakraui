import React from "react";
import { Flex, Avatar, Text, Center, CircularProgress } from "@chakra-ui/react";
import { useUser } from "../../hooks/users";
import { formatDistance, formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";

export default function Header({ uid, date }) {
  const { user, isLoading } = useUser(uid);

  if (isLoading) {
    return (
      <Center h="80vh">
        <CircularProgress isIndeterminate color="teal.400" />
      </Center>
    );
  } else {
    return (
      <Flex
        p={"1rem"}
        w="100%"
        h="100%"
        alignItems={"center"}
        borderBottom={"2px solid"}
        borderColor={"white"}
      >
        <Link to={`/profile/${user.id}`}>
          <Avatar
            name={user.username}
            src={user.avatar}
            bg="teal.700"
            color={"white"}
          />
        </Link>
        <Flex direction="column" align="flex-start" gap={"0"} ml="1rem">
          <Link to={`/profile/${user.id}`}>
            <Text
              fontSize={"1.2rem"}
              fontWeight={"medium"}
              _hover={{ textTransform: "underline" }}
            >
              {user.username}
            </Text>
          </Link>
          <Text fontSize={"1rem"}> {formatDistanceToNow(date)} ago</Text>
        </Flex>
      </Flex>
    );
  }
}
