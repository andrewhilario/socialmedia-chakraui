import React from "react";
import { Helmet } from "react-helmet";
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  emailValidate,
  passwordValidate,
  usernameValidate,
} from "../../utils/form-validate";
import { useLogin, useRegister } from "../../hooks/auth";

const Register = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { register: registerUser, isLoading } = useRegister();

  async function handleRegister(data) {
    registerUser({
      username: data.username,
      email: data.email,
      password: data.password,
      redirectTo: "/login",
    });
  }

  return (
    <>
      <Helmet>
        <title> Socials | Register </title>
        <meta name="description" content="Socials made by Andrew Hilario" />
      </Helmet>
      <Center w={"100%"} h="100vh" color="teal.500">
        <Box
          w={{ base: "75%", md: "55%", lg: "30%" }}
          p="10"
          borderWidth={"2px"}
          borderRadius="lg"
          borderColor={"teal.500"}
        >
          <Heading mb={"4"} size="lg" textAlign={"center"}>
            Register
          </Heading>
          <form onSubmit={handleSubmit(handleRegister)}>
            {/* Username */}
            <FormControl py="2" isInvalid={errors.username}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Please enter your username"
                {...register("username", usernameValidate)}
              />
              <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
            </FormControl>
            {/* Email */}
            <FormControl py="2" isInvalid={errors.email}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Please enter your email"
                {...register("email", emailValidate)}
              />
              <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
            </FormControl>
            {/* Password */}
            <FormControl py="2" isInvalid={errors.password}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Please enter your password"
                {...register("password", passwordValidate)}
              />
              <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
            </FormControl>
            <Button
              isLoading={isLoading}
              loadingText="Signing Up"
              type="submit"
              colorScheme="teal"
              size="md"
              width={"full"}
              mt="4"
            >
              Register
            </Button>
            <Text mt="4" fontSize={"md"} textAlign="center">
              Already have account?{" "}
              <Link
                color="teal.800"
                fontWeight={"medium"}
                textDecor="underline"
              >
                <RouterLink to="/register">Login</RouterLink>
              </Link>
            </Text>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default Register;
