import { useState } from "react";
import { doc, setDoc, query, collection, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { uuidv4 } from "@firebase/util";
import { useToast } from "@chakra-ui/react";
import { useCollectionData } from "react-firebase-hooks/firestore";

export function useAddPost() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  async function addPost(post) {
    setIsLoading(true);
    const id = uuidv4();
    await setDoc(doc(db, "posts", id), {
      ...post,
      id,
      createdAt: Date.now(),
      likes: [],
    });
    setIsLoading(false);
    toast({
      title: "Post added",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
      description: "Your post has been added successfully",
    });
  }

  return { addPost, isLoading };
}

export function usePost() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const [posts, isLoading, error] = useCollectionData(q);

  if (error) {
    throw error;
  }

  return { posts, isLoading };
}
