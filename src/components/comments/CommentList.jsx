import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";
import React from "react";
import { useComments } from "../../hooks/comments";
import Comment from "./Comment";

export default function CommentList({ post }) {
  const { id } = post;
  const { comments, isLoading } = useComments(id);
  // console.log(comments);

  if (isLoading)
    return (
      <Center h="100vh">
        <CircularProgress isIndeterminate color="teal.400" />
      </Center>
    );

  return (
    <>
      {comments.map((comment) => (
        <Box
          key={comment.id}
          w={{ base: "85%", md: "85%", lg: "50%" }}
          mx={"auto"}
        >
          <Comment comment={comment} />
        </Box>
      ))}
    </>
  );
}
