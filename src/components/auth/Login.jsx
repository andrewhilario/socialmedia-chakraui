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
import { emailValidate, passwordValidate } from "../../utils/form-validate";
import { useLogin } from "../../hooks/auth";

const Login = () => {
  const { login, isLoading } = useLogin();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  async function handleLogin(data) {
    const succeeded = await login({
      email: data.email,
      password: data.password,
      redirectTo: "/",
    });

    if (succeeded) reset();
  }
  console.log(errors);

  return (
    <>
      <Helmet>
        <title> Socials | Login </title>
        <meta name="description" content="Socials made by Andrew Hilario" />
      </Helmet>
      <Center w={"100%"} h="100vh" color="teal.500">
        <Box
          borderColor="teal.500"
          w={{ base: "75%", md: "55%", lg: "30%" }}
          p="10"
          borderWidth={"2px"}
          borderRadius="lg"
        >
          <Heading mb={"4"} size="lg" textAlign={"center"}>
            Login
          </Heading>
          <form action="" onSubmit={handleSubmit(handleLogin)}>
            <FormControl isInvalid={errors.email} py="2">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                placeholder="Email"
                {...register("email", emailValidate)}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} py="2">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Password"
                {...register("password", passwordValidate)}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              mt="4"
              type="submit"
              colorScheme={"teal"}
              size="md"
              width={"full"}
              isLoading={isLoading}
              loadingText="Logging in"
            >
              Login
            </Button>
            <Text mt="4" fontSize={"xlg"} textAlign="center">
              Don't have an account?{" "}
              <Link
                color="teal.800"
                fontWeight={"medium"}
                textDecor="underline"
              >
                <RouterLink to="/register">Register</RouterLink>
              </Link>
            </Text>
          </form>
        </Box>
      </Center>
    </>
  );
};

export default Login;
