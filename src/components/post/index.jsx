import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import Header from "../layout/Header";
import Actions from "./Actions";

export default function Post({ post }) {
  const { text, createdAt } = post;
  console.log(post);

  return (
    <Box
      shadow={"md"}
      w={{ base: "90%", lg: "50%" }}
      h="100%"
      my="2rem"
      bg={"teal.400"}
      borderRadius={"lg"}
      color={"white"}
      mx={"auto"}
    >
      <Flex
        w="100%"
        h="100%"
        align="center"
        justify="center"
        flexDirection={"column"}
        gap={"1rem"}
      >
        <Header uid={post.uid} date={createdAt} />
        <Box w="100%" h="100%" my="1rem" px={"1rem"}>
          <Text fontSize={"1rem"} fontWeight={"semibold"}>
            {text}
          </Text>
        </Box>
        <Actions post={post} />
      </Flex>
    </Box>
  );
}
