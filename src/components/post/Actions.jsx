import {
  Flex,
  IconButton,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import {
  FaRegHeart,
  FaHeart,
  FaRegCommentAlt,
  FaCommentAlt,
  FaTrash,
} from "react-icons/fa";
import { useUser } from "../../hooks/users";
import { useToggleLike, useDeletePost } from "../../hooks/posts";
import { Link } from "react-router-dom";
import { useComments } from "../../hooks/comments";

export default function Actions({ post }) {
  const { id, likes, uid } = post;
  const { user, isLoading: userLoading } = useUser(uid);
  const isLiked = likes.includes(user?.id);
  const config = {
    id,
    isLiked,
    uid: user?.id,
  };
  const { toggleLike, isLoading: likeLoading } = useToggleLike(config);
  const { comments, isLoading: commentLoading } = useComments(id);
  const { deletePost, isLoading: deleteLoading } = useDeletePost(id);

  const { isOpen, onOpen, onClose } = useDisclosure();

  // console.log(comments.length);

  function handleDeletePost() {
    onOpen();
  }

  return (
    <>
      <Flex
        w="100%"
        h="100%"
        align="center"
        gap={"1rem"}
        px={"1rem"}
        py={"1rem"}
        borderTop="2px solid"
        borderColor={"gray.200"}
      >
        <Modal onClose={onClose} size={"md"} isOpen={isOpen}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Delete</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text>Are you sure you want to delete this post?</Text>
            </ModalBody>
            <ModalFooter>
              <Flex gap={"1rem"} w={"100%"} justifyContent={"flex-end"}>
                <Button
                  onClick={deletePost}
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
        <Flex align="center" gap={"0.5rem"}>
          <IconButton
            onClick={toggleLike}
            isLoading={likeLoading || userLoading}
            size={"md"}
            bg={"teal.400"}
            aria-label="Like"
            variant={"ghost"}
            icon={isLiked ? <FaHeart /> : <FaRegHeart />}
            _hover={{ bg: "teal.500" }}
            isRound
          />
          <Text>{likes.length}</Text>
        </Flex>
        <Flex align="center" gap={"0.5rem"}>
          <IconButton
            as={Link}
            to={`/comments/${post.id}`}
            size={"md"}
            bg={"teal.400"}
            aria-label="Comment"
            variant={"ghost"}
            icon={comments?.length > 0 ? <FaCommentAlt /> : <FaRegCommentAlt />}
            _hover={{ bg: "teal.500" }}
            isRound
          />

          <Text>{comments?.length}</Text>
        </Flex>
        {!userLoading && user.id === uid && (
          <IconButton
            ml="auto"
            onClick={handleDeletePost}
            isLoading={deleteLoading}
            size="md"
            color={"red.500"}
            variant="ghost"
            icon={<FaTrash />}
            isRound
          />
        )}
      </Flex>
    </>
  );
}
