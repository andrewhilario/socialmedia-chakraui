import { auth, db } from "../lib/firebase";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { async } from "@firebase/util";
import { setDoc, doc } from "firebase/firestore";
import isUsernameExists from "../utils/isUsernameExists";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function login({ email, password, redirectTo = "/" }) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Logged in successfully",
        status: "success",
        isClosable: true,
        duration: 5000,
        position: "top",
      });
      navigate(redirectTo);
    } catch (error) {
      toast({
        title: "An error occurred",
        description:
          "Please check your email and password and try again." + error.message,
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "top",
      });
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }

  return { login, isLoading };
}

export function useLogout() {
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function logout() {
    await auth.signOut();
    toast({
      title: "Logged out successfully",
      status: "success",
      isClosable: true,
      duration: 5000,
      position: "top",
    });
    navigate("/login");
  }

  return { logout, isLoading };
}

export function useRegister() {
  const [isLoading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  async function register({
    username,
    email,
    password,
    redirectTo = "/login",
  }) {
    setLoading(true);

    const usernameExists = await isUsernameExists(username);

    if (usernameExists) {
      toast({
        title: "Username already exists",
        description: "Please try another username",
        status: "error",
        isClosable: true,
        duration: 5000,
        position: "top",
      });
      setLoading(false);
    } else {
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db, "users", res.user.uid), {
          id: res.user.uid,
          username: username.toLowerCase(),
          avatar: "",
          date: Date.now(),
        });

        toast({
          title: "Account created successfully",
          status: "success",
          isClosable: true,
          duration: 5000,
          position: "top",
        });
        navigate(redirectTo);
      } catch (error) {
        toast({
          title: "An error occurred",
          description: "Please try again." + error.message,
          status: "error",
          isClosable: true,
          duration: 5000,
          position: "top",
        });
      } finally {
        setLoading(false);
      }
    }
  }

  return { register, isLoading };
}
