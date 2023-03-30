import {
  Box,
  Flex,
  Avatar,
  Button,
  CircularProgress,
  Input,
} from "@chakra-ui/react";
import Navbar from "../layout/Navbar";
import { useParams } from "react-router-dom";
import { usePost } from "../../hooks/posts";
import Post from "../post/index";
import { useState, useEffect } from "react";
import { color } from "framer-motion";
import NewComments from "./NewComments";
import CommentList from "./CommentList";

export default function Comments() {
  const { id } = useParams();
  const { post, isLoading } = usePost(id);

  console.log(post);

  if (isLoading) return <CircularProgress isIndeterminate color="teal.400" />;

  return (
    <>
      <Navbar />
      <Box
        w={{ base: "85%", md: "85%", lg: "50%" }}
        h="100%"
        my="2rem"
        mx="auto"
      >
        <Button
          bg={"teal.400"}
          color={"white"}
          mr={"auto"}
          _hover={{ bg: "teal.700" }}
        >
          Back
        </Button>
      </Box>
      <Post post={post} />
      <NewComments post={post} />
      <CommentList post={post} />
    </>
  );
}
