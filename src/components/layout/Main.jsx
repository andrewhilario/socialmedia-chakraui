import {
  Center,
  CircularProgress,
  Box,
  Avatar,
  Flex,
  Button,
  Text,
  HStack,
  Textarea,
  Heading,
} from "@chakra-ui/react";
import TextareaAutosize from "react-textarea-autosize";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useForm } from "react-hook-form";
import { useAddPost } from "../../hooks/posts";
import PostList from "../post/Posts";
import { usePosts } from "../../hooks/posts";

const Main = () => {
  const [user, setUser] = useState(null);

  const { register, handleSubmit, reset } = useForm();
  const { addPost, isLoading } = useAddPost();
  const { posts, isLoading: postsLoad } = usePosts();

  function handleAddPost(data) {
    addPost({
      uid: user.id,
      text: data.post,
    });
    console.log(data);
    reset();
  }

  useEffect(() => {
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          getDoc(docRef).then((doc) => {
            if (doc.exists) {
              console.log(doc.data());
              setUser(doc.data());
            }
          });
          // setUser(user);
        } else {
          setUser(null);
        }
      });
    };
    authListener();
  }, []);

  if (postsLoad) {
    return (
      <Center h="100vh">
        <CircularProgress isIndeterminate color="teal.400" />
      </Center>
    );
  }

  if (!user) {
    return (
      <Center h="90vh">
        <Box
          w={"100%"}
          h={"100%"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          backgroundImage={"url('/background.svg')"}
          backgroundSize={"cover"}
          backgroundPosition={"center"}
          backgroundRepeat={"no-repeat"}
        >
          <Box
            w={{ base: "85%", md: "85%", lg: "50%" }}
            my="2rem"
            mx={"auto"}
            color={"white"}
          >
            <Flex direction="column" align="center" gap={"1rem"}>
              <Heading
                as="h2"
                size="4xl"
                textAlign={"center"}
                fontWeight={"semibold"}
              >
                Welcome to Socials App
              </Heading>
              <Text
                fontSize={"1.2rem"}
                fontWeight="normal"
                textAlign={"center"}
              >
                A social media app built with React, Firebase and Chakra UI
              </Text>
              <Button
                as={Link}
                to="/register"
                colorScheme="teal"
                variant="solid"
                mt={"1rem"}
                px={"2rem"}
                py={"1.5rem"}
              >
                Get Started
              </Button>
            </Flex>
          </Box>
        </Box>
      </Center>
    );
  } else {
    return (
      <>
        <Box w={{ base: "85%", md: "85%", lg: "50%" }} my="2rem" mx={"auto"}>
          <form onSubmit={handleSubmit(handleAddPost)}>
            <HStack justify={"space-between"}>
              <Link to={`/profile/${user.uid}`}>
                <Flex direction="row" align="center" gap={"0.4rem"}>
                  <Avatar
                    name={user.username}
                    src={user.avatar}
                    color={"white"}
                    size={"lg"}
                    bg="teal.700"
                    border={"2px solid teal.500"}
                    _hover={{ bg: "teal.800", transition: "all 0.6s" }}
                  />
                  <Flex direction="column" align="flex-start" gap={"0"}>
                    <Text
                      ml={"1rem"}
                      fontSize={"1.3rem"}
                      fontWeight={"semibold"}
                      color={"teal.500"}
                      textTransform={"capitalize"}
                    >
                      {user.username}
                    </Text>
                    <Text ml={"1rem"} fontSize={"1rem"} color={"gray.500"}>
                      @{user.username}
                    </Text>
                  </Flex>
                </Flex>
              </Link>
              <Button
                colorScheme="teal"
                variant="solid"
                type="submit"
                isLoading={isLoading}
              >
                Post
              </Button>
            </HStack>
            <Textarea
              as={TextareaAutosize}
              mt={"1rem"}
              placeholder="What's happening?"
              resize={"none"}
              {...register("post", { required: true })}
            />
          </form>
        </Box>
        <Box w={{ base: "85%", md: "85%", lg: "50%" }} my="2rem" mx={"auto"}>
          <Heading
            as="h2"
            size="lg"
            my="2rem"
            fontWeight={"semibold"}
            color={"teal.600"}
          >
            Your Feed
          </Heading>
        </Box>
        <PostList posts={posts} />
      </>
    );
  }
};

export default Main;
