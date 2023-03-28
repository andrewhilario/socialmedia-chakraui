import { Center, CircularProgress } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { auth } from "../../lib/firebase";

const Main = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authListener = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setUser(user);
          setLoading(false);
        } else {
          setUser(null);
          setLoading(false);
        }
      });
    };
    authListener();
  }, []);

  if (!user) {
    return (
      <Center h="100vh">
        <CircularProgress isIndeterminate color="teal.400" />
      </Center>
    );
  } else {
    return (
      <div>
        <h1>Home</h1>
        <h1>Profile</h1>
      </div>
    );
  }
};

export default Main;
