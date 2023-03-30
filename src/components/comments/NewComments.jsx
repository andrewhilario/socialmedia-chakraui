import { Box, Button, Flex, Input, Avatar } from "@chakra-ui/react";
import { useUser } from "../../hooks/users";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAddComment, useDeleteComment } from "../../hooks/comments";
import { auth, db } from "../../lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default function NewComments({ post }) {
  const { id: postID } = post;
  const [user, setUser] = useState("");
  const { register, handleSubmit, reset } = useForm();
  const { addComment, isLoading: commentLoading } = useAddComment({
    postID,
  });

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
          setLoading(false);
        }
      });
    };
    authListener();
  }, []);

  function handleAddComment(data) {
    addComment({
      text: data.text,
      uid: user.id,
    });
    reset();
  }

  return (
    <form onSubmit={handleSubmit(handleAddComment)}>
      <Box w={{ base: "85%", md: "85%", lg: "50%" }} mx={"auto"}>
        <Flex gap={"1rem"}>
          <Avatar
            name={user.username}
            bg={"teal.700"}
            color={"white"}
            src={user?.avatar}
          />
          <Box w={"100%"}>
            <Input
              placeholder="Add a comment"
              size={"sm"}
              variant="flushed"
              {...register("text", { required: true })}
            />
            <Flex pt={"1rem"}>
              <Button
                type="submit"
                bg={"teal.400"}
                color={"white"}
                ml={"auto"}
                isLoading={commentLoading}
                _hover={{ bg: "teal.700" }}
              >
                Add Comment
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </form>
  );
}
