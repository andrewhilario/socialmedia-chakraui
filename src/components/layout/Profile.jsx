import React from "react";
import Navbar from "./Navbar";
import {
  Avatar,
  Box,
  Flex,
  Button,
  Text,
  Center,
  CircularProgress,
  Link,
} from "@chakra-ui/react";

import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useUserPosts } from "../../hooks/users";
import PostList from "../post/Posts";
import { formatDistanceToNow } from "date-fns";
import { usePosts } from "../../hooks/posts";

const Profile = () => {
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [userAuth, authLoading, error] = useAuthState(auth);
  const { userPosts, isLoading } = useUserPosts(userAuth?.uid);
  const { posts, isLoading: postLoading } = usePosts();
  console.log(posts);

  React.useEffect(() => {
    const authListener = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          getDoc(docRef)
            .then((doc) => {
              if (doc.exists()) {
                setUser(doc.data());
                console.log("Document data:", doc.data());
                setLoading(false);
              } else {
                console.log("No such document!");
              }
            })
            .catch((error) => {
              console.log("Error getting document:", error);
            });
          //   setUser(user);
          //   setLoading(false);
        }
      });
    };
    authListener();
  }, []);
  if (!user || loading)
    return (
      <>
        <Navbar />
        <Center h="100vh">
          <CircularProgress isIndeterminate color="teal.400" />
        </Center>
      </>
    );
  else
    return (
      <>
        <Navbar />
        <Box
          w={{ base: "90%", md: "100%" }}
          px={"1rem"}
          py={"2rem"}
          bg="gray.200"
          mx="auto"
          my={{ base: "1rem", md: "2rem", lg: "0" }}
          rounded="md"
        >
          <Flex direction={"column"} gap="1rem" alignItems={"center"}>
            <Box my="0.5rem">
              <Avatar
                name={user.username}
                bg={"teal.600"}
                color={"white"}
                size="2xl"
              />
            </Box>
            <Text fontSize="2xl" fontWeight="semibold" color={"teal.500"}>
              @{user.username}
            </Text>
            <Button
              color={"white"}
              bg="teal.500"
              _hover={{ bg: "teal.900" }}
              py={"25px"}
              px={"30px"}
            >
              Edit your Profile
            </Button>
          </Flex>
        </Box>
        {userPosts?.map((post) => {
          return (
            <Box key={post?.id}>
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
                  <Text fontSize={"1rem"}> ago</Text>
                </Flex>
              </Flex>
            </Box>
          );
        })}
      </>
    );
};

export default Profile;
