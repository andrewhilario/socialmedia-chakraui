import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { collection, doc, orderBy, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";

export function useUser(id) {
  const q = query(doc(db, "users", id));
  const [user, isLoading] = useDocumentData(q);

  return { user, isLoading };
}

export function useUserPosts(uid) {
  const q = query(
    collection(db, "posts"),
    where("uid", "==", uid),
    orderBy("createdAt", "desc")
  );
  const [userPosts, isLoading, error] = useCollectionData(q);

  return { userPosts, isLoading };
}

export function useListUsers() {
  const q = query(collection(db, "users"));
  const [users, isLoading, error] = useCollectionData(q);

  if (error) console.log(error);

  return { users, isLoading };
}
