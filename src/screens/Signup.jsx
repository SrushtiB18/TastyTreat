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
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { usePostCreateUser } from "../service/Login";

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const { mutateAsync: createUser, isPending: isCreatingUser } =
    usePostCreateUser();

  const onSubmit = async (values) => {
    try {
      const data = await createUser(values);
      console.log("User created successfully", data);
    } catch (error) {
      console.error("Error creating user:", error.message);
    }
  };
  console.log("errors", errors);
  return (
    <Box
      bgImage="url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80')"
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
            Join TastyTreat Today!
          </Heading>
          <Text fontSize="lg" color="gray.600" textAlign="center">
            Enjoy delicious meals and food deals delivered to your door.
          </Text>

          {/* <Image
            src="https://images.unsplash.com/photo-1551218808-94e220e084d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            alt="Fresh food"
            borderRadius="md"
            mb={4}
            objectFit="cover"
          /> */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={8}>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  placeholder="Enter your username"
                  focusBorderColor="primary.500"
                  bg={useColorModeValue("gray.100", "gray.600")}
                  {...register("username", {
                    required: "Username is required",
                  })}
                />
                {errors.username && (
                  <Text color="red.500">{errors.username.message}</Text>
                )}
              </FormControl>

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

              <FormControl id="location" isRequired>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter your location"
                  focusBorderColor="primary.500"
                  bg={useColorModeValue("gray.100", "gray.600")}
                  {...register("location", {
                    required: "Location is required",
                  })}
                />
                {errors.location && (
                  <Text color="red.500">{errors.location.message}</Text>
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
                  isLoading={isCreatingUser}
                >
                  Sign Up
                </Button>
                <Text textAlign="center">
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#3182ce" }}>
                    Login
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

export default Signup;
