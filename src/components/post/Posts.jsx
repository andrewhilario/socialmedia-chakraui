import { Box, Text } from "@chakra-ui/react";
import React from "react";
import Post from "./index";

export default function PostList({ posts }) {
  return (
    <>
      <Box w={{ base: "95%", md: "85%", lg: "50%", xl: "100%" }} mx={"auto"}>
        {posts?.length === 0 ? (
          <Text>No posts yet... Share your thoughts</Text>
        ) : (
          posts?.map((post) => <Post key={post.id} post={post} />)
        )}
      </Box>
    </>
  );
}
