import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import Header from "../components/layout/Header";

export default function Post({ post }) {
  const { text, createdAt } = post;
  console.log(post);

  return (
    <Box
      shadow={"md"}
      w="100%"
      h="100%"
      my="2rem"
      bg={"teal.400"}
      borderRadius={"lg"}
      color={"white"}
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
      </Flex>
    </Box>
  );
}
