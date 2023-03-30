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
} from "@chakra-ui/react";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";

const Profile = () => {
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [userAuth, authLoading, error] = useAuthState(auth);

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
          p={"5"}
          h={"100vh"}
          bg="gray.200"
          mx="auto"
          my={10}
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
      </>
    );
};

export default Profile;
