import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { FaTrash } from "react-icons/fa";
import { useDeleteComment } from "../../hooks/comments";
import { useUser } from "../../hooks/users";

export default function Comment({ comment }) {
  const { text, date, id } = comment;
  const { user, isLoading } = useUser(comment.uid);
  const { deleteComment, isLoading: deleteLoading } = useDeleteComment(id);

  const [currentUser, setCurrentUser] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          getDoc(docRef).then((doc) => {
            if (doc.exists) {
              setCurrentUser(doc.data());
            } else {
              console.log("No such document!");
            }
          });
        }
      });
    };
    authListener();
  }, []);

  function handleDeleteComment() {
    onOpen();
  }

  //   console.log(user);

  return (
    <Box
      w="100%"
      my={"2rem"}
      border={"2px solid"}
      borderColor={"teal.500"}
      px="10px"
      py="10px"
      borderRadius={"lg"}
      color={"teal.600"}
    >
      <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete this comment?</Text>
          </ModalBody>
          <ModalFooter>
            <Flex gap={"1rem"} w={"100%"} justifyContent={"flex-end"}>
              <Button
                onClick={deleteComment}
                _hover={{ color: "white", bg: "red.600" }}
                bg={"red.500"}
                color={"white"}
              >
                Delete
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex gap={"1rem"}>
        <Avatar
          name={user?.username}
          bg={"teal.700"}
          color={"white"}
          src={user?.avatar}
        />
        <Box w={"100%"}>
          <Flex
            w="100%"
            borderBottom={"1px solid"}
            borderColor={"teal.700"}
            mb="15px"
          >
            <Box>
              <Text fontWeight={"bold"}>@{user?.username}</Text>
              <Text fontSize={"sm"} pb={"1rem"}>
                {formatDistanceToNow(date)}
              </Text>
            </Box>
            {currentUser?.id === user?.id && (
              <IconButton
                size={"sm"}
                ml={"auto"}
                aria-label="Delete comment"
                color={"red.500"}
                variant={"ghost"}
                _hover={{ color: "red.700" }}
                isRound
                onClick={handleDeleteComment}
                icon={<FaTrash />}
              />
            )}
          </Flex>
          <Text>{text}</Text>
        </Box>
      </Flex>
    </Box>
  );
}
