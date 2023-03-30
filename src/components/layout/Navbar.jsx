import {
  Box,
  Text,
  Flex,
  Button,
  Heading,
  useBreakpointValue,
  Show,
  Hide,
  Avatar,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../../hooks/auth";
import { auth } from "../../lib/firebase";

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [user, setUser] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const { logout } = useLogout();
  const variant = useBreakpointValue({ base: "mobile", md: "desktop" });

  React.useEffect(() => {
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        }
      });
    };
    authListener();
  }, []);

  return (
    <Box w={"100%"} bg="teal.400" h={"100px"} shadow="md" color={"white"}>
      <Flex
        w={{ base: "90%", md: "85%", lg: "50%" }}
        h="100%"
        justifyContent="space-between"
        alignItems="center"
        mx="auto"
      >
        <Heading
          fontSize={"2rem"}
          fontWeight={"extrabold"}
          textTransform="uppercase"
        >
          <Link to="/">Socials</Link>
        </Heading>
        {!user ? (
          <Flex gap={"1.5rem"}>
            <Button
              px="16px"
              py="4px"
              bg={"transparent"}
              borderColor="teal.800"
              border="2px"
              _hover={{ bg: "teal.500" }}
            >
              <Link to="/login">Login</Link>
            </Button>
            <Button bg={"teal.700"} _hover={{ bg: "teal.500" }}>
              <Link to="/register">Sign Up</Link>
            </Button>
          </Flex>
        ) : (
          <Flex gap={"1rem"} alignItems={"center"}>
            <Hide below="lg">
              <Link to="/">Home</Link>
              <Link to={`/profile/${user.uid}`}>Profile</Link>
            </Hide>
            <Show below="lg">
              <Avatar
                name={user.username}
                bg={"teal.600"}
                color={"white"}
                onClick={onOpen}
                cursor={"pointer"}
                _hover={{ bg: "teal.900" }}
                transition="all 0.2s"
              />
            </Show>
            <Button
              bg={"teal.500"}
              _hover={{ bg: "teal.700" }}
              onClick={logout}
            >
              Logout
            </Button>
          </Flex>
        )}
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={"teal.400"} color={"white"}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <DrawerHeader>
              <Heading fontSize={"2rem"} fontWeight={"extrabold"}>
                <Link to="/">Socials</Link>
              </Heading>
            </DrawerHeader>
            <DrawerCloseButton />
          </Flex>
          <DrawerBody
            display={"flex"}
            mt={"15px"}
            flexDirection={"column"}
            gap={"1rem"}
          >
            <Link to="/" fontSize={"2rem"}>
              Home
            </Link>
            <Link to={`/profile/${user.uid}`}>Profile</Link>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Navbar;
