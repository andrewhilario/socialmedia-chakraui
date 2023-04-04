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
import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { useUserPosts } from "../../hooks/users";
import PostList from "../post/Posts";
import { formatDistanceToNow } from "date-fns";
import { usePosts } from "../../hooks/posts";
import {
  useCollection,
  useCollectionData,
} from "react-firebase-hooks/firestore";
import Actions from "../post/Actions";
import { useParams } from "react-router-dom";
import { useUser } from "../../hooks/users";

const Profile = () => {
  const userParams = useParams();
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [userAuth, authLoading, error] = useAuthState(auth);
  const { userPosts, isLoading } = useUserPosts(userParams.uid);
  const { posts, isLoading: postLoading } = usePosts();
  const { user: userProf } = useUser(userParams.uid);

  if (userPosts && posts) {
    console.log(userProf);
    console.log(user?.id);
  }

  React.useEffect(() => {
    const authListener = () => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          getDoc(docRef)
            .then((doc) => {
              if (doc.exists()) {
                setUser(doc.data());
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

  function enableEdit() {
    if (user?.id === userProf?.id) {
      return (
        <Button
          color={"white"}
          bg="teal.500"
          _hover={{ bg: "teal.900" }}
          py={"25px"}
          px={"30px"}
        >
          Edit your Profile
        </Button>
      );
    } else {
      return false;
    }
  }
  console.log(enableEdit());

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

          backgroundImage={'url(https://random.imagecdn.app/1920/1080)'}
          backgroundRepeat={"no-repeat"}
          backgroundSize={"cover"}
          mx="auto"
          my={{ base: "1rem", md: "2rem", lg: "0" }}
        > 
          <Box w='100%' h='100%' background={'blackAlpha.600'} px={"1rem"} py={"2rem"}>
            <Flex direction={"column"}  gap="1rem" alignItems={"center"}  >
              <Box my="0.5rem" >
                <Avatar
                  name={userProf?.username}
                  bg={"teal.600"}
                  color={"white"}
                  size="2xl"
                  src={userProf?.avatar}
                />
              </Box>
              <Text fontSize="2xl" fontWeight="semibold" color={"teal.400"}>
                @{userProf?.username}
              </Text>
              {enableEdit()}
              {/* <Button
                color={"white"}
                bg="teal.500"
                _hover={{ bg: "teal.900" }}
                py={"25px"}
                px={"30px"}
              >
                Edit your Profile
              </Button> */}
            </Flex> 
          </Box>
        </Box>
        <Box w={{ base: "90%", md: "60%",lg: "50%" }} mx="auto" my="1rem">
          <Text fontSize="2xl" fontWeight="semibold" color={"teal.500"}>
            Your Posts
          </Text>
        </Box>
        {userPosts?.map((post) => {
          return (
            <Box
              key={post?.id}
              my="1rem"
              
              border={"2px solid"}
              borderColor={"teal.500"}
              w={{ base: "80%", md: "60%", lg: "50%" }}
              borderRadius={"xl"}
              mx="auto"
            >
              <Flex
                p={"1rem"}
                w="100%"
                h="100%"
                alignItems={"center"}
                borderColor={"white"}
              >
                <Link to={`/profile/${user.id}`}>
                  <Avatar
                    name={userProf.username}
                    src={userProf.avatar}
                    bg="teal.700"
                    color={"white"}
                  />
                </Link>
                <Flex direction="column" align="flex-start" gap={"0"} ml="1rem">
                  <Link to={`/profile/${userProf.id}`}>
                    <Text
                      fontSize={"1.2rem"}
                      fontWeight={"medium"}
                      _hover={{ textTransform: "underline" }}
                    >
                      {userProf.username}
                    </Text>
                  </Link>
                  <Text fontSize={"1rem"}>
                    {" "}
                    {formatDistanceToNow(post?.createdAt)} ago
                  </Text>
                </Flex>
              </Flex>
              <Box p={"1rem"}>
                <Text fontSize={"1.2rem"}>{post?.text}</Text>
              </Box>
              <Actions post={post} />
            </Box>
          );
        })}
      </>
    );
};

export default Profile;
