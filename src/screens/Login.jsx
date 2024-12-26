import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginUser } from "../service/Login";

const Login = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { mutateAsync: loginUser, isPending: isloggingUser } = useLoginUser();

  const onSubmit = async (values) => {
    try {
      const data = await loginUser(values);
      // console.log("data", data);
      // console.log("values", values);
      if (data?.data?.success) {
        console.log("User logged in successfully");
        localStorage.setItem("userEmail", values?.email);
        localStorage.setItem("authToken", data?.data?.authToken);
        navigate("/");
      }
    } catch (error) {
      console.error("Error logging user:", error.message);
    }
  };

  return (
    <Box
      bgImage="url('https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80')"
      bgPos="center"
      bgSize="cover"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={4}
    >
      <Box
        maxW="lg"
        w="full"
        bg={useColorModeValue("whiteAlpha.900", "gray.700")}
        boxShadow="xl"
        rounded="lg"
        p={8}
        overflow="hidden"
        backdropFilter="blur(10px)"
        opacity="0.95"
      >
        <Stack spacing={8}>
          <Heading fontSize="3xl" textAlign="center" color="primary.500">
            Welcome Back!
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center">
            Sign in to enjoy your favorite meals delivered to your doorstep.
          </Text>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={8}>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  focusBorderColor="primary.500"
                  bg={useColorModeValue("gray.100", "gray.600")}
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <Text color="red.500">{errors.email.message}</Text>
                )}
              </FormControl>

              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  focusBorderColor="primary.500"
                  bg={useColorModeValue("gray.100", "gray.600")}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                {errors.password && (
                  <Text color="red.500">{errors.password.message}</Text>
                )}
              </FormControl>

              <Stack spacing={6}>
                <Button
                  bg="blue.500"
                  color="white"
                  _hover={{ bg: "primary.600" }}
                  size="lg"
                  rounded="md"
                  shadow="md"
                  type="submit"
                  isLoading={isloggingUser}
                >
                  Log In
                </Button>
                <Text textAlign="center">
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "#3182ce" }}>
                    Sign Up
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Stack>
      </Box>
    </Box>
  );
};

export default Login;
