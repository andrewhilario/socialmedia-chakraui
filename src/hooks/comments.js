import { uuidv4 } from "@firebase/util";
import {
  setDoc,
  doc,
  query,
  collection,
  where,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { useState } from "react";
import { db } from "../lib/firebase";
import { Modal, useToast } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddComment({ postID }) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function addComment(comment) {
    setIsLoading(true);
    const id = uuidv4();
    const date = Date.now();
    const docRef = doc(db, "comments", id);
    await setDoc(docRef, { ...comment, id, postID, date });

    toast({
      title: "Comment added",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
      description: "Your comment has been added successfully",
    });
    setIsLoading(false);
  }

  return { addComment, isLoading };
}

export function useComments(postID) {
  const q = query(
    collection(db, "comments"),
    where("postID", "==", postID),
    orderBy("date", "asc")
  );
  const [comments, isLoading, error] = useCollectionData(q);

  //   if (error) {
  //     throw error;
  //   }

  return { comments, isLoading };
}

export function useDeleteComment(id) {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function deleteComment() {
    setIsLoading(true);

    const docRef = doc(db, "comments", id);
    await deleteDoc(docRef);
    toast({
      title: "Comment deleted",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
      description: "Your comment has been deleted successfully",
    });
    setIsLoading(false);
  }

  return { deleteComment, isLoading };
}
